
function sendMessage(value){
  chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    console.log(tab.url);
    window.close();

    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendMessage(tab.id, { message: value}, function(msg) {
        msg = msg || {};
        console.log('onResponse', msg.value);
      });
    });
  });
}

export default sendMessage;
