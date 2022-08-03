export function launchData(data) {
    return { type: 'LaunchData', payload: data }
}

export function rocketData(data) {
    return { type: 'RocketData', payload: data };
}

export function historyData(data) {
    return { type: 'HistoryData', payload: data };
}

export function getLatestLaunchData() {
    return { type: 'getLatestLaunchData' };
}

export function getRocketByID() {
    return { type: 'getRocketByID' };
}
