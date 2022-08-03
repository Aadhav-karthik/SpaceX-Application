export default async function fetchHistoryData() {
    try {
        const response = await fetch('https://api.spacexdata.com/v4/history');

        return await response.json();
    } catch (err) {
        throw new Error("No response from the Server");
    }
}
