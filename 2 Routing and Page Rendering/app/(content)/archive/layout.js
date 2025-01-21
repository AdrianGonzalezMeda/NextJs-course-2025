// Parallel routes needs a layout on the root folder and then any folders with an @ prefix that will be the parallel routes
// This layout component doesn't have children prop, it has the pages component of the parallel routes instead
const ArchiveLayout = ({ archive, latest }) => {
    return (
        <div>
            <h1>News Archive</h1>
            <section id="archive-filter">{archive}</section>
            <section id="archive-latest">{latest}</section>
        </div>
    )
}

export default ArchiveLayout
