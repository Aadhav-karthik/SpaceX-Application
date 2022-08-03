
export const reduceData = (data) => {
    const tenWords = data.split(' ');
    return tenWords.slice(0, 15).join(' ') + "...";
}

export const shortenData = (data) => {
    const words = data.split(' ');

    if (words.length > 35)
        return words.slice(0, 35).join(' ') + "...";
    else
        return data;
}

export const buttonStyles = (prop) => {
    const style = { borderBottom: "2px solid white" }
    const buttons = { geo: {}, stages: {}, engines: {}, payloads: {}, launches: {}, stage1: {}, stage2: {} }

    if (prop === "Geometrical")
        buttons.geo = style;
    if (prop === "Stages")
        buttons.stages = style;
    if (prop === "Engines")
        buttons.engines = style;
    if (prop === "Payloads")
        buttons.payloads = style;
    if (prop === "Launches")
        buttons.launches = style;
    if (prop === 1)
        buttons.stage1 = style;
    if (prop === 2)
        buttons.stage2 = style;

    return buttons;
}

export function getDataByID(data, id, order) {
    let dataCopy;
    data.map((item, index) => {

        if (!order && item.id === id) {
            dataCopy = item;
        }

        else if (order === 'prev' && item.id === id) {
            if (item.id === id) {
                index > 0 ? dataCopy = data[index - 1] : dataCopy = data[data.length - 1];
            }
        }

        else if (order === 'next' && item.id === id) {
            index < data.length - 1 ? dataCopy = data[index + 1] : dataCopy = data[0];
        }
    })
    return dataCopy;
}
