import styles from './App.module.css';
import logo from './Images/logo.png';
import ham from './Images/hamburger.png';
import { Link } from 'react-router-dom';
import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import fetchLaunchData from './FetchData/LaunchData';
import fetchRocketData from './FetchData/RocketData';
import { appReducer } from './Reducers/Reducers';
import SpaceXRoutes from './Routes';
import fetchHistoryData from './FetchData/HistoryData';
import { getLatestLaunchData, getRocketByID, historyData, launchData, rocketData } from './Reducers/AppActions';

function App() {

  const initialState = { launches: [], launch: '', rockets: [], rocket: '', history: [] };
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    (async () => {
      const launch = await fetchLaunchData(), rocket = await fetchRocketData(), history = await fetchHistoryData();
      dispatch(launchData(launch));
      dispatch(rocketData(rocket));
      dispatch(historyData(history));
    })();
  }, [])

  useEffect(() => {
    dispatch(getLatestLaunchData());
  }, [state.launches.length])

  useEffect(() => {
    dispatch(getRocketByID());
  }, [state.launch, state.rockets.length])

  return (
    <div className={styles.App}>
      <section className={styles.navbar}>
        <Link to='/'><img className={styles.logo} src={logo} alt="logo" /></Link>
        <HamBurgerIcon />
      </section>
      <SpaceXRoutes state={state} />
    </div>
  );
}

function HamBurgerIcon() {

  const [links, setLinks] = useState(false);
  const hamRef = useRef();

  useEffect(() => {
    const clickEvent = (event) => {
      if (hamRef.current && !hamRef.current.contains(event.target))
        setLinks(false);
    }

    document.addEventListener('click', clickEvent);

    return () => { document.removeEventListener('click', clickEvent) }

  }, [])

  const displayMenu = (e) => {
    setLinks(!links);
  }

  return (
    <Fragment>
      <button ref={hamRef} onClick={(e) => displayMenu(e)} className={styles.hamButton}><img className={styles.ham} src={ham} alt="X" /></button>
      <div className={links ? styles.links : styles.dNone}>
        <Link className={styles.link} to="/history">History</Link>
        <Link className={styles.link} to="/launches">Launches</Link>
        <Link className={styles.link} to="/rockets">Rockets</Link>
      </div>
    </Fragment>
  )
}

export default App;
