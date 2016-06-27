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
        
        var player = $("#movie_player")[0];
        
        function pageLoad() { 
            $(this).scrollTop(0);

            //fix player at the top
            var placeholderPlayer = $('#placeholder-player')[0];
            var leftDistance = placeholderPlayer.getBoundingClientRect().left;
            console.log(leftDistance);
            var topDistance = placeholderPlayer.getBoundingClientRect().top - 10; //always seems to be 50px from top. still i think this method it better.        

            $("#player").css({"position": "fixed", "display": "inline-block", "z-index": "2"});
            $("#player").css({"border-style": "solid", "border-color": "#F1F1F1", "border-top-width": topDistance, "margin-left": leftDistance});


            $("#watch7-sidebar").css({"z-index": "3"}); //stops border showing up on side bar
        }
        
        pageLoad();
        
        $(window).resize(function() { //check when window is resized
            pageLoad();
        });
        
        
        //space key stuff
        $(document).on("keydown", function (e) {            
            if (e.keyCode == 32) {
                
                var videoPlayerStates = { 
                    1: "playing", 
                    2: "paused" 
                };
                var currentState = player.getPlayerState();
                
                if (currentState == 1) {
                    player.pauseVideo();
                } else if (currentState == 2) {
                    player.playVideo();
                }
                
                //stops page from scrolling
                e.preventDefault();
                
            }
        });

    });
    
})();