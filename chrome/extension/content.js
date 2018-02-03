// content.js
console.log('[content.js] init');

const waitTime = 5000;
const bgColor = "#fff";
const color = "#00a63f";
const clickEvents = function (message, delay) {
  var i = delay? 2 : 1;
  message.map((el) => {
    (function (index){
      setTimeout(() => {
        if(document.querySelector(`[data-aid=${el}]`)){
          document.querySelector(`[data-aid=${el}]`).style.backgroundColor=bgColor;
          document.querySelector(`[data-aid=${el}]`).style.color=color;
          document.querySelector(`[data-aid=${el}]`).style.animation="shake 3s";
        }
      }, waitTime*index -3000);
      setTimeout(() => {
          if(document.querySelector(`[data-aid=${el}]`)){
            document.querySelector(`[data-aid=${el}]`).click();
          }
        }, waitTime*index);
    })(i);  // set timeout for the sequence event
    i++;
  });
};

window.onload = function () {

  var style = document.createElement('style');
  style.type = 'text/css';

  var keyFrames = '@keyframes shake {\
    0% { transform: translate(5px, 5px) rotate(0deg); }\
    10% { transform: translate(-5px, -10px) rotate(-30deg); }\
    20% { transform: translate(-15px, 0px) rotate(30deg); }\
    30% { transform: translate(15px, 10px) rotate(0deg); }\
    40% { transform: translate(5px, -5px) rotate(30deg); }\
    50% { transform: translate(-5px, 10px) rotate(-30deg); }\
    60% { transform: translate(-15px, 5px) rotate(0deg); }\
    70% { transform: translate(15px, 5px) rotate(-30deg); }\
    80% { transform: translate(-5px, -5px) rotate(30deg); }\
    90% { transform: translate(5px, 10px) rotate(0deg); }\
    100% { transform: translate(5px, -10px) rotate(-30deg); }\
}'

  style.innerHTML = keyFrames;
  document.getElementsByTagName('head')[0].appendChild(style);

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request.message);

      var i = 1;
      var delay = false;
      const preview = 'EDITOR_HEADER_PREVIEW_BUTTON';
      if(document.querySelector(`[data-aid=${preview}]`)){
        console.log('go to preview');
        delay = true;
        document.querySelector(`[data-aid=${preview}]`).style.backgroundColor=bgColor;
        document.querySelector(`[data-aid=${preview}]`).style.color=color;
        document.querySelector(`[data-aid=${preview}]`).style.animation="shake 7s";
        setTimeout(() => {
          document.querySelector(`[data-aid=${preview}]`).click();
        }, waitTime);
      }

      clickEvents(request.message, delay);

      sendResponse({value: 'finished on content'});
    }
  );
};
