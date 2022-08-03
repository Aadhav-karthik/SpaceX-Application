import { Link } from "react-router-dom"
import { reduceData } from "../../Helpers/HelperFunctions"
import styles from '../../CSS/Cards.module.css';
import React from 'react';


export function InputFilter({ onChange, className, value, placeholder }) {
    return (
        <form>
            <input data-testid="filter" onChange={onChange} className={className} value={value} type="text" placeholder={placeholder} />
        </form>
    )
}

export function Card({ url, name, src, details, state }) {
    return (
        <Link state={state} to={url} key={name} className={styles.card}>
            <img className={styles.rocketImg} src={src} alt="rocket_Image" />
            <div className={styles.cardDetails}>
                <h2 data-testid="name" className={styles.rocketName}>{name}</h2>
                <p data-testid="details" className={styles.rocketDetails}>{reduceData(details)}</p>
                <small className={styles.knowMore}>Click to know More</small>
            </div>
        </Link>
    )
}