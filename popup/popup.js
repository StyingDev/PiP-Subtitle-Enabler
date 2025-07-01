document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle");
    const blacklistBtn = document.getElementById("blacklist-btn");
  
    chrome.storage.local.get(["enabled"], (result) => {
      toggle.checked = result.enabled ?? true;
    });
  
    toggle.addEventListener("change", () => {
      chrome.storage.local.set({ enabled: toggle.checked });
    });
  
    // Get current tab hostname for blacklist
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      const domain = url.hostname;
  
      chrome.storage.local.get(["blacklist"], (result) => {
        const blacklist = result.blacklist || [];
  
        if (blacklist.includes(domain)) {
          blacklistBtn.textContent = "Unblacklist This Site";
        } else {
          blacklistBtn.textContent = "Blacklist This Site";
        }
  
        blacklistBtn.addEventListener("click", () => {
          const updatedBlacklist = new Set(blacklist);
  
          if (updatedBlacklist.has(domain)) {
            updatedBlacklist.delete(domain);
          } else {
            updatedBlacklist.add(domain);
          }
  
          chrome.storage.local.set({ blacklist: Array.from(updatedBlacklist) }, () => {
            blacklistBtn.textContent = updatedBlacklist.has(domain)
              ? "Unblacklist This Site"
              : "Blacklist This Site";
          });
        });
      });
    });
  });
  