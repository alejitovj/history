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
            caja.innerHTML = "🖤";
            mensajeOculto.style.display = "block";
        });
    }
});
// ==============================
    // ACCIÓN DE LA PANTALLA FINAL ❤️
    // ==============================
    const btnFinal = document.getElementById("btnFinal");
    const pantallaFinal = document.getElementById("pantallaFinal");
    const btnVolver = document.getElementById("btnVolver");

    if (btnFinal && pantallaFinal) {
        btnFinal.addEventListener("click", function () {
            
            // 1. Cambiamos el texto del botón momentáneamente para generar expectativa
            btnFinal.textContent = "✨ Espera... ✨";
            
            setTimeout(() => {
                // 2. Mostramos la pantalla final con la clase CSS animada
                pantallaFinal.classList.add("mostrar");

                // 3. Lanzamos una lluvia masiva de corazones super rápida
                for (let i = 0; i < 150; i++) {
                    setTimeout(() => {
                        const corazon = document.createElement("div");
                        corazon.className = "petalo";
                        corazon.innerHTML = Math.random() > 0.5 ? "💖" : "❤️";
                        corazon.style.left = Math.random() * 100 + "vw";
                        corazon.style.fontSize = (20 + Math.random() * 30) + "px";
                        corazon.style.animationDuration = (2 + Math.random() * 3) + "s"; // Más rápidos
                        
                        document.body.appendChild(corazon);
                        setTimeout(() => corazon.remove(), 5000);
                    }, i * 20);
                }
            }, 600);
        });
    }

    // Acción para cerrar la pantalla de créditos y regresar al contador
    if (btnVolver && pantallaFinal) {
        btnVolver.addEventListener("click", function() {
            pantallaFinal.classList.remove("mostrar");
            if (btnFinal) btnFinal.innerHTML = "💖 ¿Sabes cuánto te amo? 💖";
        });
    }
    // ==============================
    // JUEGUITO BOTÓN ESQUIVO 🎮
    // ==============================
    const btnNo = document.getElementById("btnNoJuego");
    const btnSi = document.getElementById("btnSiJuego");
    const mensajeVictoria = document.getElementById("mensajeVictoria");
    const preguntaJuego = document.getElementById("preguntaJuego");

    function moverBotonNo() {
        // Calculamos posiciones aleatorias basadas en el tamaño de la pantalla
        // Le restamos 100 y 50 para que el botón no se salga de los bordes visibles
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 80);
        
        // Convertimos el botón a posición fija para que salte por toda la pantalla del navegador
        btnNo.style.position = "fixed";
        btnNo.style.left = x + "px";
        btnNo.style.top = y + "px";
    }

    if (btnNo) {
        // Se activa cuando pasan el mouse en PC
        btnNo.addEventListener("mouseover", moverBotonNo);
        // Se activa cuando intentan tocarlo en el celular
        btnNo.addEventListener("touchstart", function(e) {
            e.preventDefault(); // Evita que haga el click por error
            moverBotonNo();
        });
    }

    if (btnSi && mensajeVictoria) {
        btnSi.addEventListener("click", function() {
            // Mostramos el mensaje de victoria
            mensajeVictoria.style.display = "block";
            preguntaJuego.textContent = "¡Sabía que dirías que sí! 😍💖";
            
            // Escondemos el botón NO porque ya ganó
            if (btnNo) btnNo.style.display = "none";
            btnSi.style.transform = "scale(1)";
            btnSi.disabled = true; // Desactivar para que no sature

            // Lanzamos una mini lluvia de corazones de victoria instantánea
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    const c = document.createElement("div");
                    c.className = "petalo";
                    c.innerHTML = "🥰";
                    c.style.left = Math.random() * 100 + "vw";
                    c.style.fontSize = (20 + Math.random() * 20) + "px";
                    c.style.animationDuration = (3 + Math.random() * 2) + "s";
                    document.body.appendChild(c);
                    setTimeout(() => c.remove(), 5000);
                }, i * 20);
            }
        });
    }
// ==============================
    // PLAYLIST CON AUDIO ACTIVO 🎵
    // ==============================
    const datosCanciones = [
        {
            titulo: "🎵 Intro de Betty la fea",
            archivo: "betty.mpeg",
            dedicatoria: `🎤 "Se dice que soy fea, que camino a lo malevo, que soy chueca..."

            🌹 Elegi este fragmento sabiendo que no puedo volver a escuchar esto de la misma manera, sé que en mi vida hay una niña hermosa que le encanta esta telenovela y se la ha visto muchas veces y eso me hace seguir pensando en ti.`
        },
        {
            titulo: "🌹 Contigo - Los Panchos",
            archivo: "contigo.mpeg",
            dedicatoria: `🎤 "Te puedo yo jurar ante un altar Mi amor sincero, A todo el mundo le puedes contar Que sí te quiero..."

            🖤 Como dice la letra, te podré jurar frente a un altar el amor tan grande que te tengo, como, compañera de vida, novia y esposa, lo que realmente seremos mas adelante en nuestras vidas, para que tengas un pedacito lo claro que es mi amor por ti.`
        },
        {
            titulo: "💥 Quimica Mayor - Mon Laferte",
            archivo: "quimica.mpeg",
            dedicatoria: `🎤 "Estamos tan enamorados Solos en el mundo, cómo un par de adolescentes Qué se aman locamente..."

            🙈 Lo nuestro no fue por decision fue una quimica tan grande que tuvimos mucho mas antes de conocernos profundamente, la quimica que siento en ti es tan grande que podria estallar de puro amor por ti, teniendo un unico nombre Danna Zharick Cubillos Malagon`
        },
        {
            titulo: "✨ Te amo, Te extraño - Guayacán Orquesta",
            archivo: "teamo.mpeg",
            dedicatoria: `🎤 "Yo deseaba encontrar un día Motivos de llenar mi vida Sin saberlo como adivina Llegaste tú..."

            💖 Yo pedi una mujer grandiosa y linda como tu, deseando que llegase en mi vida sin importar el tiempo ahora que estas a mi lado, quiero decirte que no quiero que te vayas de mi vida, ya que la mayor parte de mi felicidad y de lo que soy es por ti.`
        }
    ];

    window.cambiarCancion = function(indice) {
        const tituloVisor = document.getElementById("tituloDedicatoria");
        const letraVisor = document.getElementById("letraDedicatoria");
        const visor = document.getElementById("visorDedicatoria");
        
        // Reproductores de audio
        const audioFondo = document.getElementById("audio"); // El de toda la página
        const audioPlaylist = document.getElementById("audioPlaylist"); // El de la sección

        if (tituloVisor && letraVisor && visor && audioPlaylist) {
            
            // 1. Pausamos la música general de fondo para que no se mezclen
            if (audioFondo && !audioFondo.paused) {
                audioFondo.pause();
                const btnMusica = document.getElementById("btnMusica");
                if (btnMusica) btnMusica.textContent = "🎵 Música";
            }

            // 2. Efecto visual de transición
            visor.style.opacity = "0.3";
            visor.style.transform = "scale(0.98)";

            setTimeout(() => {
                // 3. Cambiamos textos
                tituloVisor.textContent = datosCanciones[indice].titulo;
                letraVisor.textContent = datosCanciones[indice].dedicatoria;
                
                // 4. Cargamos y reproducimos el pedacito de música
                audioPlaylist.src = datosCanciones[indice].archivo;
                audioPlaylist.play().catch(err => console.log("Error al reproducir audio: ", err));

                visor.style.opacity = "1";
                visor.style.transform = "scale(1)";
            }, 300);
        }
    };