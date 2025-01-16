import classes from './loading.module.css'

// Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data.
// But the problem is that the only content visible is this component, so we can handle the loading in page.js component
const MealsLoadingPage = () => {
    return <p className={classes.loading}>Fetching meals...</p>
}

export default MealsLoadingPage
