let enabled = true;
let blocked = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    enabled: true,
    blocked: 0
  });
});


chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(() => {
  blocked++;
  chrome.storage.local.set({ blocked });
  chrome.action.setBadgeText({ text: blocked.toString() });
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  
  if (msg.get) {
    chrome.storage.local.get(["enabled","blocked"], data => {
      sendResponse(data);
    });
    return true; 
  }

  
  if (msg.toggle) {
    enabled = !enabled;
    chrome.storage.local.set({ enabled });

    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: enabled ? ["ruleset"] : [],
      disableRulesetIds: enabled ? [] : ["ruleset"]
    });

    sendResponse({ enabled });
    return true; 
  }
});
