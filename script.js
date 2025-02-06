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

  // Manejo del envío del formulario con AJAX para integrar con Formspree
  document.getElementById("surveyForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita la recarga de la página
    const form = this;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert("Encuesta enviada. ¡Gracias por participar!");
        form.reset(); // Reinicia el formulario (borra los datos seleccionados)
        currentPage = 0; // Vuelve a la primera página
        showPage(currentPage);
      } else {
        response.json().then(data => {
          if (data.hasOwnProperty("errors")) {
            alert(data["errors"].map(error => error["message"]).join(", "));
          } else {
            alert("Ocurrió un error al enviar la encuesta. Inténtalo nuevamente.");
          }
        });
      }
    })
    .catch(error => {
      alert("Ocurrió un error: " + error.message);
    });
  });
});
