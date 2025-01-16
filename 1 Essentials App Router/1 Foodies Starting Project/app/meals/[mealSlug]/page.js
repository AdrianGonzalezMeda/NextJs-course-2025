import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

// Generate dynamic metadata for dynamic pages. Recives the same props as the component
export async function generateMetadata({ params }) {
    const meal = getMeal(params.mealSlug);

    // If dont specify the notFound() error, by default the error.js page will shown
    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary
    };
}

// params is provided by NextJS with the params of the url in a key: value way. The key its the folder name [mealSlug]
const MealDetailsPage = ({ params }) => {
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        // Trigger the closest not found error page
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '</br>');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main className={classes.main}>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions
                }}>
                    {/* dangerouslySetInnerHTML: output html code, you expose to scripting attacks if not validate */}
                </p>
            </main>
        </>
    )
}

export default MealDetailsPage
