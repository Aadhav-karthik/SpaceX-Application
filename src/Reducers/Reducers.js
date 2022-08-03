import { getLatestLaunchData, getLaunchByID } from "../FetchData/LaunchData";
import { getRocketByID } from "../FetchData/RocketData";

export function appReducer(state, action) {
    switch (action.type) {
        case 'LaunchData':
            return { ...state, launches: action.payload };

        case 'RocketData':
            return { ...state, rockets: action.payload };

        case 'HistoryData':
            return { ...state, history: action.payload };

        case 'getLatestLaunchData':
            return { ...state, launch: getLatestLaunchData(state.launches) };

        case 'getRocketByID':
            return { ...state, rocket: getRocketByID(state.rockets, state.launch.rocket) };

        default:
            return state;
    }
}

export function rocketReducer(state, action) {
    switch (action.type) {

        case 'getRocket':
            return { ...state, rocket: getRocketByID(action.payload.rockets, action.payload.id) };

        case 'reInitializeStates':
            return { ...state, image: 0 };

        case 'previousImage':
            if (state.image > 0)
                return { ...state, image: state.image - 1 };
            if (state.image === 0)
                return { ...state, image: state.rocket.flickr_images.length - 1 }
            break;

        case 'nextImage':
            if (state.image < state.rocket.flickr_images.length - 1)
                return { ...state, image: state.image + 1 };
            if (state.image === state.rocket.flickr_images.length - 1)
                return { ...state, image: 0 };
            break;

        case 'setProperty':
            return { ...state, property: action.payload };

        case 'setStage':
            return { ...state, stage: action.payload };

        default:
            return state;
    }
}

export function launchReducer(state, action) {
    switch (action.type) {

        case 'getLaunch':
            return { ...state, launch: getLaunchByID(action.payload.launches, action.payload.id) };

        case 'reInitializeStates':
            return { ...state, image: 0 };

        case 'previousImage':
            if (state.image > 0)
                return { ...state, image: state.image - 1 };
            if (state.image === 0)
                return { ...state, image: state.launch.links.flickr.original.length - 1 }
            break;

        case 'nextImage':
            if (state.image < state.launch.links.flickr.original.length - 1)
                return { ...state, image: state.image + 1 };
            if (state.image === state.launch.links.flickr.original.length - 1)
                return { ...state, image: 0 };
            break;

        default:
            return state;

    }

}