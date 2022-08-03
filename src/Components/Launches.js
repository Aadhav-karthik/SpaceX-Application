import styles from '../CSS/Cards.module.css';
import React, { useEffect, useState } from "react";
import { getRocketByID } from '../FetchData/RocketData';
import { InputFilter, Card } from './SubComponents/SubComponents';
import { fetchData } from '../FetchData/LaunchData';

function Launches({ launches, rockets }) {

    const [search, setSearch] = useState('');
    const [landPads, setLandPad] = useState('');
    const [launchPads, setLaunchPad] = useState('');
    const [payloads, setPayloads] = useState('');

    useEffect(() => {
        (async () => {
            setLandPad(await fetchData('landpads'));
            setLaunchPad(await fetchData('launchpads'));
            setPayloads(await fetchData('payloads'));
        })();
    }, [])

    const filterLaunches = (e) => {
        setSearch(e.target.value);
    }

    const LaunchesElements = () => {
        let launchList = [];
        launches.map((launch) => {

            let rocket = getRocketByID(rockets, launch.rocket);
            let searchText = search.toLowerCase().trim();
            if (launch.name.toLowerCase().startsWith(searchText) || rocket.name.toLowerCase().startsWith(searchText))
                launchList.push(
                    <Card state={{ payloads, launchPads, landPads }} key={launch.name} url={`/launches/${launch.id}`} name={launch.name} src={launch.links.flickr.original[0]} details={launch.details} />
                )
        })

        return launchList;
    }

    return (
        <section className={styles.rocketsSection}>
            <p className={styles.pageHeader}>Launches</p>
            <section className={styles.inputSection}>
                <InputFilter onChange={(e) => filterLaunches(e)} className={styles.rocketFilter} value={search} type="text" placeholder="Filter By Launches or Rockets" />
            </section>
            <section className={styles.rocketsCards}>
                <LaunchesElements />
            </section>
        </section>
    )
}

export default Launches;