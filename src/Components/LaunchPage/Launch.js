import { Fragment, useEffect, useReducer } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getLaunch, nextImage, previousImage, reInitializeStates } from "../../Reducers/LaunchRocketActions";
import { launchReducer } from "../../Reducers/Reducers";
import styles from "../../CSS/Launch.module.css";
import { ImagePagination } from "../SubComponents/RocketLaunchComponents";
import { getLaunchByID } from "../../FetchData/LaunchData";

function Launch({ launches }) {

    let { id } = useParams();
    const { states } = useLocation();
    const initialState = { ...states, image: 0, property: 0, launch: '' };
    const [state, dispatch] = useReducer(launchReducer, initialState);

    useEffect(() => {
        dispatch(reInitializeStates());
        dispatch(getLaunch(launches, id));
    }, [launches, id])

    return (
        state.launch ?
            <section>
                <section className={styles.allSections}>
                    <TopSection state={state} dispatch={dispatch} />
                </section>
                <Link to={`/launches/${getLaunchByID(launches, id, 'prev').id}`} className={styles.leftArrow}>
                    <h1 className={styles.arrow}>&lt;</h1>
                </Link>
                <Link to={`/launches/${getLaunchByID(launches, id, 'next').id}`} className={styles.rightArrow}>
                    <h1 className={styles.arrow}>&gt;</h1>
                </Link>
            </section>
            : <h3>Loading...</h3>
    )
}

function TopSection({ state, dispatch }) {
    return (
        <section className={styles.topSection}>
            <div className={styles.header}>{state.launch.name}</div>

            <ImageSection state={state} dispatch={dispatch} />
            <div className={styles.details}>
                <p>{state.launch.details}</p>
            </div>
        </section>
    )
}

function ImageSection({ state, dispatch }) {
    return (
        <Fragment>
            <div className={styles.imageSection}>
                <button onClick={() => dispatch(previousImage())} className={styles.arrowButton}>
                    <h1 className={styles.arrow}>&lt;</h1>
                </button>
                <img className={styles.rocketImg} src={state.launch.links.flickr.original[state.image]} alt="Launch" />
                <button onClick={() => dispatch(nextImage())} className={styles.arrowButton}>
                    <h1 className={styles.arrow}>&gt;</h1>
                </button>
            </div>
            <ImagePagination state={state} image={state.launch.links.flickr.original} />
        </Fragment>
    )
}

export default Launch;