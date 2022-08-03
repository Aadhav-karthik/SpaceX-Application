export function getRocket(rockets, id) {
    return { type: "getRocket", payload: { rockets: rockets, id: id } };
}

export function getLaunch(rockets, id) {
    return { type: "getLaunch", payload: { launches: rockets, id: id } };
}

export function previousImage() {
    return { type: "previousImage" };
}

export function nextImage() {
    return { type: "nextImage" };
}

export function setProperty(prop) {
    return { type: "setProperty", payload: prop };
}

export function setStage(prop) {
    return { type: "setStage", payload: prop };
}

export function reInitializeStates() {
    return { type: "reInitializeStates" };
}