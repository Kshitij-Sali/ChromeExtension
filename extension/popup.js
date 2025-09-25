document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["timeSpent"], data => {
      let timeList = document.getElementById("time-list");
      let timeSpent = data.timeSpent || {};
  
      for (let site in timeSpent) {
        let listItem = document.createElement("li");
        listItem.textContent = `${site}: ${Math.round(timeSpent[site] / 60)} min`;
        timeList.appendChild(listItem);
      }
    });
  });  