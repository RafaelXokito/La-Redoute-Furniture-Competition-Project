

function move(element, direction, distance) {
    var topOrLeft = (direction=="left" || direction=="right") ? "left" : "top";
    var frameDistance = 1.2;
    if (direction=="up" || direction=="left"){
       distance *= -1;
       frameDistance = -1.2;
    }
    var elStyle = window.getComputedStyle(element);
    var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
    var destination = (Number(value) + distance) + "px";
    function moveAFrame() {
       if (elStyle.getPropertyValue(topOrLeft)==destination) {
         clearInterval(movingFrames);
         onMove = false;
       }
       else {
        onMove = true;
          elStyle = window.getComputedStyle(element);
          value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
         element.style[topOrLeft] = (Number(value) + frameDistance) + "px";
       }
    }
    var movingFrames = setInterval(moveAFrame, 0);
 }

 function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 5);
}

 function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

var headerBar = document.getElementById("globalHeader");

//buttons in global header
var searchButton = document.getElementById("btnSearch");
var btnNewsletter = document.getElementById("btnNewsletter");
var btnShoppingBagIcon = document.getElementById("btnShoppingBagIcon");
var btnUserProfileIcon = document.getElementById("btnUserProfileIcon");

var searchBar = document.getElementById("searchBar");

var logo = document.getElementById("logoid");

var littleBox = document.getElementById("little-box");
var boolLeftOrRightHeader = 1;
var onMove = false;



fade(searchBar);


searchButton.addEventListener("click",function(){
    if(onMove === false){
        if(boolLeftOrRightHeader === 1){
            move(littleBox,"left",300);
            move(searchButton,"left",300);
            move(btnNewsletter,"right",300);
            move(btnShoppingBagIcon,"right",300);
            move(btnUserProfileIcon,"right",300);
            $("#btnNewsletter").fadeOut("slow");
            $("#btnShoppingBagIcon").fadeOut("slow");
            $("#btnUserProfileIcon").fadeOut("slow");
            searchBar.style.display = "flex";
            move(searchBar,"left",270);
            unfade(searchBar);
            boolLeftOrRightHeader = 2
        }else if (boolLeftOrRightHeader === 2){
            move(littleBox,"right",300);
            move(searchButton,"right",300);
            move(btnNewsletter,"left",300);
            move(btnShoppingBagIcon,"left",300);
            move(btnUserProfileIcon,"left",300);
            $("#btnNewsletter").fadeIn("slow");
            $("#btnShoppingBagIcon").fadeIn("slow");
            $("#btnUserProfileIcon").fadeIn("slow");
            fade(searchBar);
            move(searchBar,"right",270);
            boolLeftOrRightHeader = 1
        }
    }
},false);


