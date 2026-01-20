document.addEventListener("DOMContentLoaded", () => {

  function updateUI(state) {
    const btn = document.getElementById("toggle");
    btn.innerText = state ? "Disable" : "Enable";
    btn.className = state ? "off" : "on";
  }

  function updateCount(val) {
    document.getElementById("count").innerText = val;
  }

  
  chrome.runtime.sendMessage({ get: true }, res => {
    updateCount(res.blocked);
    updateUI(res.enabled);
  });

  
  document.getElementById("toggle").onclick = () => {
    chrome.runtime.sendMessage({ toggle: true }, res => {
      updateUI(res.enabled);
    });
  };

  
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.blocked) {
      updateCount(changes.blocked.newValue);
    }
    if (changes.enabled) {
      updateUI(changes.enabled.newValue);
    }
  });

});
