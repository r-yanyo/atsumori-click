var toggle = true;
chrome.browserAction.onClicked.addListener(function(tab){
    if(toggle) chrome.browserAction.setIcon({path: "files/off.png"});
    else chrome.browserAction.setIcon({path: "files/atsumori.png"});
    toggle = !toggle;
});

chrome.runtime.onMessage.addListener(
    function(req,sender,sendResponse){
        console.log(req);
        if(toggle){
            //熱盛サウンドを鳴らす
            if(req.apologize === false){
                let sound = new Audio("files/atsumori.wav");
                sound.volume = 0.2;
                sound.load();
                sound.play();

                sendResponse({execute: true}); //必ず何かオブジェクトを返す。
            }
            else if(req.apologize === true){
                let sound = new Audio("files/apologize.mp3");
                sound.volume = 0.2;
                sound.load();
                sound.play();

                sendResponse({execute: false}); //必ず何かオブジェクトを返す。
            }
        }
        else sendResponse({execute: false});
    }
);