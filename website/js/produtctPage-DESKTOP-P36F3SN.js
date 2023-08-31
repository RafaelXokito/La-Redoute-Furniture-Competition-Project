var elmCur = {};
var elmImgCur = {};
var elms = document.getElementById("sideImagesContainer").getElementsByTagName("*");
var elmsImgs = document.getElementById("centerImagesContainer").getElementsByTagName("div");

function renderizar() {
    renderer.render( cena, camara )
}

function animar() {
    requestAnimationFrame( animar )
    misturador.update(clock.getDelta());
    renderizar()
    //stats.update()
}

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
        if(elms[i] != elmCur)
            changeCenterImg(this);
    }, false);
}
elms[0].classList.add("active");

//ANIMATION DECLARATION SECTION
var cena = new THREE.Scene();
var meuCanvas = document.getElementById( 'camaVintageCanvas' )
var renderer = new THREE.WebGLRenderer( { canvas: meuCanvas } )
var camara = new THREE.PerspectiveCamera( 70, 800 / 600, 0.1, 500 );
var grelha = new THREE.GridHelper()
var carregador = new THREE.GLTFLoader()
cena.add(grelha);
var clock = new THREE.Clock();
var misturador = new THREE.AnimationMixer(cena);
//END OF ANIMATION DECLARATTION SECTION


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


//ANIMATION STARTING AND LOADING
renderer.setSize( window.innerWidth, window.innerHeight );

var acao = [];
var clip;


carregador.load(
    'teste_macaco.gltf', function ( gltf ) {
    
        clip = THREE.AnimationClip.findByName(gltf.animations, 'LocZ')
        acao[0] = misturador.clipAction(clip)
        acao.play()

        alert(clip);
    
        /*
        clip = THREE.AnimationClip.findByName(gltf.animations, 'RotZ')
        acao[1] = misturador.clipAction(clip)
        //acao.play()
    
        clip = THREE.AnimationClip.findByName(gltf.animations, 'LocZ')
        acao[2] = misturador.clipAction(clip)
        */

    cena.add( gltf.scene )
    }
   )



controlos.addEventListener( 'change', renderizar )
renderizar()

animar();

//ANIMATION--

