import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

// Reserved keyword to set metadata in each page, if not defined, use the closest layout metadata
export const metadata = {
    title: 'All Meals',
    description: 'Browse the delicious meals shared by or vibrant community.',
};

// An example to handle the loading page without creating a loading.js page that shows in all the view
const Meals = async () => {
     // Fetching fake BBDD. In Server Components its not necessary to use useEffect() hook and fetch to the server,
    // because this component already render in the server
    const meals = await getMeals();
    return <MealsGrid meals={meals} />;
}

// React Server Components allows to use async functions
const MealsPage = () => {
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href='/meals/share'>Share your favorite recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}

export default MealsPage
