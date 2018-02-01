// content.js
console.log('i am in the content  ');
window.onload = function () {

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('i am in the content console');
      if( request.message === "hello" ) {
        console.log(firstHref);
      }
    }
  );
};
