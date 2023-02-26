const xhr = new XMLHttpRequest();
xhr.open('GET', '/');
xhr.onload = function() {
  const serverProcessingTime = parseFloat(xhr.getResponseHeader('X-Server-Processing-Time'));
  if (isNaN(serverProcessingTime)) {
    console.log('Invalid server processing time');
  } else {
    const domLoadedTime = performance.getEntriesByType('navigation')[0].responseStart - performance.getEntriesByType('navigation')[0].requestStart;
    const renderTimeElement = document.getElementById("loading");
    console.log("Total load time: " + domLoadedTime + " ms (client) " + serverProcessingTime + " ms (server)");
  }
};
xhr.send();