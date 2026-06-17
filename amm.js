// ==============================
// INICIALIZACIÓN SEGURA
// ==============================

document.addEventListener("DOMContentLoaded", function () {

// ==========================================
    // CONTROL DE INTRO: DIRECTO Y SIN ERRORES 💝🎵
    // ==========================================
    const btnIntro = document.getElementById("btnIntro");
    const intro = document.getElementById("intro");
    const contenido = document.querySelector(".contenido");

    if (btnIntro) {
        // Buscamos el elemento de audio directamente de forma segura
        const miAudioIntro = document.getElementById("audio");
        if (miAudioIntro) {
            miAudioIntro.volume = 0; // Lo muteamos al arrancar la página
        }

        // El evento escucha ÚNICAMENTE al botón rosa
        btnIntro.addEventListener("click", function (e) {
            // Detiene cualquier propagación hacia el fondo negro
            e.stopPropagation();

            if (intro && contenido) {
                // Volvemos a asegurar que esté en 0 para el Fade-In
                if (miAudioIntro) {
                    miAudioIntro.volume = 0;
                }

                // 2. Desvanecer la pantalla de la luna (Fade-out)
                intro.style.transition = "opacity 1s ease";
                intro.style.opacity = "0";

                // 3. Esperar 1 segundo a que termine la animación visual
                setTimeout(() => {
                    intro.style.display = "none"; // Se oculta por completo la intro

                    // 4. Mostrar la carta principal con Fade-in
                    contenido.style.display = "block";
                    contenido.style.opacity = "0";
                    contenido.style.transition = "opacity 1s ease";

                    setTimeout(() => {
                        contenido.style.opacity = "1";
                    }, 50);

                    // 5. Reproducir la música con volumen gradual (Fade-in real)
                    if (miAudioIntro) {
                        miAudioIntro.play().then(() => {
                            const btnMusica = document.getElementById("btnMusica");
                            if (btnMusica) btnMusica.textContent = "⏸️ Pausar Música";

                            // Sube el volumen gradualmente cada 150ms hasta llegar a 1
                            let intervaloFade = setInterval(() => {
                                if (miAudioIntro.volume < 0.95) {
                                    miAudioIntro.volume += 0.05; // Sube de a 5%
                                } else {
                                    miAudioIntro.volume = 1; // Máximo estable
                                    clearInterval(intervaloFade); // Apaga el relojito
                                }
                            }, 150);

                        }).catch((error) => {
                            console.log("El navegador bloqueó el audio:", error);
                        });
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
    document.addEventListener("DOMContentLoaded", function () {
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

// ====================================
// RAZONES ❤️ (CORREGIDO Y AJUSTADO)
// ====================================
const listaRazones = [
    "Porque contigo soy feliz y todo es mejor. 🥰",
    "Porque tu sonrisa alegra mis días por completo. 🌹",
    "Porque siempre me apoyas en todo lo que hago. 🖤",
    "Porque haces que cada momento sea especial. ✨",
    "Porque contigo me siento en casa sin importar el lugar. 🏠",
    "Porque eres mi tranquilidad y mi motivación diaria. ✨",
    "Porque me encanta cómo eres conmigo y lo que me haces sentir. 🥺",
    "Porque amo esa forma tan tuya de buscar mi mano cuando caminamos sin rumbo. 👫",
    "Porque el universo entero conspiró para que coincidiéramos en el mismo salón de 11. 🌌",
    "Porque si la realidad es una simulación, tú eres el único código que hace que todo tenga sentido. 💻",
    "Porque eres esa canción que no puedo sacarme de la cabeza, pero que nunca me canso de escuchar. 🎵",
    "Porque mi cámara ha capturado paisajes hermosos, pero ninguna foto supera la belleza de tu sonrisa. 📸",
    "Porque tu respiración cerca de mi cuello es la melodía que me calma los días difíciles. 🤍",
    "Porque me encanta que tengamos un lenguaje que solo se entiende con la mirada. 👀",
    "Porque esos secretos que nos susurramos al oído se quedan solo entre los dos. 🤫",
    "Porque en la mecánica de mi corazón, tú eres la pieza que hace que todo ruede a la perfección. ⚙️",
    "Porque eres mi rincón de paz en un universo lleno de caos. 🪐",
    "Porque podríamos estar en silencio horas y aun así sentir que lo dijimos todo. 🫂",
    "Porque eres la única persona por la que dejaría todo en pausa solo para ir a verte. ⏳",
    "Porque la calidez de tus abrazos cuando el frío de la ciudad nos atrapa lo cambia todo. 🧥",
    "Porque eres esa estrella que brilla con luz propio en medio de mis noches más oscuras. ⭐",
    "Porque me sé de memoria la forma de tus manos y cómo encajan perfectamente con las mías. 🤝",
    "Porque con solo un mensaje tuyo, mi día cambia por completo a un modo feliz. 📱",
    "Porque amo la complicidad de nuestras miradas cuando estamos rodeados de gente y nadie sabe qué pensamos. 👥",
    "Porque podrían colapsar mil mundos, y yo te seguiría eligiendo en el que quede en pie. 🌍",
    "Porque amo perder la noción del tiempo cuando nos quedamos hablando hasta tarde. 🌙",
    "Porque eres el mejor proyecto que la vida me ha permitido empezar y que quiero cuidar siempre. 🚀",
    "Porque tus labios son mi debilidad y mi lugar favorito en el mundo entero. 💋",
    "Porque siento que en todas mis vidas pasadas te busqué, y en esta por fin te encontré. 🔄",
    "Porque me encanta cómo haces que hasta el día más aburrido se vuelva una aventura. 🗺️",
    "Porque eres mi presente favorito y el único futuro que me interesa construir. 🛠️",
    "Porque esos besos tuyos me desconectan del mundo por unos segundos. 🌪️",
    "Porque el espacio exterior es infinito, pero mis ganas de estar contigo lo superan por completo. 🛸",
    "Porque tu sonrisa tiene el superpoder de borrar cualquier mal día en un segundo. ⚡",
    "Porque te amo más de lo que amo mis mejores pasatiempos, y eso ya es decir demasiado. 🚲",
    "Porque eres la prueba viviente de que la magia existe fuera de las pantallas. 🔮",
    "Porque saber que me quieres me hace sentir el chico más afortunado del planeta. 🥇",
    "Porque tu voz es mi canción favorita, la pondría en bucle para toda la vida. 🔁",
    "Porque encajamos a la perfección cuando nos abrazamos fuerte. 🧩",
    "Porque nuestro amor no es de este planeta; pertenece a una galaxia que apenas estamos descubriendo. ☄️",
    "Porque amo cuando me miras de reojo y me regalas esa sonrisa cómplice. 😏",
    "Porque eres la que me frena cuando voy muy rápido y la que me impulsa cuando me detengo. 🛑",
    "Porque la paz infinita que me da dormir sabiendo que me quieres no se compara con nada. 💤",
    "Porque eres mi constante en un universo donde todo lo demás cambia. 📈",
    "Porque me encanta que seas mi lugar seguro, ese donde no tengo que fingir nada. 🔒",
    "Porque estar contigo me hace sentir que ya gané el juego más difícil de todos. 🎮",
    "Porque esos besos en la frente que me das me hacen sentir protegido. 🥺",
    "Porque eres mi gravedad; no importa a dónde vaya, siempre me atraes de vuelta a ti. 🧲",
    "Porque tu amor es como ese refugio cálido en medio de una tormenta de nieve. ❄️",
    "Porque eres mi motivación para levantarme a programar un futuro juntos. 👨‍💻",
    "Porque tu olor se queda impregnado en mi ropa y me acompaña todo el día. 👔",
    "Porque si el destino existe, definitivamente se inspiró en ti para escribir mi futuro. 📜",
    "Porque me fascina cómo logras descifrar lo que me pasa con solo mirarme un segundo. 🔍",
    "Porque en mi mente siempre estás tú, ganándole el puesto a cualquier otro pensamiento. 🧠",
    "Porque me encanta la manera en que me buscas cuando necesitas un refugio del mundo exterior. ⛈️",
    "Porque contigo el tiempo no corre, se detiene para dejarnos flotar. 🎈",
    "Porque eres la casualidad más hermosa que el destino cruzó en mi camino. 🍀",
    "Porque esas caricias tuyas logran quitarme cualquier rastro de estrés. 💆‍♂️",
    "Porque lo que siento por ti no cabe dentro de las leyes de la física. 📐",
    "Porque amo la forma en que tus ojos brillan cuando me cuentas algo que te emociona. 💖",
    "Porque si tuviera que armar una ruta perfecta para mi vida, tú serías el destino final. 📍",
    "Porque el roce de tus dedos con los míos me eriza la piel al instante. ⚡",
    "Porque eres el misterio más hermoso del cosmos y mi respuesta favorita a todo. 🌌",
    "Porque eres la razón por la que ahora creo que las cosas buenas de verdad existen. 🥺",
    "Porque amo cuando me escuchas hablar de las cosas que me apasionan con tanta atención. 🫶",
    "Porque el calor de tu piel contra la mía se siente como estar en casa. 🔥",
    "Porque amar al resto del mundo es terrenal; amarte a ti es tocar el cielo con las manos. ☁️",
    "Porque eres mi pensamiento favorito antes de dormir y el primero al despertar. ☀️",
    "Porque tu amor me hace querer ser la mejor versión de mí mismo todos los días. 💎",
    "Porque nadie me conoce en mi versión más real e íntima como me conoces tú. 🎭",
    "Porque mi mundo era en blanco y negro hasta que tu luz lo pintó de todos los colores. 🎨",
    "Porque me encanta que tengamos chistes internos que nadie más en el mundo entiende. 😹",
    "Porque me encanta cómo me apoyas en mis locuras, mis metas y mis proyectos. 🎯",
    "Porque haces que los momentos más simples se vuelvan los más íntimos y especiales. 🕯️",
    "Porque hay millones de personas en la Tierra, pero mi alma solo te reconoce a ti. 🌍",
    "Porque cada vez que nos despedimos, mi mente ya empieza la cuenta regresiva para verte otra vez. ⏳",
    "Porque eres mi refugio cuando la rutina del colegio y las tareas se ponen pesadas. 📚",
    "Porque amo la forma en que me miras cuando crees que no me doy cuenta. 🕵️‍♂️",
    "Because estar contigo es como ver una aurora boreal por primera vez: mágico e inolvidable. 🌌",
    "Porque el mundo puede estar cayéndose a pedazos, pero contigo me siento invencible. 🛡️",
    "Porque eres esa persona con la que quiero compartir cada logro y cada victoria. 🏆",
    "Porque amo cuando nos reímos de tonterías que solo nosotros dos entendemos. 🤪",
    "Porque ni el algoritmo más perfecto habría logrado diseñar a alguien tan ideal para mí. ⚙️",
    "Porque eres ese cable a tierra que me recuerda lo que de verdad importa. ⚓",
    "Porque me das una seguridad que nadie más en este planeta ha logrado darme. 🔒",
    "Porque detrás de cada idea bonita que tengo, siempre hay un pensamiento dedicado a ti. 💭",
    "Porque compartir el mismo salón hace que hasta las clases más aburridas sean perfectas. 🏫",
    "Por los 'te amo' espontáneos que nos salvan el día. ❤️",
    "Porque esas caminatas largas hablando de todo y de nada a la vez lo son todo. 🛣️",
    "Porque nos entendemos con una sola seña cuando estamos con los amigos. 🤙",
    "Porque terminar este año escolar a tu lado es el mejor cierre de etapa posible. 🎓",
    "Porque esas promesas chiquitas que nos hacemos las cumplimos con el corazón. 🤙",
    "Porque amo la forma en que cuidas de mí cuando me notas cansado o preocupado. 🩹",
    "Porque los días de lluvia se vuelven perfectos si los paso abrazado a ti. 🌧️",
    "Porque contigo aprendí lo que realmente significa querer bonito. 💞",
    "Porque me encanta planear citas contigo, desde ir por un helado hasta perder el tiempo juntos. 🍦",
    "Porque con cada canción que escucho, inevitablemente termino pensando en ti. 🎧",
    "Porque eres la dueña de mis mejores risas y de mis pensamientos más profundos. 💭",
    "Porque amo la forma en que defiendes lo nuestro ante cualquier tormenta. 🌪️",
    "Porque no hay un solo día en que me arrepienta de haberte dicho lo que sentía. 🗣️",
    "Porque haces que los días normales se conviertan en recuerdos extraordinarios. ✨",
    "Porque amo tu paciencia infinita y esa ternura que me desarma por completo. 🧸",
    "Porque eres mi novia, mi mejor amiga y mi confidente, todo en una sola persona. 🥇",
    "Porque amo la historia que ya escribimos y todas las hojas en blanco que nos faltan por llenar. 📖",
    "Porque amo las mañanas en las que sé que te voy a ver y a abrazar. 🌅",
    "Porque, en resumen, no me imagino este mundo —ni ningún otro— si no es de tu mano, Dannita. ❤️"
];

    const razon = document.getElementById("razon");
    const btnRazon = document.getElementById("btnRazon");

    if (btnRazon && razon) {
        btnRazon.addEventListener("click", () => {
            // 1. Elegimos una razón aleatoria de la lista
            const r = listaRazones[Math.floor(Math.random() * listaRazones.length)];
            
            // 2. Transición limpia: desvanecemos el texto viejo rápido
            razon.style.transition = "opacity 0.2s ease, transform 0.2s ease";
            razon.style.opacity = "0";
            razon.style.transform = "scale(0.95)";

            // 3. Cambiamos el texto en el fondo y lo volvemos a mostrar elegante
            setTimeout(() => {
                razon.textContent = r;
                razon.style.opacity = "1";
                razon.style.transform = "scale(1)";
            }, 200); // 200 milisegundos de espera para el cambio
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
// ====================================================
    // MODO NEÓN ROMÁNTICO INTERACTIVO 🌙✨
    // ====================================================
    const btnModoLuna = document.getElementById("btnModoLuna");
    if (btnModoLuna) {
        btnModoLuna.addEventListener("click", function() {
            document.body.classList.toggle("modo-neon");
            if (document.body.classList.contains("modo-neon")) {
                btnModoLuna.innerHTML = "☀️";
            } else {
                btnModoLuna.innerHTML = "🌙";
            }
        });
    }

    // ====================================================
    // PLAYLIST CON EFECTO FADE DE AUDIO 🎵💿
    // ====================================================
    const datosCanciones = [
        {
            titulo: "🎵 Intro de Betty la fea",
            archivo: "betty.mpeg",
            volumen: 0.5,
            dedicatoria: `🎤 "Se dice que soy fea, que camino a lo malevo, que soy chueca..."

            🌹 Elegí este fragmento sabiendo que no puedo volver a escuchar esto de la misma manera, sé que en mi vida hay una niña hermosa que le encanta esta telenovela y se la ha visto muchas veces y eso me hace seguir pensando en ti.`
        },
        {
            titulo: "🌹 Contigo - Los Panchos",
            archivo: "contigo.mpeg",
            volumen: 1.0,
            dedicatoria: `🎤 "Te puedo yo jurar ante un altar Mi amor sincero, A todo el mundo le puedes contar Que sí te quiero..."

            🖤 Como dice la letra, te podré jurar frente a un altar el amor tan grande que te tengo, como compañera de vida, novia y esposa, lo que realmente seremos más adelante en nuestras vidas, para que tengas un pedacito de lo claro que es mi amor por ti.`
        },
        {
            titulo: "💥 Química Mayor - Mon Laferte",
            archivo: "quimica.mpeg",
            volumen: 0.2,
            dedicatoria: `🎤 "Estamos tan enamorados Solos en el mundo, cómo un par de adolescentes Qué se aman locamente..."

            🙈 Lo nuestro no fue por decisión, fue una química tan grande que tuvimos mucho antes de conocernos profundamente. La química que siento en ti es tan grande que podría estallar de puro amor por ti, teniendo un único nombre Danna Zharick Cubillos Malagón.`
        },
        {
            titulo: "✨ Te amo, Te extraño - Guayacán Orquesta",
            archivo: "teamo.mpeg",
            volumen: 0.5,
            dedicatoria: `🎤 "Yo deseaba encontrar un día Motivos de llenar mi vida Sin saberlo como adivina Llegaste tú..."

            💖 Yo pedí una mujer grandiosa y linda como tú, deseando que llegase a mi vida sin importar el tiempo. Ahora que estás a mi lado, quiero decirte que no quiero que te vayas de mi vida, ya que la mayor parte de mi felicidad y de lo que soy es por ti.`
        }
    ];

    // 🔥 VARIABLE DE CONTROL DEFINITIVA
    // Nos dice el índice de la canción que está sonando actualmente. Si no hay ninguna, es -1.
    let indiceCancionActual = -1;

    // FUNCIÓN AUXILIAR: Baja el volumen suavemente (Fade Out) y DETIENE la música
    function fadeOutAudio(audioElement, callback) {
        if (!audioElement || audioElement.paused) {
            if (callback) callback();
            return;
        }
        let vol = audioElement.volume;
        let intervalo = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                audioElement.volume = vol;
            } else {
                clearInterval(intervalo);
                audioElement.pause(); 
                audioElement.volume = 0; 
                if (callback) callback();
            }
        }, 30); 
    }

    // FUNCIÓN AUXILIAR: Sube el volumen suavemente (Fade In)
    function fadeInAudio(audioElement, volumenDestino) {
        audioElement.volume = 0;
        audioElement.play().then(() => {
            let vol = 0;
            let intervalo = setInterval(() => {
                if (vol < volumenDestino - 0.05) {
                    vol += 0.05;
                    audioElement.volume = vol;
                } else {
                    audioElement.volume = volumenDestino;
                    clearInterval(intervalo);
                }
            }, 30);
        }).catch(err => console.log("Error en Fade In: ", err));
    }

    // Función principal adaptada con la nueva lógica del interruptor
    window.cambiarCancion = function(indice, elemento) {
        const tituloVisor = document.getElementById("tituloDedicatoria");
        const letraVisor = document.getElementById("letraDedicatoria");
        const visor = document.getElementById("visorDedicatoria");
        
        const audioFondo = document.getElementById("audio"); 
        const audioPlaylist = document.getElementById("audioPlaylist");

        if (tituloVisor && letraVisor && visor && audioPlaylist) {
            
            // 🛑 SI DA CLICK EN LA TARJETA QUE YA ESTÁ SONANDO ACTIVA: La pausamos por completo
            if (indiceCancionActual === indice) {
                fadeOutAudio(audioPlaylist, () => {
                    elemento.classList.remove('sonando');
                    indiceCancionActual = -1; // Reseteamos el control para que quede libre
                });
                return;
            }
            
            // 1. Apagamos la música general de fondo si venía sonando
            if (audioFondo && !audioFondo.paused) {
                fadeOutAudio(audioFondo, () => {
                    const btnMusica = document.getElementById("btnMusica");
                    if (btnMusica) btnMusica.textContent = "🎵 Música";
                });
            }

            // 2. Si había otra canción de la playlist activa, primero la desvanecemos
            fadeOutAudio(audioPlaylist, () => {
                
                // 3. Quitamos el giro de los vinilos a todas las tarjetas
                document.querySelectorAll('.tarjeta-cancion').forEach(tarjeta => {
                    tarjeta.classList.remove('sonando');
                });

                // 4. Activamos el giro en la tarjeta actual y actualizamos el índice de control
                elemento.classList.add('sonando');
                indiceCancionActual = indice; // Guardamos cuál está sonando ahora

                // 5. Animación del visor de textos
                visor.style.opacity = "0.3";
                visor.style.transform = "scale(0.98)";

                setTimeout(() => {
                    tituloVisor.textContent = datosCanciones[indice].titulo;
                    letraVisor.textContent = datosCanciones[indice].dedicatoria;
                    
                    // 6. Cargamos el audio y le metemos el Fade In pro
                    audioPlaylist.src = datosCanciones[indice].archivo;
                    const volObjetivo = datosCanciones[indice].volumen !== undefined ? datosCanciones[indice].volumen : 1.0;
                    
                    fadeInAudio(audioPlaylist, volObjetivo);

                    visor.style.opacity = "1";
                    visor.style.transform = "scale(1)";
                }, 300);
            });
        }
    };
    // ====================================================
    // EFECTO PRESENCIA: DETECTOR DE INACTIVIDAD 💥
    // ====================================================
    let temporizadorInactividad;
    const alertaPresencia = document.getElementById("efectoPresencia");
    
    // TIEMPO DE ESPERA: 20000 milisegundos = 20 segundos
    const tiempoEspera = 20000; 

    function mostrarMensaje() {
        if (alertaPresencia) {
            alertaPresencia.classList.remove("oculto");
            alertaPresencia.classList.add("mostrar");
        }
    }

    function ocultarMensaje() {
        if (alertaPresencia) {
            alertaPresencia.classList.remove("mostrar");
            alertaPresencia.classList.add("oculto");
        }
        // Reseteamos el reloj para empezar a contar de nuevo
        reiniciarTemporizador();
    }

    function reiniciarTemporizador() {
        clearTimeout(temporizadorInactividad);
        // Si pasan 20 segundos sin hacer nada, se ejecuta mostrarMensaje
        temporizadorInactividad = setTimeout(mostrarMensaje, tiempoEspera);
    }

    // LISTA DE EVENTOS: Si Danna mueve el ratón, hace scroll o toca la pantalla en celular
    const eventosInteraccion = ['mousemove', 'mousedown', 'touchstart', 'scroll', 'keydown'];
    
    eventosInteraccion.forEach(evento => {
        window.addEventListener(evento, ocultarMensaje);
    });

    // Arrancamos el contador apenas cargue la página
    reiniciarTemporizador();