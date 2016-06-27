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
        
        $(this).scrollTop(0);
        
        var p = $("#movie_player")[0]; //same as getelementbyid
        
        //fix player at the top
        var placeholderPlayer = $('#placeholder-player')[0];
        var leftDistance = placeholderPlayer.getBoundingClientRect().left;
        var topDistance = placeholderPlayer.getBoundingClientRect().top - 10; //always seems to be 50px from top. still i think this method it better.        
        
        $("#player").css({"position": "fixed", "display": "inline-block", "z-index": "2"});
        $("#player").css({"border-style": "solid", "border-color": "#F1F1F1", "border-top-width": topDistance, "padding-left": leftDistance});
        
        
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