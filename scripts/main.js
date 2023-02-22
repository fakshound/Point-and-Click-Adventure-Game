/*global $, jquery, p5, window*/

var Main = (function () {
    "use strict";
    var pub = {};

    function prepareGame () {
        $("#startHere").hide();
        console.log("reset requested")
        window.location.reload;
        
    }
  
  
  
        pub.setup = function () {
            //Begin game
            $('#resetGame').click(prepareGame);
        };
    return pub;
}());
          
$(document).ready(Main.setup);