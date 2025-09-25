document.getElementById("save").addEventListener("click", () => {
    let site = document.getElementById("productive-site").value;
    chrome.storage.local.get({ productiveSites: [] }, data => {
      let updatedSites = data.productiveSites;
      if (!updatedSites.includes(site)) {
        updatedSites.push(site);
      }
      chrome.storage.local.set({ productiveSites: updatedSites });
    });
  });  