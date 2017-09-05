document.addEventListener('mousedown', function(e) {
    //set atsumori element
    var div = document.createElement("div");
    div.setAttribute('style',"position:fixed; bottom:-100px; right:-50px;z-index:100");
    var img = document.createElement("img");
    var imgURL = chrome.runtime.getURL("files/atsumori.gif?" + (new Date).getTime());
    img.setAttribute("src", imgURL);
    img.setAttribute('width',"500px");
    img.setAttribute('height',"500px");

    //send message to background.js
    chrome.storage.sync.get(null, function(items) {
        let probability = items.probability || 10;
        if(Math.floor(Math.random()*probability) === 0){ //X回に1回実行
            chrome.runtime.sendMessage({apologize: false},function(response){
                if(response.execute === true){
                    var atsumoriArea = document.getElementsByTagName("body")[0].appendChild(div);
                    atsumoriArea.appendChild(img);
                    setTimeout(function(){
                        document.getElementsByTagName("body")[0].removeChild(div);
                        chrome.runtime.sendMessage({apologize: true},function(response){
                            //do nothing
                        });
                    },3000)
                }
            });
        }
    });
}, false);