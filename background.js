function handleTabCreated(tab) {
  chrome.tabs.remove(tab.id);
}

function teardown() {
  chrome.tabs.onCreated.removeListener(handleTabCreated);
}

function init() {
  chrome.tabs.query(
    {
      windowType: "normal",
      pinned: false,
    },
    function (tabs) {
      if (tabs.length > 1) {
        for (let i = 1; i < tabs.length; i++) {
          const tabId = tabs[i].id;
          chrome.tabs.remove(tabId);
        }
      }
      tabsCount = tabs.length;
    }
  );
  chrome.tabs.onCreated.addListener(handleTabCreated);
}

init();
