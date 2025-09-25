let activeTab = null;
let startTime = null;
let timeSpent = {};

// Detect tab switch
chrome.tabs.onActivated.addListener(activeInfo => {
  trackTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    activeTab = tab.url;
    startTime = Date.now();
  });
});

// Track time when switching tabs
function trackTime() {
  if (activeTab && startTime) {
    let endTime = Date.now();
    let domain = new URL(activeTab).hostname;
    let duration = (endTime - startTime) / 1000; // in seconds

    if (!timeSpent[domain]) {
      timeSpent[domain] = 0;
    }
    timeSpent[domain] += duration;
    chrome.storage.local.set({ timeSpent });
  }
}

// Save data periodically
chrome.alarms.create("saveTime", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "saveTime") {
    trackTime();
  }
});