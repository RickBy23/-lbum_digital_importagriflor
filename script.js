const fotos = ["DSCN5374","DSCN5379","DSCN5384","DSCN5386","DSCN5397","DSCN5405","DSCN5411","DSCN5412","DSCN5427","DSCN5428","DSCN5429","DSCN5430","DSCN5432","DSCN5435","DSCN5438","DSCN5443","DSCN5447","DSCN5454","DSCN5460","DSCN5465","DSCN5466","DSCN5474","DSCN5475","DSCN5484","DSCN5487","DSCN5491","DSCN5492","DSCN5494","DSCN5495","DSCN5506","DSCN5514","DSCN5528","DSCN5533","DSCN5536","DSCN5540","DSCN5548","DSCN5550","DSCN5554","DSCN5562"];
const verticales = ["DSCN5379","DSCN5411","DSCN5427","DSCN5428","DSCN5429","DSCN5430","DSCN5432","DSCN5435","DSCN5438","DSCN5443","DSCN5454","DSCN5460","DSCN5465","DSCN5466","DSCN5474","DSCN5487","DSCN5492","DSCN5495","DSCN5528","DSCN5536","DSCN5550","DSCN5554"];

function generarPaginas() {
    const book = $("#book");
    const contraportada = book.children().last();

    let i = 0;
    while (i < fotos.length) {
        const page = $('<div class="page"><div class="page-content"></div></div>');
        const content = page.find('.page-content');
        if (fotos[i]) { crearFoto(fotos[i], content, "top-left"); i++; }
        if (fotos[i]) { crearFoto(fotos[i], content, "bottom-right"); i++; }
        page.insertBefore(contraportada);
    }

    book.turn({
        width: 900,
        height: 600,
        autoCenter: true,
        display: 'double',
        duration: 1000,
        when: {
            turning: function(e, page) {
                const total = $(this).turn('pages');
                // Desactivar grosor en portada y contraportada
                if (page === 1 || page === total) {
                    $('#album-viewport').removeClass('abierto');
                } else {
                    $('#album-viewport').addClass('abierto');
                }
            }
        }
    });
}

function crearFoto(nombre, container, posicion) {
    const cont = document.createElement("div");
    cont.className = "foto";
    const esVertical = verticales.includes(nombre);
    cont.style.width = esVertical ? "190px" : "270px";
    cont.style.height = esVertical ? "270px" : "190px";

    if (posicion === "top-left") {
        cont.style.left = "75px";
        cont.style.top = "75px";
    } else {
        cont.style.right = "75px";
        cont.style.bottom = "75px";
    }

    cont.style.transform = `rotate(${(Math.random() * 6) - 3}deg)`;
    const img = new Image();
    img.src = "images_low/" + nombre + ".jpg";
    cont.onclick = function(e) { e.stopPropagation(); abrirModal(nombre); };
    cont.appendChild(img);
    container.append(cont);
}

function abrirModal(nombre) {
    document.getElementById("modalImg").src = "images/" + nombre + ".jpg";
    document.getElementById("modal").style.display = "flex";
    document.getElementById("downloadBtn").onclick = function() {
        const a = document.createElement("a");
        a.href = "images/" + nombre + ".jpg";
        a.download = nombre + ".jpg";
        a.click();
    };
}

function cerrarModal() { document.getElementById("modal").style.display = "none"; }
function nextPage() { $('#book').turn('next'); }
function prevPage() { $('#book').turn('previous'); }

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") cerrarModal();
    if (e.key === "ArrowLeft") prevPage();
    if (e.key === "ArrowRight") nextPage();
});

// --- FUNCIONALIDAD RESPONSIVE ---
function ajustarResponsive() {
    const viewport = $('#album-viewport');
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    // Dimensiones originales de tu libro
    const bookWidth = 900;
    const bookHeight = 600;

    // Calculamos la escala basada en el ancho y alto disponible
    // Restamos 100px al ancho para dejar espacio a los botones laterales
    // Restamos 60px al alto para dar un margen superior/inferior
    let scale = Math.min(
        (windowWidth - 100) / bookWidth,
        (windowHeight - 60) / bookHeight
    );

    // Evitamos que el álbum se haga más grande de su tamaño original
    if (scale > 1) {
        scale = 1;
    }

    // Aplicamos la escala al contenedor principal
    viewport.css({
        'transform': `scale(${scale})`,
        'transform-origin': 'center center'
    });

    // Cambiar a vista de una sola página en celulares
    if (windowWidth < 600) {
        $('#book').turn('display', 'single');
    } else {
        $('#book').turn('display', 'double');
    }
}

// Escuchar los cambios de tamaño de la ventana
$(window).resize(function() {
    ajustarResponsive();
});

// Inicializar everything al cargar la página
$(document).ready(function() {
    generarPaginas();
    ajustarResponsive();
});