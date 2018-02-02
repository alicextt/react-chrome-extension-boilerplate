
function sendMessage(value){
  chrome.tabs.getSelected(null, function(tab) {
    console.log(tab.url);
    if(tab.url.includes('window.html')){
      // this is contextMenu
      chrome.runtime.sendMessage({message: value}, function(msg){
        console.log('msg');
      });
    } else{
      window.close();
      chrome.tabs.sendMessage(tab.id, { message: value}, function(msg) {
        msg = msg || {};
        console.log('onResponse', msg.value);
      });
    }
  });
}

export default sendMessage;
