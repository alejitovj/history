// ==============================
// CONTADOR ❤️
// ==============================

const fechaInicio = new Date(2026, 1, 5, 0, 0, 0);

function actualizarContador() {

    const ahora = new Date();

    let diferencia = ahora.getTime() - fechaInicio.getTime();

    if (diferencia < 0) {
        diferencia = 0;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;

}

actualizarContador();

setInterval(actualizarContador, 1000);

// ==============================
// CARTA ❤️
// ==============================

const mensaje = "Dicen que las personas son pasajeras.\n\nPero desde que tú llegaste mi vida cambio por completo.\n\nCada día contigo es una aventura y un recuerdo hermoso.\n\nGracias por existir y por hacerme tan feliz.\n\nDesde el 5 de febrero de 2026 mi corazón encontró su lugar favorito.\n\n🖤 Te amo infinitamente 🖤";

const texto = document.getElementById("texto");

let indice = 0;

function escribir() {

    if (!texto) return;

    if (indice < mensaje.length) {

        texto.innerHTML += mensaje.charAt(indice);

        indice++;

        setTimeout(escribir, 40);

    }

}

escribir();

// ==============================
// PÉTALOS 🌹
// ==============================

function crearPetalo() {

    const petalo = document.createElement("div");

    petalo.className = "petalo";

    petalo.innerHTML = "🌹";

    petalo.style.left = Math.random() * 100 + "vw";

    petalo.style.fontSize = (20 + Math.random() * 20) + "px";

    petalo.style.animationDuration = (5 + Math.random() * 5) + "s";

    document.body.appendChild(petalo);

    setTimeout(function () {

        petalo.remove();

    }, 10000);

}

setInterval(crearPetalo, 500);

// ==============================
// CORAZONES ❤️
// ==============================

function crearCorazon() {

    const corazon = document.createElement("div");

    corazon.className = "petalo";

    corazon.innerHTML = "❤️";

    corazon.style.left = Math.random() * 100 + "vw";

    corazon.style.fontSize = (15 + Math.random() * 25) + "px";

    corazon.style.animationDuration = (4 + Math.random() * 4) + "s";

    document.body.appendChild(corazon);

    setTimeout(function () {

        corazon.remove();

    }, 8000);

}

setInterval(crearCorazon, 300);

// ==============================
// CURSOR ✨
// ==============================

document.addEventListener("mousemove", function (e) {

    const brillo = document.createElement("div");

    brillo.innerHTML = "🖤";

    brillo.style.position = "fixed";
    brillo.style.left = e.clientX + "px";
    brillo.style.top = e.clientY + "px";
    brillo.style.pointerEvents = "none";
    brillo.style.fontSize = "10px";
    brillo.style.zIndex = "9999";

    document.body.appendChild(brillo);

    setTimeout(function () {

        brillo.remove();

    }, 800);

});

// ==============================
// BOTÓN LLUVIA 💖
// ==============================

const lluvia = document.getElementById("lluvia");

if (lluvia) {

    lluvia.addEventListener("click", function () {

        for (let i = 0; i < 150; i++) {

            setTimeout(function () {

                const c = document.createElement("div");

                c.className = "petalo";

                c.innerHTML = "💖";

                c.style.left = Math.random() * 100 + "vw";

                c.style.fontSize = (20 + Math.random() * 20) + "px";

                c.style.animationDuration = (3 + Math.random() * 3) + "s";

                document.body.appendChild(c);

                setTimeout(function () {

                    c.remove();

                }, 7000);

            }, i * 20);

        }

    });

}

// ==============================
// MÚSICA 🎵
// ==============================

const audio = document.getElementById("audio");
const musica = document.getElementById("musica");

function iniciarMusica() {

    audio.play().catch(() => {});

    document.removeEventListener("touchstart", iniciarMusica);
    document.removeEventListener("click", iniciarMusica);

}

document.addEventListener("touchstart", iniciarMusica, { once: true });
document.addEventListener("click", iniciarMusica, { once: true });

musica.addEventListener("click", function () {

    if (audio.paused) {

        audio.play();

        musica.textContent = "⏸️ Pausar Música";

    } else {

        audio.pause();

        musica.textContent = "🎵 Música";

    }

});

// ==============================
// FRASES ❤️
// ==============================

const frases = [

    "❤️ Eres mi lugar favorito",
    "🌹 Gracias por existir",
    "💖 Siempre te elegiría",
    "✨ Contigo todo es mejor",
    "🥹 Mi felicidad tiene tu nombre"

];

setInterval(function () {

    document.title = frases[Math.floor(Math.random() * frases.length)];

}, 5000);

const intro = document.getElementById("intro");
const botonEntrar = document.getElementById("entrar");

botonEntrar.addEventListener("click", function(){

    const audio=document.getElementById("audio");

    if(audio){

        audio.play().catch(()=>{});

    }

    intro.style.opacity="0";

    setTimeout(function(){

        intro.style.display="none";

    },1000);

});
const fotos = [

"img/azul.jpeg",

"img/verde.jpeg",

"img/juntos.jpeg"

];

let actual = 0;

const imagen = document.getElementById("foto");

const anterior = document.querySelector(".anterior");

const siguiente = document.querySelector(".siguiente");

const puntos = document.querySelectorAll(".indicadores span");

function actualizarSlider(){

imagen.style.opacity=0;

setTimeout(()=>{

imagen.src=fotos[actual];

imagen.style.opacity=1;

},300);

puntos.forEach(p=>p.classList.remove("activo"));

puntos[actual].classList.add("activo");

}

siguiente.addEventListener("click",()=>{

actual++;

if(actual>=fotos.length){

actual=0;

}

actualizarSlider();

});

anterior.addEventListener("click",()=>{

actual--;

if(actual<0){

actual=fotos.length-1;

}

actualizarSlider();

});

setInterval(()=>{

actual++;

if(actual>=fotos.length){

actual=0;

}

actualizarSlider();

},5000);
const listaRazones=[

"Porque contigo soy feliz.",

"Porque tu sonrisa alegra mis días.",

"Porque siempre me apoyas.",

"Porque haces que todo sea mejor.",

"Porque contigo me siento en casa.",

"Porque amo escucharte.",

"Porque eres mi tranquilidad.",

"Porque me haces reír.",

"Porque nunca me canso de ti.",

"Porque volvería a elegirte una y mil veces."

];

const razon=document.getElementById("razon");

const botonRazon=document.getElementById("otraRazon");

botonRazon.addEventListener("click",()=>{

const numero=Math.floor(Math.random()*listaRazones.length);

razon.style.opacity=0;

setTimeout(()=>{

razon.textContent=listaRazones[numero];

razon.style.opacity=1;

},300);

});
const caja=document.getElementById("caja");

const mensajeOculto=document.getElementById("mensajeOculto");

caja.addEventListener("click",()=>{

caja.innerHTML="💖";

caja.style.transform="scale(1.3)";

mensajeOculto.style.display="block";

});
function actualizarAniversario(){

const ahora=new Date();

const proximo = new Date(
    ahora.getFullYear(),
    1,
    5,
    0,
    0,
    0
);

proximo.setMonth(1); // febrero
proximo.setDate(5);
proximo.setHours(0,0,0,0);

if(ahora>proximo){

proximo.setFullYear(proximo.getFullYear()+1);

}

const diferencia=proximo-ahora;

const dias=Math.floor(diferencia/(1000*60*60*24));

const horas=Math.floor((diferencia%(1000*60*60*24))/(1000*60*60));

const minutos=Math.floor((diferencia%(1000*60*60))/(1000*60));

const segundos=Math.floor((diferencia%(1000*60))/1000);

document.getElementById("diasAniversario").textContent=dias;
document.getElementById("horasAniversario").textContent=horas;
document.getElementById("minutosAniversario").textContent=minutos;
document.getElementById("segundosAniversario").textContent=segundos;

}

actualizarAniversario();

setInterval(actualizarAniversario,1000);
const botonFinal=document.getElementById("amorInfinito");

const pantallaFinal=document.getElementById("pantallaFinal");

botonFinal.addEventListener("click",()=>{

for(let i=0;i<500;i++){

setTimeout(()=>{

const corazon=document.createElement("div");

corazon.className="petalo";

corazon.innerHTML=Math.random()>0.5?"❤️":"🌹";

corazon.style.left=Math.random()*100+"vw";

corazon.style.fontSize=(20+Math.random()*30)+"px";

corazon.style.animationDuration=(3+Math.random()*4)+"s";

document.body.appendChild(corazon);

setTimeout(()=>{

corazon.remove();

},7000);

},i*8);

}

pantallaFinal.classList.add("mostrar");

});