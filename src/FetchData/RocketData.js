import { getDataByID } from "../Helpers/HelperFunctions";

export default async function fetchRocketData() {
    try {
        const response = await fetch('https://api.spacexdata.com/v4/rockets/');
        return await response.json();
    } catch (err) {
        throw new Error("No response from the Server");
    }
}

export function getRocketByID(rockets, id, order = null) {
    return getDataByID(rockets, id, order);
}

export function getLatestRocketData(rockets) {
    const rocketsSorted = [...rockets].sort((a, b) =>
        a.first_flight > b.first_flight ? -1 : 1
    )
    return rocketsSorted[0];
}