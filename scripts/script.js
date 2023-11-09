// bron:https://codepen.io/tholman/full/jWmZxZ/ - ik snap de code niet maar mag het wel gebruiken van Sanne



(function fairyDustCursor() {
   var possibleColors = ["#fdfa94", "#a18130", "#dfc75d"];
   var width = window.innerWidth;
   var height = window.innerHeight;
   var cursor = { x: width / 2, y: width / 2 };
   var particles = [];
 
   function applyProperties(target, properties) {
     for (var key in properties) {
       target.style[key] = properties[key];
     }
   }
 
   function Particle() {
     this.character = "*";
     this.lifeSpan = 120;
     this.initialStyles = {
       position: "absolute",
       display: "block",
       pointerEvents: "none",
       "z-index": "10000000",
       fontSize: "16px",
       "will-change": "transform",
     };
 
     this.init = function (x, y, color) {
       this.velocity = {
         x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
         y: 1,
       };
 
       this.position = { x: x - 10, y: y - 20 };
       this.initialStyles.color = color;
 
       this.element = document.createElement("span");
       this.element.innerHTML = this.character;
       applyProperties(this.element, this.initialStyles);
       this.update();
 
       document.querySelector(".container").appendChild(this.element);
     };
 
     this.update = function () {
       this.position.x += this.velocity.x;
       this.position.y += this.velocity.y;
       this.lifeSpan--;
 
       this.element.style.transform =
         "translate3d(" +
         this.position.x +
         "px," +
         this.position.y +
         "px, 0) scale(" +
         this.lifeSpan / 120 +
         ")";
     };
 
     this.die = function () {
       this.element.parentNode.removeChild(this.element);
     };
   }
 
   function addParticle(x, y, color) {
     var particle = new Particle();
     particle.init(x, y, color);
     particles.push(particle);
   }
 
   function updateParticles() {
     for (var i = 0; i < particles.length; i++) {
       particles[i].update();
     }
 
     for (var i = particles.length - 1; i >= 0; i--) {
       if (particles[i].lifeSpan < 0) {
         particles[i].die();
         particles.splice(i, 1);
       }
     }
   }
 
   function onMouseMove(e) {
     cursor.x = e.clientX;
     cursor.y = e.clientY;
 
     addParticle(
       cursor.x,
       cursor.y,
       possibleColors[Math.floor(Math.random() * possibleColors.length)]
     );
   }
 
   function onTouchMove(e) {
     if (e.touches.length > 0) {
       for (var i = 0; i < e.touches.length; i++) {
         addParticle(
           e.touches[i].clientX,
           e.touches[i].clientY,
           possibleColors[Math.floor(Math.random() * possibleColors.length)]
         );
       }
     }
   }
 
   function onWindowResize(e) {
     width = window.innerWidth;
     height = window.innerHeight;
   }
 
   function loop() {
     requestAnimationFrame(loop);
     updateParticles();
   }
 
   function bindEvents() {
     document.addEventListener("mousemove", onMouseMove);
     document.addEventListener("touchmove", onTouchMove);
     document.addEventListener("touchstart", onTouchMove);
     window.addEventListener("resize", onWindowResize);
   }
 
   function init() {
     bindEvents();
     loop();
   }
 
   init();
 })();
 
 

// easteregg 
var textSection = document.querySelector('#slide4 > section:nth-of-type(2)');
var fire = document.querySelector('.fire');
var bibble = document.querySelector('.bibble-scream');


textSection.addEventListener('click', function() {
   fire.classList.add('active');
   bibble.classList.add('active');
   var audio = new Audio('audio/scream.mp3');
   audio.play();
});

bibble.addEventListener('click', function() {
   fire.classList.remove('active');
   bibble.classList.remove('active');
});


// theme songs

var nutcrackerLinkRight = document.querySelector('#slide1 > a:last-of-type');
var rapunzelLinkLeft = document.querySelector('#slide2 > a:first-of-type');
var rapunzelLinkRight = document.querySelector('#slide2 > a:last-of-type');
var fairytopiaLinkLeft = document.querySelector('#slide3 > a:first-of-type');
var fairytopiaLinkRight = document.querySelector('#slide3 > a:last-of-type');
var princessPauperLinkLeft = document.querySelector('#slide4 > a:first-of-type');
var princessPauperLinkRight = document.querySelector('#slide4 > a:last-of-type');
var pegasusLinkLeft = document.querySelector('#slide5 > a:first-of-type');
var pegasusLinkRight = document.querySelector('#slide5 > a:last-of-type');
var mermaidiaLinkLeft = document.querySelector('#slide6 > a:first-of-type');
var mermaidiaLinkRight = document.querySelector('#slide6 > a:last-of-type');
var islandPrincessLinkLeft = document.querySelector('#slide7 > a:first-of-type');
var islandPrincessLinkRight = document.querySelector('#slide7 > a:last-of-type');

var audio = null;
var slideIndex = 0;

var audioFiles = [
   'audio/nutcracker.mp3',
   'audio/rapunzel.mp3',
   'audio/princess-pauper.mp3',
   'audio/fairytopia.mp3',
   'audio/pegasus.mp3',
   'audio/mermaidia.mp3',
   'audio/island-princess.mp3',
];

// Als er een nieuwe audio is, moet de oude op pauze
function playAudio(audioSource) {
  if (audio) {
    audio.pause();
  }

  audio = new Audio(audioSource);
  audio.play();
}

// Speel notenkraker af bij het openen van de pagina
window.addEventListener('load', function() {
  playAudio('audio/nutcracker.mp3');
});

// Bron: chatGPT
function changeSlide(newIndex) {
  slideIndex = newIndex;
  if (slideIndex < 0) {
    slideIndex = audioFiles.length - 1;
  } else if (slideIndex >= audioFiles.length) {
    slideIndex = 0;
  }

  playAudio(audioFiles[slideIndex]);
}

nutcrackerLinkRight.addEventListener('click', function() {
  changeSlide(slideIndex + 1);
});

rapunzelLinkLeft.addEventListener('click', function() {
  changeSlide(slideIndex - 1);
});

rapunzelLinkRight.addEventListener('click', function() {
  changeSlide(slideIndex + 1);
});

princessPauperLinkLeft.addEventListener('click', function() {
  changeSlide(slideIndex - 1);
});

princessPauperLinkRight.addEventListener('click', function() {
  changeSlide(slideIndex + 1);
});

fairytopiaLinkLeft.addEventListener('click', function() {
  changeSlide(slideIndex - 1);
});

fairytopiaLinkRight.addEventListener('click', function() {
  changeSlide(slideIndex + 1);
});

pegasusLinkLeft.addEventListener('click', function() {
  changeSlide(slideIndex - 1);
});

pegasusLinkRight.addEventListener('click', function() {
  changeSlide(slideIndex + 1);
});

mermaidiaLinkLeft.addEventListener('click', function() {
  changeSlide(slideIndex - 1);
});

mermaidiaLinkRight.addEventListener('click', function() {
  changeSlide(slideIndex + 1);
});

islandPrincessLinkLeft.addEventListener('click', function() {
  changeSlide(slideIndex - 1);
});

islandPrincessLinkRight.addEventListener('click', function() {
  changeSlide(slideIndex + 1);
});




