var toggle = true;
chrome.browserAction.onClicked.addListener(function(tab){
    if(toggle) chrome.browserAction.setIcon({path: "files/off.png"});
    else chrome.browserAction.setIcon({path: "files/atsumori.png"});
    toggle = !toggle;
});

chrome.runtime.onMessage.addListener(
    function(req,sender,sendResponse){
        if(toggle){
            let sound = new Audio("files/atsumori.wav");
            sound.load();
            sound.play();

            sendResponse({execute: true}); //必ず何かオブジェクトを返す。
        }
        else sendResponse({execute: false});
    }
);