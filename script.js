// Esperamos a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".form-page");
  let currentPage = 0;

  // Función para mostrar la página actual
  function showPage(index) {
    pages.forEach((page, i) => {
      page.classList.remove("active");
      if (i === index) {
        page.classList.add("active");
      }
    });
  }

  // Mostrar la primera página al iniciar
  showPage(currentPage);

  // Botón "Siguiente" de la página 1
  document.getElementById("next1").addEventListener("click", function () {
    currentPage = 1;
    showPage(currentPage);
  });

  // Botón "Siguiente" de la página 2
  document.getElementById("next2").addEventListener("click", function () {
    currentPage = 2;
    showPage(currentPage);
  });

  // Botón "Volver" de la página 2
  document.getElementById("prev2").addEventListener("click", function () {
    currentPage = 0;
    showPage(currentPage);
  });

  // Botón "Volver" de la página 3
  document.getElementById("prev3").addEventListener("click", function () {
    currentPage = 1;
    showPage(currentPage);
  });

  // Manejo del envío del formulario
  document.getElementById("surveyForm").addEventListener("submit", function (e) {
    // e.preventDefault();
    // Aquí podrías hacer un fetch o cualquier acción para enviar los datos
    alert("Encuesta enviada. ¡Gracias por participar!");
    // Opcionalmente, puedes resetear el formulario o redirigir a otra página
    // this.reset();
    // currentPage = 0;
    // showPage(currentPage);
  });
});
