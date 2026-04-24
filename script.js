const fotos = ["DSCN5374","DSCN5379","DSCN5384","DSCN5386","DSCN5397","DSCN5405","DSCN5411","DSCN5412","DSCN5427","DSCN5428","DSCN5429","DSCN5430","DSCN5432","DSCN5435","DSCN5438","DSCN5443","DSCN5447","DSCN5454","DSCN5460","DSCN5465","DSCN5466","DSCN5474","DSCN5475","DSCN5484","DSCN5487","DSCN5491","DSCN5492","DSCN5494","DSCN5495","DSCN5506","DSCN5514","DSCN5528","DSCN5533","DSCN5536","DSCN5540","DSCN5548","DSCN5550","DSCN5554","DSCN5562"];
const verticales = ["DSCN5379", "DSCN5411", "DSCN5427", "DSCN5428", "DSCN5429", "DSCN5430", "DSCN5432", "DSCN5435", "DSCN5438", "DSCN5443", "DSCN5454", "DSCN5460", "DSCN5465", "DSCN5466", "DSCN5474", "DSCN5487", "DSCN5492", "DSCN5495", "DSCN5528", "DSCN5536", "DSCN5550", "DSCN5554"];

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
    book.turn({ width: 900, height: 600, autoCenter: true, display: 'double', acceleration: true, gradients: true, duration: 1000 });
}

function crearFoto(nombre, container, posicion) {
    const cont = document.createElement("div");
    cont.className = "foto";
    const esVertical = verticales.includes(nombre);

    // Tamaños ligeramente reducidos para que no se salgan del margen
    cont.style.width = esVertical ? "180px" : "250px";
    cont.style.height = esVertical ? "250px" : "180px";

    // Margen de seguridad de 50px desde los bordes de la página
    if (posicion === "top-left") {
        cont.style.left = "50px";
        cont.style.top = "50px";
    } else {
        cont.style.right = "50px";
        cont.style.bottom = "50px";
    }

    const rot = (Math.random() * 6) - 3; // Rotación sutil
    cont.style.transform = "rotate(" + rot + "deg)";

    const img = new Image();
    img.src = "images_low/" + nombre + ".jpg";
    cont.onclick = function() { abrirModal(nombre); };
    cont.appendChild(img);
    container.append(cont);
}

function abrirModal(nombre) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const downloadBtn = document.getElementById("downloadBtn");

    modalImg.src = "images/" + nombre + ".jpg";
    modal.style.display = "flex";

    // Función de descarga directa HD
    downloadBtn.onclick = function() {
        const a = document.createElement("a");
        a.href = "images/" + nombre + ".jpg";
        a.download = nombre + ".jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
}

function cerrarModal() { document.getElementById("modal").style.display = "none"; }
function nextPage() { $('#book').turn('next'); }
function prevPage() { $('#book').turn('previous'); }

$(document).ready(generarPaginas);