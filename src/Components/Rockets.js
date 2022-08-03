import React, { useState } from 'react';
import styles from '../CSS/Cards.module.css';
import { Card, InputFilter } from './SubComponents/SubComponents';

function Rockets({ rockets }) {

    const [search, setSearch] = useState('');

    const filterRocket = (e) => {
        setSearch(e.target.value);
    }

    const RocketsElements = () => {
        let rocketsList = [];
        rockets.map((rocket) => {
            if (rocket.name.toLowerCase().startsWith(search.toLowerCase().trim()))
                rocketsList.push(
                    <Card key={rocket.name} url={`/rockets/${rocket.id}`} name={rocket.name} src={rocket.flickr_images[0]} details={rocket.description} />
                )
        })
        return rocketsList;
    }

    return (
        <section className={styles.rocketsSection}>
            <p className={styles.pageHeader}>Rockets</p>
            <section className={styles.inputSection}>
                <InputFilter onChange={(e) => filterRocket(e)} className={styles.rocketFilter} value={search} placeholder="Type to Filter Rockets" />
            </section>
            <section className={styles.rocketsCards}>
                <RocketsElements />
            </section>
        </section>
    )
}

export default Rockets;