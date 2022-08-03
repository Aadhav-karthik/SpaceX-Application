import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/HomePage.module.css';
import { reduceData } from '../Helpers/HelperFunctions';

function HomePage({ launch, rocket }) {

    return (
        <div className={styles.allSections}>
            <section className={styles.latestLaunch}>
                <h3 className={styles.header}>Latest Launch</h3>
                {rocket &&
                    <LatestLaunch launch={launch} rocket={rocket} />
                }
            </section>
            <DisplayQuote />
        </div>
    )
}

function LatestLaunch({ launch, rocket }) {

    return (
        <div className={styles.launchSection}>
            <div className={styles.launchDetails}>
                <h1 data-testid="rocketName" className={styles.rocketName}>{rocket.name}</h1>
                <p className={styles.detailHeader}>Launch Date:</p>
                <h2 data-testid="launchDate">{new Date(launch.static_fire_date_utc).toLocaleDateString("en", { year: 'numeric', day: 'numeric', month: 'long' })}</h2>
                <p className={styles.detailHeader}>Mission: </p>
                <p data-testid="launchDetails" className={styles.details}>{reduceData(launch.details)}</p>
                <Link to={`/launches/${launch.id}`}><button className={styles.knowMore}>Know More</button></Link>
            </div>
        </div>
    )
}

function DisplayQuote() {
    return (
        <div className={styles.quote}>
            <p>"Great Companies are Built on great Products" </p><sub><small>- Elon Musk</small></sub>
        </div>
    )
}

export default HomePage;