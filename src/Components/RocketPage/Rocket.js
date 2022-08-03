import React, { Fragment, useContext, useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { getRocketByID } from "../../FetchData/RocketData";
import styles from "../../CSS/Rocket.module.css";
import { RocketPagination, ImagePagination } from "../SubComponents/RocketLaunchComponents";
import { buttonStyles } from "../../Helpers/HelperFunctions";
import { rocketReducer } from '../../Reducers/Reducers';
import { getRocket, nextImage, previousImage, reInitializeStates, setProperty, setStage } from "../../Reducers/LaunchRocketActions";

export const LaunchesContext = React.createContext();

function Rocket({ rockets, launches }) {

    let { id } = useParams();

    const initialState = { rocket: '', stage: 1, property: 'Geometrical', image: 0 };
    const [state, dispatch] = useReducer(rocketReducer, initialState);

    useEffect(() => {
        dispatch(reInitializeStates());
        dispatch(getRocket(rockets, id));
    }, [rockets, id])

    return (
        state.rocket ?
            <section>
                <section className={styles.allSections}>
                    <LeftSection state={state} dispatch={dispatch} />
                    <LaunchesContext.Provider value={launches}>
                        <RightSection state={state} dispatch={dispatch} />
                    </LaunchesContext.Provider>

                </section>
                <RocketNavigation rockets={rockets} id={id} />
            </section>
            : <h3>Loading...</h3>
    )
}

function LeftSection({ state, dispatch }) {
    return (
        <section className={styles.leftSection}>
            <div className={styles.header}>{state.rocket.name}</div>

            <ImageSection state={state} dispatch={dispatch} />
            <div className={styles.description}>
                <p>{state.rocket.description}</p>
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
                <img className={styles.rocketImg} src={state.rocket.flickr_images[state.image]} alt="rocket" />
                <button onClick={() => dispatch(nextImage())} className={styles.arrowButton}>
                    <h1 className={styles.arrow}>&gt;</h1>
                </button>
            </div>
            <ImagePagination state={state} image={state.rocket.flickr_images} />
        </Fragment>
    )
}

function RightSection({ state, dispatch }) {

    const Property = () => {
        switch (state.property) {
            case "Engines":
                return <EngineProps rocket={state.rocket} />

            case "Payloads":
                return <PayloadProps rocket={state.rocket} />

            case "Stages":
                return <StageProps rocket={state.rocket} stage={state.stage} />

            case "Launches":
                return <LaunchesProps rocket={state.rocket} />

            default:
                return <GeometricalProps rocket={state.rocket} />
        }
    }

    return (
        <section className={styles.rightSection}>
            <PropertyButtons state={state} dispatch={dispatch} />
            <StageButtons state={state} dispatch={dispatch} />
            <div className={styles.propDetails}>
                <Property />
            </div>
        </section>
    )
}

function PropertyButtons({ state, dispatch }) {
    return (
        <div className={styles.propButtons}>
            <button style={buttonStyles(state.property).geo} onClick={() => dispatch(setProperty("Geometrical"))} className={styles.buttons}>Geometrical Properties</button>
            <button style={buttonStyles(state.property).stages} onClick={() => dispatch(setProperty("Stages"))} className={styles.buttons}>Stages</button>
            <button style={buttonStyles(state.property).payloads} onClick={() => dispatch(setProperty("Payloads"))} className={styles.buttons}>Payloads</button>
            <button style={buttonStyles(state.property).engines} onClick={() => dispatch(setProperty("Engines"))} className={styles.buttons}>Engines</button>
            <button style={buttonStyles(state.property).launches} onClick={() => dispatch(setProperty("Launches"))} className={styles.buttons + " " + styles.last}> Launches</button>
        </div>
    )
}

function StageButtons({ state, dispatch }) {
    return (
        state.property === "Stages" ?
            <div className={styles.stageButtons}>
                <button style={buttonStyles(state.stage).stage1} onClick={() => dispatch(setStage(1))} className={styles.stage}>Stage 1</button>
                <button style={buttonStyles(state.stage).stage2} onClick={() => dispatch(setStage(2))} className={styles.stage + " " + styles.last}>Stage 2</button>
            </div> : null
    )
}



const GeometricalProps = ({ rocket }) => {
    const props = {
        "HEIGHT": rocket.height.meters + " m", "DIAMETER": rocket.diameter.meters + " m",
        "MASS": rocket.mass.kg.toLocaleString() + " kg", "LANDING LEGS": rocket.landing_legs.number,
        "COST/LAUNCH": '$' + rocket.cost_per_launch.toLocaleString(), "BOOSTERS": rocket.boosters
    };

    return rocketProps(rocket, props);
}

const PayloadProps = ({ rocket }) => {
    const props = {};
    rocket.payload_weights.map((payload) => {
        let key = `PAYLOAD TO ${payload.id.toUpperCase()}`;
        props[key] = payload.kg.toLocaleString() + " kg";
    })
    return rocketProps(rocket, props);
}

const EngineProps = ({ rocket }) => {
    const props = {
        "ENGINES": rocket.engines.number, "THRUST AT SEA LEVEL": rocket.engines.thrust_sea_level.kN + " kN",
        "THRUST IN VACUUM": rocket.engines.thrust_vacuum.kN + " kN",
        "PROPELLANTS": rocket.engines.propellant_1 + " && " + rocket.engines.propellant_2
    }
    return rocketProps(rocket, props);
};

const StageProps = ({ rocket, stage }) => {
    let props;
    if (stage === 1) {
        props = {
            "ENGINES": rocket.first_stage.engines, "THRUST AT SEA LEVEL": rocket.first_stage.thrust_sea_level.kN.toLocaleString() + " kN",
            "THRUST IN VACUUM": rocket.first_stage.thrust_vacuum.kN.toLocaleString() + " kN", "REUSABLE": rocket.first_stage.reusable.toLocaleString(),
            "FUEL CAPACITY TONNES": rocket.first_stage.fuel_amount_tons.toLocaleString() + " t"
        }
    } else {
        props = {
            "ENGINES": rocket.second_stage.engines, "THRUST": rocket.second_stage.thrust.kN.toLocaleString() + " kN",
            "REUSABLE": rocket.second_stage.reusable.toLocaleString(), "FUEL CAPACITY TONNES": rocket.second_stage.fuel_amount_tons.toLocaleString() + " t"
        }
    }
    return rocketProps(rocket, props);
}

const LaunchesProps = ({ rocket }) => {
    const launches = useContext(LaunchesContext);
    const launchNames = [];
    launches.map((launch, index) => {
        if (launch.rocket === rocket.id)
            launchNames.push(<Link key={index} className={styles.launchLink} to={`/launches/${launch.id}`}>{launch.name}</Link>);
    })
    return <div className={styles.launches}>{launchNames}</div>;
}

function rocketProps(rocket, props) {

    const propElements = [];
    for (let key in props) {
        propElements.push(
            <div key={key} className={styles.details}>
                <p className={styles.label}>{key}</p>
                <p className={styles.data}>{props[key]}</p>
            </div>
        )
    }
    return propElements;
}

function RocketNavigation({ rockets, id }) {

    return (
        <Fragment>
            <Link to={`/rockets/${getRocketByID(rockets, id, 'prev').id}`} className={styles.leftArrow}>
                <h1 className={styles.arrow}>&lt;</h1>
            </Link>
            <RocketPagination rockets={rockets} id={id} />
            <Link to={`/rockets/${getRocketByID(rockets, id, 'next').id}`} className={styles.rightArrow}>
                <h1 className={styles.arrow}>&gt;</h1>
            </Link>
        </Fragment>
    )
}

export default Rocket;