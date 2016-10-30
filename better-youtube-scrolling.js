// ==UserScript==
// @name         Better Youtube Scrolling
// @description  Keeps youtube videos at the top of the page when you scroll down
// @author       ljfed
// @namespace    https://github.com/ljfed
// @homepageURL  https://github.com/ljfed/Better-YouTube-Scrolling
// @match        *://www.youtube.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

window.addEventListener("spfrequest", function (e) { console.log("requesting new page"); });
window.addEventListener("spfprocess", function (e) { console.log("new page is processed"); });
window.addEventListener("spfdone", function (e) { console.log("new page is displayed"); });

$(document).ready(function () {
    
    function checkPlaylist() {
        if ($("#watch-appbar-playlist").is(':visible')) {
            playlist_on = true;
        } else {
            playlist_on = false;
        }
    }
    
    function checkTheaterMode() {
        if ($('#page').hasClass('watch-stage-mode')) { //better way to detect theater mode?
            theaterModeOn = true;
        } else {
            theaterModeOn = false;
        }
    }
    
    function pageLoadNormal() {
        var placeholderPlayer = $('#placeholder-player .player-api')[0];
        var topDistance = placeholderPlayer.getBoundingClientRect().top - 10; //always seems to be 50px from top. still i think this method it better.
        
        $("#player").css({"position": "fixed", "z-index": "2"});

        if ($(window).width() < 640) {
            var leftDistance = placeholderPlayer.getBoundingClientRect().left;
            $("#watch7-sidebar").css({"z-index": "0"});
        } else {
            var leftDistance = placeholderPlayer.getBoundingClientRect().left;
            $("#watch7-sidebar").css({"z-index": "3"}); //stops border showing up on side bar
        }
        
        $("#player").css({"border-style": "solid", "border-color": "#F1F1F1", "border-top-width": topDistance, "margin-left": leftDistance});
    }
    
    function theaterMode() {
        var placeholdHeight = $('#placeholder-player').height() - 60;

        $("#watch7-sidebar").css({"z-index": "0"});
        $("#player").css({"position": "fixed", "left": "0", "right": "0", "z-index": "2"});
        $(".player-api").css({"background-color": "#F1F1F1"});
        $("#placeholder-player").css({"height": placeholdHeight});
    }
    
    function playlist_open() {
        var originalMarginBottom = 10;
        var playlistMarginBottom = $('#watch-appbar-playlist').height() + 10;
        
        if ($("#watch-appbar-playlist").is(':visible')) {
            if (theaterModeOn) {
                 //For later maybe
            } else {
                $("#player").css({"z-index": "4"});
                $("#watch-appbar-playlist").css({"position": "relative", "max-width": "480px"});
            }
             
            if ($(window).width() < 640) {
                $("#placeholder-player").css({"margin-bottom": playlistMarginBottom});
            } else {
                $("#placeholder-player").css({"margin-bottom": originalMarginBottom});
            }
        }
    }
    
    //auto click show more and load more buttons
    function autoLoadMore() {
        $(window).scroll(function () {
            if ($(".load-more-button").is(':visible')) {
                var allButtons = $(".load-more-button");
                var loadButton = test[test.length -1]; //using 0 here assigns this to the button to view replies to a comment. the button we want is the one at the end of the page
                var distanceToBottom = $(document).height() - ($(window).height() + $('body').scrollTop());
                
                if (distanceToBottom < 250) {
                    loadButton.click(); // this will trigger the click event
                }
            }
        });
    }
    
    function run() {
        autoLoadMore();
        if (theaterModeOn) {
            theaterMode();
        } else {
            pageLoadNormal();
        }
        
        if (playlist_on) {
            if (!theaterModeOn) {
                pageLoadNormal(); //i shouldn't have to put this here because it should be called above, but playlist on small screen work if i don't
            }
            playlist_open();
        }
        
    }
    
    $(window).scrollTop(0);
    var player = $("#movie_player")[0];
    
    checkPlaylist();
    checkTheaterMode();
    
    $(window).resize(function () {
        run();
    });
    run();
    
    //stop scroll to top when clicking on a time link
    $(document).on("click", 'a', function (MouseEvent) {

        var offsetHeight = $(player).height() + $(player).offset().top;
        var scrollDistance = $(this).offset().top - offsetHeight;
        $(window).scrollTop(scrollDistance);
    });
    
    //keyboard stuff   
    $(document).on("keydown", function (e) {
        if (e.keyCode === 32 || e.keyCode === 37 || e.keyCode === 39) {
            //32 = space, 37 = left arrow, 39 = right arrow
            
            selectionClassName = e.target.className;
            var playerSelected = (selectionClassName.indexOf("html5-video-player") >= 0);
            var commentSelected = (selectionClassName.indexOf("comment-simplebox-text") >= 0);
            var currentTime = player.getCurrentTime();

            if (e.target.nodeName.toLowerCase() !== 'input' && !commentSelected && !playerSelected) { //not in text field or hovering over comment and player not selected 
                
                if (e.keyCode === 32) {
                    //state 1 = playing, state 2 = paused
                    var currentState = player.getPlayerState();

                    if (currentState === 1) {
                        player.pauseVideo();
                    } else if (currentState === 2) {
                        player.playVideo();
                    }
                    e.preventDefault();
                }
                if (e.keyCode === 37) {
                    player.seekTo(currentTime - 5, true);
                }
                if (e.keyCode === 39) {
                    player.seekTo(currentTime + 5, true);
                }
            }
        }
    });
});