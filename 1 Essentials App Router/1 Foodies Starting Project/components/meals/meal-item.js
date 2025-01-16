import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    {/*<Image> Needs to know the width and height of the image, and when its loaded from de database
                    we only have a path, its not like when we import the image from a directory. So we use the 
                    fill prop*/}
                    <Image src={image} alt={title} fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}