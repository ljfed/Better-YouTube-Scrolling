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
    // Code Goes Here!!
    
    //player is in #body > #body container > #page > #player
    $(document).ready(function(){
        $("#player").css({"position": "fixed", "z-index": "2", "padding-left": "312px", "border-style": "solid", "border-color": "#F1F1F1", "border-top-width": "50px"});
        //$("#player").addClass("content-alignment");
        
        $("#watch7-sidebar").css({"z-index": "3"}); //stops border showing up on side bar
    });
    
})();