// ==UserScript==
// @name         Better Youtube Scrolling
// @namespace    https://github.com/ljfed
// @description  Keeps youtube videos at the top of the page when you scroll down
// @author       ljfed
// @match        *://www.youtube.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

window.addEventListener("spfrequest", function(e) { console.log("requesting new page") });
window.addEventListener("spfprocess", function(e) { console.log("new page is processed") });
window.addEventListener("spfdone", function(e) { console.log("new page is displayed") });

$(document).ready(function () {

    $(window).scrollTop(0);
    var player = $("#movie_player")[0];

    function pageLoadNormal() {
        $(window).scrollTop(0);
        var placeholderPlayer = $('#placeholder-player .player-width')[0];        
        var topDistance = placeholderPlayer.getBoundingClientRect().top - 10; //always seems to be 50px from top. still i think this method it better.
        
        $("#player").css({"position": "fixed", "z-index": "2"});

        if ($(window).width() < 650) { //is 650 the correct value?
            var leftDistance = placeholderPlayer.getBoundingClientRect().left;
            $("#watch7-sidebar").css({"z-index": "0"});
        } else {
            var leftDistance = placeholderPlayer.getBoundingClientRect().left;
            $("#watch7-sidebar").css({"z-index": "3"}); //stops border showing up on side bar
        }
        
        $("#player").css({"border-style": "solid", "border-color": "#F1F1F1", "border-top-width": topDistance, "margin-left": leftDistance});
        
        playlist_open(false);        
    }
    
    function theaterMode() {
        var placeholdHeight = $('#placeholder-player').height() - 60;

        $("#watch7-sidebar").css({"z-index": "0"});
        $("#player").css({"position": "fixed", "left": "0", "right": "0", "z-index": "2"});
        //$("#movie_player").css({"height": "90%", "width": "90%"});  //make theater mode player smaller
        $(".player-api").css({"background-color": "#F1F1F1"});
        $("#placeholder-player").css({"height": placeholdHeight});
        
        playlist_open(true);
    }
    
    function playlist_open(theater_on) {
        var originalMarginBottom = 10;
        var playlistMarginBottom = $('#watch-appbar-playlist').height() + 10;
        
         if ($("#watch-appbar-playlist").is(':visible')) {   //TRY SOMETHING LIKE THIS WITH THEATER MODE!!??
             if (theater_on) { 
                 //#player #watch-appbar-playlist {css}
                 
//                 $("#player #watch-appbar-playlist").css({"position": "absolute", "z-index": "0"}); 
//                 $("#player #watch-appbar-playlist .main-content").css({"position": "static"});  
                 console.log("theater");
             } else {
                $("#player").css({"z-index": "4",});
                $("#watch-appbar-playlist").css({"position": "relative", "max-width": "430px"});
             }
             
             if ($(window).width() < 650) {
                 $("#placeholder-player").css({"margin-bottom": playlistMarginBottom});            
             } else {
                 $("#placeholder-player").css({"margin-bottom": originalMarginBottom});  
             }
         }
    }

    function checkTheaterMode() {
        if ($('#page').hasClass('watch-stage-mode') && $(window).width() > 650) { //better way to detect theater mode?
            theaterMode();
        } else {
            pageLoadNormal();
        }
    }

    function run() {
        $(window).resize(function () {
            checkTheaterMode();
        });
        checkTheaterMode();
    }

    run();

    //space key stuff
    $(document).on("keydown", function (e) {
        if (e.keyCode === 32) {
            var mouseOverComment = $('.comment-simplebox-text').is(":hover");  //mouse over comment

            if (e.target.nodeName.toLowerCase() !== 'input' && !mouseOverComment) { //not in text field or hovering over coment   
                
                var videoPlayerStates = {
                    1: "playing",
                    2: "paused"
                };
                var currentState = player.getPlayerState();
                
                if (currentState === 1) {
                    player.pauseVideo();
                } else if (currentState === 2) {
                    player.playVideo();
                }

                e.preventDefault();
            }
        }
    });

}); 