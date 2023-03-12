$(document).ready(function() {
  const domLoadedTime = performance.getEntriesByType('navigation')[0].responseStart - performance.getEntriesByType('navigation')[0].requestStart;
  const renderTimeElement = document.getElementById("loading");
  renderTimeElement.innerHTML += ("Total load time: " + domLoadedTime + " ms (client) + ");
});