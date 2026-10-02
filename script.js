// =====================================================
// Ventanas emergentes (informacion, foto y video)
// =====================================================

// Bloquea el scroll de la pagina mientras haya una ventana abierta
function actualizarScroll() {
  var abierta = false;
  document.querySelectorAll(".modal, .modal-foto, .modal-video").forEach(function (m) {
    if (m.style.display === "flex") {
      abierta = true;
    }
  });
  document.body.classList.toggle("sin-scroll", abierta);
}

// Muestra la ventana emergente de la foto que se clickeo
function mostrarInfo(numero) {
  document.getElementById("modal-" + numero).style.display = "flex";
  actualizarScroll();
}

// Cierra la ventana emergente indicada
function cerrarModal(numero) {
  document.getElementById("modal-" + numero).style.display = "none";
  actualizarScroll();
}

// Cierra la ventana actual y abre la otra (para las flechas de dentro del modal)
function cambiarFoto(actual, siguiente) {
  cerrarModal(actual);
  mostrarInfo(siguiente);
}

// Abre cualquier foto (principal o miniatura) en grande
function abrirFoto(src) {
  document.getElementById("modal-foto-img").src = src;
  document.getElementById("modal-foto-principal").style.display = "flex";
  actualizarScroll();
}

// Cierra la ventana de la foto en grande
function cerrarFotoPrincipal() {
  document.getElementById("modal-foto-principal").style.display = "none";
  actualizarScroll();
}

// Abre el video de un area y lo empieza a reproducir
function abrirVideo(id) {
  document.getElementById("modal-video-" + id).style.display = "flex";
  document.getElementById("video-" + id).play();
  actualizarScroll();
}

// Cierra el video de un area y lo pausa
function cerrarVideo(id) {
  var video = document.getElementById("video-" + id);
  video.pause();
  document.getElementById("modal-video-" + id).style.display = "none";
  actualizarScroll();
}

// Cierra el video si se hace click en el fondo oscuro (no en el video)
function cerrarVideoFondo(evento, id) {
  if (evento.target.id === "modal-video-" + id) {
    cerrarVideo(id);
  }
}

// =====================================================
// Comodidades de uso: teclado y click en el fondo
// =====================================================

// Tecla Escape: cierra cualquier ventana abierta
document.addEventListener("keydown", function (evento) {
  if (evento.key !== "Escape") {
    return;
  }
  document.querySelectorAll(".modal-video").forEach(function (m) {
    if (m.style.display === "flex") {
      var video = m.querySelector("video");
      if (video) {
        video.pause();
      }
    }
  });
  document.querySelectorAll(".modal, .modal-foto, .modal-video").forEach(function (m) {
    m.style.display = "none";
  });
  actualizarScroll();
});

// Click en el fondo oscuro de una ventana de informacion: la cierra
document.querySelectorAll(".modal").forEach(function (modal) {
  modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
      modal.style.display = "none";
      actualizarScroll();
    }
  });
});

// Elementos con role="button" (miniaturas de video): Enter o Espacio equivalen a click
document.querySelectorAll('[role="button"]').forEach(function (el) {
  el.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      el.click();
    }
  });
});
