import { getDataByID } from "../Helpers/HelperFunctions";

export default async function fetchLaunchData() {
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches/');
        const responseData = await response.json();
        return await responseData.filter(item => item.links.flickr.original[0] && item.details);
    } catch (err) {
        throw new Error("No response from the Server");
    }
}

export async function fetchData(data) {
    try {
        const response = await fetch(`https://api.spacexdata.com/v4/${data}/`);
        return await response.json();
    } catch (err) {
        throw new Error("No response from the Server");
    }
}

export function getLatestLaunchData(launches) {
    const launchesSorted = [...launches].sort((a, b) =>
        a.static_fire_date_unix > b.static_fire_date_unix ? -1 : 1
    )
    if (!launchesSorted[0])
        return '';
    return launchesSorted[0];
}

export function getLaunchByID(launches, id, order = null) {
    return getDataByID(launches, id, order);
}