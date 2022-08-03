import React, { Fragment } from 'react';
import styles from '../CSS/History.module.css';
import { shortenData } from '../Helpers/HelperFunctions';

function History({ history }) {

    const HistoryCards = () => {
        let historyCards = [];
        history.map((item, index) => {
            let date = new Date(item.event_date_utc).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' });
            historyCards.push(
                <a href={item.links.article} key={index} className={styles.card}>
                    <div data-testid="title" className={styles.cardTitle}>
                        {item.title}
                    </div>
                    <div className={styles.cardDetails}>
                        <p data-testid="date" className={styles.date}>{date}</p>
                        <p data-testid="details" className={styles.data}>{shortenData(item.details)}</p>
                        <small>Click to Read More...</small>
                    </div>
                </a>
            );
        })
        return historyCards;
    }

    return (
        <Fragment>
            <p data-testid="history" className={styles.pageHeader}>History</p>
            <section className={styles.historySection}>
                <HistoryCards />
            </section>
        </Fragment>
    )

}

export default History;