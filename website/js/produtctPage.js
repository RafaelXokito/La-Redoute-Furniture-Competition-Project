var elmCur = {};
var elmImgCur = {};
var elms = document.getElementById("sideImagesContainer").getElementsByTagName("*");
var elmsImgs = document.getElementById("centerImagesContainer").getElementsByClassName("item");

function changeCenterImg(i) { 
    elmCur.classList.remove("active");
    elms[i.name].classList.add("active");
    var next = parseInt(i.name) +1;

    var anterior = parseInt(i.name);

    if(anterior == 0)
        anterior = elmsImgs.length-1;

    if(next == elmsImgs.length)
        next = 0;
    
    for (var j = 0; j < elms.length; j++) {
        elmsImgs[j].style.transform = "translate(680px, 0px) translateZ(0px)";
    }

    elmsImgs[anterior].style.transform = "translate(-680px, 0px) translateZ(0px)";    
    elmsImgs[next].style.transform = "translate(680px, 0px) translateZ(0px)";
    elmsImgs[i.name].style.transform = "translate(0px, 0px) translateZ(0px)";
    elmImgCur = elmsImgs[i.name];
    elmCur = i;
}

var elm = {};

elmCur = elms[0];
elmImgCur = elmsImgs[0];

for (var i = 0; i < elms.length; i++) {
    elms[i].classList.remove("active");
    elms[i].name = i;
    elms[i].addEventListener("mouseover",  function()
    {   
        if(this != elmCur)
            changeCenterImg(this);
    }, false);
}
elms[0].classList.add("active");



elmsImgs[0].style.transform= "translate(0px, 0px) translateZ(0px)";
elmsImgs[1].style.transform= "translate(680px, 0px) translateZ(0px)";
elmsImgs[2].style.transform= "translate(680px, 0px) translateZ(0px)";
elmsImgs[3].style.transform= "translate(680px, 0px) translateZ(0px)";
elmsImgs[4].style.transform= "translate(-680px, 0px) translateZ(0px)";

var rightArrow = document.getElementById("rightArrow");
var leftArrow = document.getElementById("leftArrow");

rightArrow.addEventListener("click", function(){
    var next = parseInt(elmCur.name)+1;
    if(next == elmsImgs.length)
        next = 0;
    changeCenterImg(elms[next]);
});

leftArrow.addEventListener("click", function(){
    var previous = parseInt(elmCur.name)-1;
    if(previous == -1)
        previous = elmsImgs.length-1;
    changeCenterImg(elms[previous]);
}, false);

