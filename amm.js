document.addEventListener("DOMContentLoaded", () => {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];
    const byId = (id) => document.getElementById(id);
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const random = (min, max) => min + Math.random() * (max - min);

    const audio = byId("audio");
    const audioPlaylist = byId("audioPlaylist");
    const btnMusica = byId("btnMusica");
    const textoMusica = { play: "🎵 Música", pause: "⏸️ Pausar Música" };
    const fades = new Map();

    function setMusicText(isPlaying) {
        if (btnMusica) btnMusica.textContent = isPlaying ? textoMusica.pause : textoMusica.play;
    }

    function clearFade(audioElement) {
        const fade = fades.get(audioElement);
        if (!fade) return;
        clearInterval(fade.timer);
        fade.resolve(false);
        fades.delete(audioElement);
    }

    function fadeTo(audioElement, target, step = 0.05, delay = 35) {
        if (!audioElement) return Promise.resolve(false);
        clearFade(audioElement);

        const objetivo = clamp(target, 0, 1);
        if (Math.abs(audioElement.volume - objetivo) < 0.01) {
            audioElement.volume = objetivo;
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            const direccion = objetivo > audioElement.volume ? 1 : -1;
            const timer = setInterval(() => {
                const next = audioElement.volume + step * direccion;
                const done = direccion > 0 ? next >= objetivo : next <= objetivo;

                if (done) {
                    audioElement.volume = objetivo;
                    clearInterval(timer);
                    fades.delete(audioElement);
                    resolve(true);
                    return;
                }

                audioElement.volume = clamp(next, 0, 1);
            }, delay);

            fades.set(audioElement, { timer, resolve });
        });
    }

    async function fadeIn(audioElement, volume = 1) {
        if (!audioElement) return false;
        clearFade(audioElement);
        audioElement.volume = 0;

        try {
            await audioElement.play();
            return await fadeTo(audioElement, volume);
        } catch (error) {
            console.log("El navegador bloqueó el audio:", error);
            return false;
        }
    }

    async function fadeOut(audioElement) {
        if (!audioElement) return false;
        if (audioElement.paused) {
            audioElement.volume = 0;
            return true;
        }

        const completed = await fadeTo(audioElement, 0);
        if (completed && audioElement.volume === 0) audioElement.pause();
        return completed;
    }

    async function reproducirFondo(volume = 1) {
        if (!audio) return;
        const ok = await fadeIn(audio, volume);
        if (ok) setMusicText(true);
    }

    function crearParticula(emoji, opciones = {}) {
        const {
            clase = "petalo",
            duracionMin = 3,
            duracionMax = 6,
            sizeMin = 15,
            sizeMax = 35,
            top = "-100px",
            left = `${Math.random() * 100}vw`
        } = opciones;

        const el = document.createElement("div");
        el.className = clase;
        el.textContent = emoji;
        el.style.top = top;
        el.style.left = left;
        el.style.fontSize = `${random(sizeMin, sizeMax)}px`;
        el.style.animationDuration = `${random(duracionMin, duracionMax)}s`;

        document.body.appendChild(el);
        setTimeout(() => el.remove(), (duracionMax + 1) * 1000);
        return el;
    }

    function lluvia(emoji, cantidad, opciones = {}) {
        for (let i = 0; i < cantidad; i++) {
            setTimeout(() => crearParticula(emoji, opciones), i * (opciones.delay || 20));
        }
    }

    function iniciarIntro() {
        const btnIntro = byId("btnIntro");
        const intro = byId("intro");
        const contenido = $(".contenido");

        if (audio) audio.volume = 0;
        if (!btnIntro || !intro || !contenido) return;

        btnIntro.addEventListener("click", (event) => {
            event.stopPropagation();
            if (audio) audio.volume = 0;

            intro.style.opacity = "0";
            setTimeout(() => {
                intro.style.display = "none";
                contenido.style.display = "block";
                contenido.style.opacity = "0";

                requestAnimationFrame(() => {
                    contenido.style.opacity = "1";
                    reproducirFondo(1);
                });
            }, 1000);
        });
    }

    function iniciarContador() {
        const inicio = new Date(2026, 1, 5);
        const ids = ["dias", "horas", "minutos", "segundos"];

        function actualizar() {
            const diff = Math.max(Date.now() - inicio.getTime(), 0);
            const valores = [
                Math.floor(diff / 86400000),
                Math.floor((diff % 86400000) / 3600000),
                Math.floor((diff % 3600000) / 60000),
                Math.floor((diff % 60000) / 1000)
            ];

            ids.forEach((id, index) => {
                const el = byId(id);
                if (el) el.textContent = valores[index];
            });
        }

        actualizar();
        setInterval(actualizar, 1000);
    }

    function escribirCarta() {
        const texto = byId("texto");
        if (!texto) return;

        const mensaje = `Dicen que las personas son pasajeras.

Pero desde que tú llegaste mi vida cambió por completo.

Cada día contigo es una aventura y un recuerdo hermoso.

Gracias por existir.

Desde el 5 de febrero de 2026 mi corazón encontró su lugar favorito.

Te amo infinitamente 🖤`;

        let index = 0;
        function escribir() {
            if (index >= mensaje.length) return;
            texto.textContent += mensaje[index];
            index++;
            setTimeout(escribir, 35);
        }

        escribir();
    }

    function iniciarAmbiente() {
        setInterval(() => crearParticula("🌹", { duracionMin: 5, duracionMax: 10, sizeMin: 20, sizeMax: 40 }), 500);
        setInterval(() => crearParticula("❤️", { duracionMin: 4, duracionMax: 8, sizeMin: 15, sizeMax: 40 }), 300);

        document.addEventListener("mousemove", (event) => {
            if (Math.random() > 0.25) return;
            const brillo = crearParticula("✨", {
                clase: "brillo-cursor",
                duracionMin: 0.6,
                duracionMax: 0.8,
                sizeMin: 8,
                sizeMax: 13,
                top: `${event.clientY}px`,
                left: `${event.clientX}px`
            });
            brillo.style.animationDuration = "0.7s";
        });

        byId("btnLluvia")?.addEventListener("click", () => {
            lluvia("💖", 120, { duracionMin: 3, duracionMax: 6, sizeMin: 15, sizeMax: 40, delay: 15 });
        });
    }

    function iniciarMusica() {
        if (!btnMusica || !audio) return;

        btnMusica.addEventListener("click", async () => {
            if (audio.paused) {
                if (audioPlaylist && !audioPlaylist.paused) await detenerPlaylist();
                await reproducirFondo(1);
                return;
            }

            await fadeOut(audio);
            setMusicText(false);
        });
    }

    function iniciarTitulos() {
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
    }

    function iniciarSlider() {
        const fotos = ["img/azul.jpeg", "img/verde.jpeg", "img/juntos.jpeg"];
        const imagen = byId("foto");
        const puntos = $$(".indicadores span");
        let actual = 0;

        function mostrarFoto(index) {
            if (!imagen) return;
            actual = (index + fotos.length) % fotos.length;
            imagen.style.opacity = "0";

            setTimeout(() => {
                imagen.src = fotos[actual];
                imagen.style.opacity = "1";
            }, 250);

            puntos.forEach((punto, i) => punto.classList.toggle("activo", i === actual));
        }

        $(".siguiente")?.addEventListener("click", () => mostrarFoto(actual + 1));
        $(".anterior")?.addEventListener("click", () => mostrarFoto(actual - 1));
        puntos.forEach((punto, i) => punto.addEventListener("click", () => mostrarFoto(i)));
        setInterval(() => mostrarFoto(actual + 1), 5000);
    }

    function iniciarRazones() {
        const razones = `
Porque contigo soy feliz y todo es mejor. 🥰
Porque tu sonrisa alegra mis días por completo. 🌹
Porque siempre me apoyas en todo lo que hago. 🖤
Porque haces que cada momento sea especial. ✨
Porque contigo me siento en casa sin importar el lugar. 🏠
Porque eres mi tranquilidad y mi motivación diaria. ✨
Porque me encanta cómo eres conmigo y lo que me haces sentir. 🥺
Porque amo esa forma tan tuya de buscar mi mano cuando caminamos sin rumbo. 👫
Porque el universo entero conspiró para que coincidiéramos en el mismo salón de 11. 🌌
Porque si la realidad es una simulación, tú eres el único código que hace que todo tenga sentido. 💻
Porque eres esa canción que no puedo sacarme de la cabeza, pero que nunca me canso de escuchar. 🎵
Porque mi cámara ha capturado paisajes hermosos, pero ninguna foto supera la belleza de tu sonrisa. 📸
Porque tu respiración cerca de mi cuello es la melodía que me calma los días difíciles. 🤍
Porque me encanta que tengamos un lenguaje que solo se entiende con la mirada. 👀
Porque esos secretos que nos susurramos al oído se quedan solo entre los dos. 🤫
Porque en la mecánica de mi corazón, tú eres la pieza que hace que todo ruede a la perfección. ⚙️
Porque eres mi rincón de paz en un universo lleno de caos. 🪐
Porque podríamos estar en silencio horas y aun así sentir que lo dijimos todo. 🫂
Porque eres la única persona por la que dejaría todo en pausa solo para ir a verte. ⏳
Porque la calidez de tus abrazos cuando el frío de la ciudad nos atrapa lo cambia todo. 🧥
Porque eres esa estrella que brilla con luz propia en medio de mis noches más oscuras. ⭐
Porque me sé de memoria la forma de tus manos y cómo encajan perfectamente con las mías. 🤝
Porque con solo un mensaje tuyo, mi día cambia por completo a un modo feliz. 📱
Porque amo la complicidad de nuestras miradas cuando estamos rodeados de gente y nadie sabe qué pensamos. 👥
Porque podrían colapsar mil mundos, y yo te seguiría eligiendo en el que quede en pie. 🌍
Porque amo perder la noción del tiempo cuando nos quedamos hablando hasta tarde. 🌙
Porque eres el mejor proyecto que la vida me ha permitido empezar y que quiero cuidar siempre. 🚀
Porque tus labios son mi debilidad y mi lugar favorito en el mundo entero. 💋
Porque siento que en todas mis vidas pasadas te busqué, y en esta por fin te encontré. 🔄
Porque me encanta cómo haces que hasta el día más aburrido se vuelva una aventura. 🗺️
Porque eres mi presente favorito y el único futuro que me interesa construir. 🛠️
Porque esos besos tuyos me desconectan del mundo por unos segundos. 🌪️
Porque el espacio exterior es infinito, pero mis ganas de estar contigo lo superan por completo. 🛸
Porque tu sonrisa tiene el superpoder de borrar cualquier mal día en un segundo. ⚡
Porque te amo más de lo que amo mis mejores pasatiempos, y eso ya es decir demasiado. 🚲
Porque eres la prueba viviente de que la magia existe fuera de las pantallas. 🔮
Porque saber que me quieres me hace sentir el chico más afortunado del planeta. 🥇
Porque tu voz es mi canción favorita, la pondría en bucle para toda la vida. 🔁
Porque encajamos a la perfección cuando nos abrazamos fuerte. 🧩
Porque nuestro amor no es de este planeta; pertenece a una galaxia que apenas estamos descubriendo. ☄️
Porque amo cuando me miras de reojo y me regalas esa sonrisa cómplice. 😏
Porque eres la que me frena cuando voy muy rápido y la que me impulsa cuando me detengo. 🛑
Porque la paz infinita que me da dormir sabiendo que me quieres no se compara con nada. 💤
Porque eres mi constante en un universo donde todo lo demás cambia. 📈
Porque me encanta que seas mi lugar seguro, ese donde no tengo que fingir nada. 🔒
Porque estar contigo me hace sentir que ya gané el juego más difícil de todos. 🎮
Porque esos besos en la frente que me das me hacen sentir protegido. 🥺
Porque eres mi gravedad; no importa a dónde vaya, siempre me atraes de vuelta a ti. 🧲
Porque tu amor es como ese refugio cálido en medio de una tormenta de nieve. ❄️
Porque eres mi motivación para levantarme a programar un futuro juntos. 👨‍💻
Porque tu olor se queda impregnado en mi ropa y me acompaña todo el día. 👔
Porque si el destino existe, definitivamente se inspiró en ti para escribir mi futuro. 📜
Porque me fascina cómo logras descifrar lo que me pasa con solo mirarme un segundo. 🔍
Porque en mi mente siempre estás tú, ganándole el puesto a cualquier otro pensamiento. 🧠
Porque me encanta la manera en que me buscas cuando necesitas un refugio del mundo exterior. ⛈️
Porque contigo el tiempo no corre, se detiene para dejarnos flotar. 🎈
Porque eres la casualidad más hermosa que el destino cruzó en mi camino. 🍀
Porque esas caricias tuyas logran quitarme cualquier rastro de estrés. 💆‍♂️
Porque lo que siento por ti no cabe dentro de las leyes de la física. 📐
Porque amo la forma en que tus ojos brillan cuando me cuentas algo que te emociona. 💖
Porque si tuviera que armar una ruta perfecta para mi vida, tú serías el destino final. 📍
Porque el roce de tus dedos con los míos me eriza la piel al instante. ⚡
Porque eres el misterio más hermoso del cosmos y mi respuesta favorita a todo. 🌌
Porque eres la razón por la que ahora creo que las cosas buenas de verdad existen. 🥺
Porque amo cuando me escuchas hablar de las cosas que me apasionan con tanta atención. 🫶
Porque el calor de tu piel contra la mía se siente como estar en casa. 🔥
Porque amar al resto del mundo es terrenal; amarte a ti es tocar el cielo con las manos. ☁️
Porque eres mi pensamiento favorito antes de dormir y el primero al despertar. ☀️
Porque tu amor me hace querer ser la mejor versión de mí mismo todos los días. 💎
Porque nadie me conoce en mi versión más real e íntima como me conoces tú. 🎭
Porque mi mundo era en blanco y negro hasta que tu luz lo pintó de todos los colores. 🎨
Porque me encanta que tengamos chistes internos que nadie más en el mundo entiende. 😹
Porque me encanta cómo me apoyas en mis locuras, mis metas y mis proyectos. 🎯
Porque haces que los momentos más simples se vuelvan los más íntimos y especiales. 🕯️
Porque hay millones de personas en la Tierra, pero mi alma solo te reconoce a ti. 🌍
Porque cada vez que nos despedimos, mi mente ya empieza la cuenta regresiva para verte otra vez. ⏳
Porque eres mi refugio cuando la rutina del colegio y las tareas se ponen pesadas. 📚
Porque amo la forma en que me miras cuando crees que no me doy cuenta. 🕵️‍♂️
Porque estar contigo es como ver una aurora boreal por primera vez: mágico e inolvidable. 🌌
Porque el mundo puede estar cayéndose a pedazos, pero contigo me siento invencible. 🛡️
Porque eres esa persona con la que quiero compartir cada logro y cada victoria. 🏆
Porque amo cuando nos reímos de tonterías que solo nosotros dos entendemos. 🤪
Porque ni el algoritmo más perfecto habría logrado diseñar a alguien tan ideal para mí. ⚙️
Porque eres ese cable a tierra que me recuerda lo que de verdad importa. ⚓
Porque compartir el mismo salón hace que hasta las clases más aburridas sean perfectas. 🏫
Por los "te amo" espontáneos que nos salvan el día. ❤️
Porque esas caminatas largas hablando de todo y de nada a la vez lo son todo. 🛣️
Porque nos entendemos con una sola seña cuando estamos con los amigos. 🤙
Porque terminar este año escolar a tu lado es el mejor cierre de etapa posible. 🎓
Porque amo la forma en que cuidas de mí cuando me notas cansado o preocupado. 🩹
Porque los días de lluvia se vuelven perfectos si los paso abrazado a ti. 🌧️
Porque contigo aprendí lo que realmente significa querer bonito. 💞
Porque me encanta planear citas contigo, desde ir por un helado hasta perder el tiempo juntos. 🍦
Porque con cada canción que escucho, inevitablemente termino pensando en ti. 🎧
Porque eres la dueña de mis mejores risas y de mis pensamientos más profundos. 💭
Porque amo la forma en que defiendes lo nuestro ante cualquier tormenta. 🌪️
Porque no hay un solo día en que me arrepienta de haberte dicho lo que sentía. 🗣️
Porque eres mi novia, mi mejor amiga y mi confidente, todo en una sola persona. 🥇
Porque amo la historia que ya escribimos y todas las hojas en blanco que nos faltan por llenar. 📖
Porque, en resumen, no me imagino este mundo ni ningún otro si no es de tu mano, Dannita. ❤️
        `.trim().split("\n");

        const razon = byId("razon");
        const btnRazon = byId("btnRazon");
        if (!razon || !btnRazon) return;

        btnRazon.addEventListener("click", () => {
            const nuevaRazon = razones[Math.floor(Math.random() * razones.length)];
            razon.style.opacity = "0";
            razon.style.transform = "scale(0.95)";

            setTimeout(() => {
                razon.textContent = nuevaRazon;
                razon.style.opacity = "1";
                razon.style.transform = "scale(1)";
            }, 200);
        });
    }

    function iniciarRegalo() {
        const caja = byId("caja");
        const mensajeOculto = byId("mensajeOculto");

        caja?.addEventListener("click", () => {
            caja.textContent = "🖤";
            if (mensajeOculto) mensajeOculto.style.display = "block";
        });
    }

    function iniciarPantallaFinal() {
        const btnFinal = byId("btnFinal");
        const pantallaFinal = byId("pantallaFinal");
        const btnVolver = byId("btnVolver");

        btnFinal?.addEventListener("click", () => {
            btnFinal.textContent = "✨ Espera... ✨";
            setTimeout(() => {
                pantallaFinal?.classList.add("mostrar");
                lluvia(Math.random() > 0.5 ? "💖" : "❤️", 150, {
                    duracionMin: 2,
                    duracionMax: 5,
                    sizeMin: 20,
                    sizeMax: 50,
                    delay: 20
                });
            }, 600);
        });

        btnVolver?.addEventListener("click", () => {
            pantallaFinal?.classList.remove("mostrar");
            if (btnFinal) btnFinal.textContent = "💖 ¿Sabes cuánto te amo? 💖";
        });
    }

    function iniciarJuego() {
        const btnNo = byId("btnNoJuego");
        const btnSi = byId("btnSiJuego");
        const mensajeVictoria = byId("mensajeVictoria");
        const preguntaJuego = byId("preguntaJuego");

        function moverBotonNo() {
            if (!btnNo) return;
            const margen = 12;
            const rect = btnNo.getBoundingClientRect();
            const maxX = Math.max(margen, window.innerWidth - rect.width - margen);
            const maxY = Math.max(margen, window.innerHeight - rect.height - margen);

            btnNo.style.position = "fixed";
            btnNo.style.left = `${random(margen, maxX)}px`;
            btnNo.style.top = `${random(margen, maxY)}px`;
        }

        btnNo?.addEventListener("pointerenter", moverBotonNo);
        btnNo?.addEventListener("touchstart", (event) => {
            event.preventDefault();
            moverBotonNo();
        });

        btnSi?.addEventListener("click", () => {
            if (mensajeVictoria) mensajeVictoria.style.display = "block";
            if (preguntaJuego) preguntaJuego.textContent = "¡Sabía que dirías que sí! 😍💖";
            if (btnNo) btnNo.style.display = "none";
            btnSi.disabled = true;
            lluvia("🥰", 40, { duracionMin: 3, duracionMax: 5, sizeMin: 20, sizeMax: 40, delay: 20 });
        });
    }

    function iniciarModoLuna() {
        const btnModoLuna = byId("btnModoLuna");
        btnModoLuna?.addEventListener("click", () => {
            const activo = document.body.classList.toggle("modo-neon");
            btnModoLuna.textContent = activo ? "☀️" : "🌙";
        });
    }

    const canciones = [
        {
            titulo: "🎵 Intro de Betty la fea",
            archivo: "betty.mpeg",
            volumen: 0.5,
            dedicatoria: `Elegí este fragmento porque ahora no puedo escucharlo igual: siempre pienso en ti, en esa niña hermosa que ama esta historia y que convirtió una canción en un recuerdo tuyo.`
        },
        {
            titulo: "🌹 Contigo - Los Panchos",
            archivo: "Contigo.mpeg",
            volumen: 1,
            dedicatoria: `Esta canción me recuerda lo claro que tengo mi amor por ti. Te imagino como mi compañera de vida, mi novia y ese futuro bonito que quiero cuidar contigo.`
        },
        {
            titulo: "💥 Química Mayor - Mon Laferte",
            archivo: "quimica.mpeg",
            volumen: 0.2,
            dedicatoria: `Lo nuestro se siente como una química enorme, de esas que existen antes de explicarlas. Contigo todo encaja y todo vibra con nombre propio: Danna Zharick Cubillos Malagón.`
        },
        {
            titulo: "✨ Te amo, Te extraño - Guayacán Orquesta",
            archivo: "teamo.mpeg",
            volumen: 0.5,
            dedicatoria: `Esta canción me recuerda que pedí una mujer grandiosa y linda como tú. Ahora que estás conmigo, solo quiero cuidarte y que nunca te vayas de mi vida.`
        }
    ];

    let indiceCancionActual = -1;
    let tokenPlaylist = 0;

    async function detenerPlaylist() {
        tokenPlaylist++;
        await fadeOut(audioPlaylist);
        $$(".tarjeta-cancion").forEach((tarjeta) => tarjeta.classList.remove("sonando"));
        indiceCancionActual = -1;
    }

    async function cambiarCancion(indice, tarjeta) {
        const cancion = canciones[indice];
        const tituloVisor = byId("tituloDedicatoria");
        const letraVisor = byId("letraDedicatoria");
        const visor = byId("visorDedicatoria");
        if (!cancion || !audioPlaylist || !tituloVisor || !letraVisor || !visor) return;

        if (indiceCancionActual === indice) {
            await detenerPlaylist();
            return;
        }

        const token = ++tokenPlaylist;
        if (audio && !audio.paused) {
            fadeOut(audio).then(() => setMusicText(false));
        }

        await fadeOut(audioPlaylist);
        if (token !== tokenPlaylist) return;

        $$(".tarjeta-cancion").forEach((item) => item.classList.remove("sonando"));
        tarjeta?.classList.add("sonando");
        indiceCancionActual = indice;

        visor.style.opacity = "0.3";
        visor.style.transform = "scale(0.98)";

        setTimeout(() => {
            if (token !== tokenPlaylist) return;
            tituloVisor.textContent = cancion.titulo;
            letraVisor.textContent = cancion.dedicatoria;
            audioPlaylist.src = cancion.archivo;
            fadeIn(audioPlaylist, cancion.volumen);
            visor.style.opacity = "1";
            visor.style.transform = "scale(1)";
        }, 300);
    }

    function iniciarPlaylist() {
        $$(".tarjeta-cancion").forEach((tarjeta, index) => {
            const indice = Number(tarjeta.dataset.cancion ?? index);
            tarjeta.addEventListener("click", () => cambiarCancion(indice, tarjeta));
        });

        window.cambiarCancion = cambiarCancion;
    }

    function iniciarPresencia() {
        const alerta = byId("efectoPresencia");
        const tiempoEspera = 20000;
        let temporizador;

        function mostrarMensaje() {
            alerta?.classList.remove("oculto");
            alerta?.classList.add("mostrar");
        }

        function reiniciar() {
            clearTimeout(temporizador);
            temporizador = setTimeout(mostrarMensaje, tiempoEspera);
        }

        function ocultarMensaje() {
            alerta?.classList.remove("mostrar");
            alerta?.classList.add("oculto");
            reiniciar();
        }

        ["mousemove", "mousedown", "touchstart", "scroll", "keydown"].forEach((evento) => {
            window.addEventListener(evento, ocultarMensaje, { passive: true });
        });

        reiniciar();
    }

    iniciarIntro();
    iniciarContador();
    escribirCarta();
    iniciarAmbiente();
    iniciarMusica();
    iniciarTitulos();
    iniciarSlider();
    iniciarRazones();
    iniciarRegalo();
    iniciarPantallaFinal();
    iniciarJuego();
    iniciarModoLuna();
    iniciarPlaylist();
    iniciarPresencia();
});
