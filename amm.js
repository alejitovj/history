// ==============================
// INICIALIZACIÓN SEGURA
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // TRANSICIÓN DIRECTA (FADE EFFECT)
    // ==============================
    const btnIntro = document.getElementById("btnIntro");
    const intro = document.getElementById("intro");
    const contenido = document.querySelector(".contenido");

    if (btnIntro) {
        btnIntro.addEventListener("click", function () {
            if (intro && contenido) {
                // 1. Desvanecemos la pantalla de la luna (Fade-out)
                intro.style.transition = "opacity 1s ease";
                intro.style.opacity = "0";

                // 2. Esperamos 1 segundo a que termine la animación
                setTimeout(() => {
                    intro.style.display = "none"; // Ocultamos por completo la intro

                    // 3. Activamos el contenedor principal
                    contenido.style.display = "block";
                    contenido.style.opacity = "0";
                    contenido.style.transition = "opacity 1s ease";

                    // Pequeño delay imperceptible para que el navegador aplique el Fade-in
                    setTimeout(() => {
                        contenido.style.opacity = "1";
                    }, 50);

                    // Intentar reproducir música automáticamente al entrar
                    const audio = document.getElementById("audio");
                    if (audio) {
                        audio.play().catch(() => console.log("La reproducción automática requirió interacción"));
                        const btnMusica = document.getElementById("btnMusica");
                        if (btnMusica) btnMusica.textContent = "⏸️ Pausar Música";
                    }

                }, 1000);
            }
        });
    }

    // ==============================
    // CONTADOR ❤️
    // ==============================
    const fechaInicio = new Date(2026, 1, 5, 0, 0, 0); // 5 de Febrero de 2026

    function actualizarContador() {
        const ahora = new Date();
        let diferencia = ahora - fechaInicio;

        if (diferencia < 0) diferencia = 0;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        const d = document.getElementById("dias");
        const h = document.getElementById("horas");
        const m = document.getElementById("minutos");
        const s = document.getElementById("segundos");

        if (d) d.textContent = dias;
        if (h) h.textContent = horas;
        if (m) m.textContent = minutos;
        if (s) s.textContent = segundos;
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);

    // ==============================
    // CARTA ✉️
    // ==============================
    const mensaje = `Dicen que las personas son pasajeras.

Pero desde que tú llegaste mi vida cambió por completo.

Cada día contigo es una aventura y un recuerdo hermoso.

Gracias por existir.

Desde el 5 de febrero de 2026 mi corazón encontró su lugar favorito.

Te amo infinitamente 🖤`;

    const texto = document.getElementById("texto");
    let indice = 0;

    function escribir() {
        if (!texto) return;

        if (indice < mensaje.length) {
            texto.innerHTML += mensaje.charAt(indice);
            indice++;
            setTimeout(escribir, 35);
        }
    }

    escribir();

    // ==============================
    // PETALOS 🌹 + CORAZONES ❤️
    // ==============================
    function crearElemento(emoji, duracionMin, duracionMax, sizeMin, sizeMax) {
        const el = document.createElement("div");
        el.className = "petalo";
        el.innerHTML = emoji;

        el.style.left = Math.random() * 100 + "vw";
        el.style.fontSize = (sizeMin + Math.random() * sizeMax) + "px";
        el.style.animationDuration = (duracionMin + Math.random() * duracionMax) + "s";

        document.body.appendChild(el);
        setTimeout(() => el.remove(), 9000);
    }

    setInterval(() => crearElemento("🌹", 5, 5, 20, 20), 500);
    setInterval(() => crearElemento("❤️", 4, 4, 15, 25), 300);

    // ==============================
    // CURSOR ✨
    // ==============================
    document.addEventListener("mousemove", function (e) {
        const brillo = document.createElement("div");
        brillo.innerHTML = "✨";
        brillo.style.position = "fixed";
        brillo.style.left = e.clientX + "px";
        brillo.style.top = e.clientY + "px";
        brillo.style.pointerEvents = "none";
        brillo.style.fontSize = "10px";
        brillo.style.zIndex = "9999";

        document.body.appendChild(brillo);
        setTimeout(() => brillo.remove(), 700);
    });

    // ==============================
    // LLUVIA DE AMOR 💖
    // ==============================
    const btnLluvia = document.getElementById("btnLluvia");

    if (btnLluvia) {
        btnLluvia.addEventListener("click", function () {
            for (let i = 0; i < 120; i++) {
                setTimeout(() => {
                    const c = document.createElement("div");
                    c.className = "petalo";
                    c.innerHTML = "💖";

                    c.style.left = Math.random() * 100 + "vw";
                    c.style.fontSize = (15 + Math.random() * 25) + "px";
                    c.style.animationDuration = (3 + Math.random() * 3) + "s";

                    document.body.appendChild(c);
                    setTimeout(() => c.remove(), 7000);
                }, i * 15);
            }
        });
    }

    // ==============================
    // MÚSICA 🎵
    // ==============================
    const audio = document.getElementById("audio");
    const btnMusica = document.getElementById("btnMusica");

    function intentarReproducir() {
        if (audio) {
            audio.play().catch(() => {});
        }
    }

    document.addEventListener("click", intentarReproducir, { once: true });

    if (btnMusica && audio) {
        btnMusica.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
                btnMusica.textContent = "⏸️ Pausar Música";
            } else {
                audio.pause();
                btnMusica.textContent = "🎵 Música";
            }
        });
    }

    // ==============================
    // FRASES TITLE
    // ==============================
    const frases = [
        "❤️ Eres mi lugar favorito",
        "🌹 Gracias por existir",
        "💖 Siempre te elegiría",
        "✨ Contigo todo es mejor",
        "🥹 Mi felicidad tiene tu nombre"
    ];

    setInterval(() => {
        document.title = frases[Math.floor(Math.random() * frases.length)];
    }, 5000);

    // ==============================
    // SLIDER 📸
    // ==============================
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

    function actualizarSlider() {
        if (!imagen) return;

        imagen.style.opacity = 0;

        setTimeout(() => {
            imagen.src = fotos[actual];
            imagen.style.opacity = 1;
        }, 250);

        puntos.forEach(p => p.classList.remove("activo"));

        if (puntos[actual]) {
            puntos[actual].classList.add("activo");
        }
    }

    if (siguiente) {
        siguiente.addEventListener("click", () => {
            actual = (actual + 1) % fotos.length;
            actualizarSlider();
        });
    }

    if (anterior) {
        anterior.addEventListener("click", () => {
            actual = (actual - 1 + fotos.length) % fotos.length;
            actualizarSlider();
        });
    }

    setInterval(() => {
        actual = (actual + 1) % fotos.length;
        actualizarSlider();
    }, 5000);

    // ==============================
    // RAZONES ❤️
    // ==============================
    const listaRazones = [
        "Porque contigo soy feliz.",
        "Porque tu sonrisa alegra mis días.",
        "Porque siempre me apoyas.",
        "Porque haces que todo sea mejor.",
        "Porque contigo me siento en casa.",
        "Porque eres mi tranquilidad."
    ];

    const razon = document.getElementById("razon");
    const btnRazon = document.getElementById("btnRazon");

    if (btnRazon && razon) {
        btnRazon.addEventListener("click", () => {
            const r = listaRazones[Math.floor(Math.random() * listaRazones.length)];
            razon.style.opacity = 0;

            setTimeout(() => {
                razon.textContent = r;
                razon.style.opacity = 1;
            }, 300);
        });
    }

    // ==============================
    // REGALO 🎁
    // ==============================
    const caja = document.getElementById("caja");
    const mensajeOculto = document.getElementById("mensajeOculto");

    if (caja && mensajeOculto) {
        caja.addEventListener("click", () => {
            caja.innerHTML = "💖";
            mensajeOculto.style.display = "block";
        });
    }
});