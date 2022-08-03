import React from 'react';
import styles from '../../CSS/Rocket.module.css';

export function RocketPagination({ rockets, id }) {

    const page = [];
    rockets.map((rocket, index) => {
        let style = {};
        if (rocket.id === id)
            style.backgroundColor = 'white';
        page.push(<div key={index} style={style} className={styles.rocketPageDots} />)
    })

    return (
        <div className={styles.rocketPagination}>{page}</div>
    )
}

export function ImagePagination({ state, image }) {
    const page = [];
    for (let i = 0; i < image.length; i++) {
        let style = {};
        if (state.image === i)
            style.backgroundColor = 'white';

        page.push(<div key={i} style={style} className={styles.page} />)
    }

    return <div className={styles.pageSection}>{page}</div>;
}