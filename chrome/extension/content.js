// content.js
console.log('[content.js] init');

const clickEvents = function (message, delay) {
  var i = delay? 2 : 1;
  message.map((el) => {
    (function (index){
      setTimeout(() => { document.querySelector(`[data-aid=${el}]`) && document.querySelector(`[data-aid=${el}]`).click();}, 2000*index);
    })(i);  // set timeout for the sequence event
    i++;
  });
};

window.onload = function () {

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.message);

      var i = 1;
      var delay = false;
      const preview = 'EDITOR_HEADER_PREVIEW_BUTTON';
      if(document.querySelector(`[data-aid=${preview}]`)){
        console.log('go to preview');
        delay = true;
        setTimeout(() => {
          document.querySelector(`[data-aid=${preview}]`).click();
        }, 2000);
      }

      clickEvents(request.message, delay);

      sendResponse({value: 'finished on content'});
    }
  );
};
