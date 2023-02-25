window.onload = Pageloadtime();

function Pageloadtime() {
    console.log("mmm");
    const renderTimeElement = document.getElementById('render-time');
    const serverProcessingTime = document.querySelector('meta[name="server-processing-time"]');

    if (serverProcessingTime) {
        const serverProcessingTime = parseFloat(serverProcessingTime.content);
        const domLoadedTime = performance.getEntriesByType('navigation')[0].responseStart - performance.getEntriesByType('navigation')[0].requestStart;

        renderTimeElement.innerHTML += "Total load time: " + domLoadedTime + " ms (client) " + serverProcessingTime + " ms (server)";
    } else {
        renderTimeElement.innerHTML += "GG";
    }
}  