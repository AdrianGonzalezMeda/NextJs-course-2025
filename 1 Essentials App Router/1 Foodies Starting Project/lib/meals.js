// A file to get data from the fake BBDD

import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

// We simulate a delay
export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); // This is to prevent sql injection
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lowe: true });
    meal.instructions = xss(meal.instructions); // To sanitize the input, because we use in a dangerouslySetInnerHTML div. Saving from scripting injection

    // Save image to the file system
    const extension = meal.image.name.split().pop();
    const fileName = `${meal.slug}-${new Date().getTime()}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            console.log(error)
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
}
