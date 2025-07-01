function showTextTracks(video) {
  if (video.textTracks) {
    for (let i = 0; i < video.textTracks.length; i++) {
      video.textTracks[i].mode = "showing";
    }
  }
}

function handleVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    showTextTracks(video);
    video.addEventListener("loadedmetadata", () => showTextTracks(video));
  });
}

function observeNewVideos() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "VIDEO") {
          showTextTracks(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll("video").forEach((v) => showTextTracks(v));
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Check toggle before enabling
chrome.storage.local.get(["enabled", "blacklist"], (result) => {
  if (typeof result.enabled === "undefined") {
    chrome.storage.local.set({ enabled: true });
    result.enabled = true;
  }

  const hostname = window.location.hostname;
  const blacklist = result.blacklist || [];

  if (result.enabled && !blacklist.includes(hostname)) {
    handleVideos();
    observeNewVideos();
  }
});

