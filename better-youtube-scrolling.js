// ==UserScript==
// @name         Better Youtube Scrolling
// @namespace    https://github.com/ljfed
// @description  Keeps youtube videos at the top of the page when you scroll down
// @author       ljfed
// @match        *://www.youtube.com/watch*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//^ ABOVE is the tamper monkey stuff

(function() {
    'use strict';
    
    //player is in #body > #body container > #page > #player
    
    $(document).ready(function(){
        
        var p = window.document.getElementById("movie_player");
        
        //fix player at the top
        $("#player").css({"position": "fixed", "z-index": "2", "padding-left": "312px", "border-style": "solid", "border-color": "#F1F1F1", "border-top-width": "50px"});
        $("#watch7-sidebar").css({"z-index": "3"}); //stops border showing up on side bar
        
        //space stuff
        $(document).on("keydown", function (e) {            
            if (e.keyCode == 32) {
                
                var videoPlayerStates = { 
                    1: "playing", 
                    2: "paused" 
                };
                var currentState = p.getPlayerState();
                
                if (currentState == 1) {
                    p.pauseVideo();
                } else if (currentState == 2) {
                    p.playVideo();
                }
                
                //stops page from scrolling
                e.preventDefault();
                
            }
        });

    });
    
})();