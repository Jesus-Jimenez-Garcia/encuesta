document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".form-page");
  let currentPage = 0;

  // Función para mostrar la página indicada
  function showPage(index) {
    pages.forEach((page, i) => {
      page.classList.remove("active");
      if (i === index) {
        page.classList.add("active");
      }
    });
  }

  // Función para validar todos los campos (input, select, textarea) de la página actual
  function validatePage(page) {
    const fields = page.querySelectorAll("input, select, textarea");
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  // Mostrar la primera página al iniciar
  showPage(currentPage);

  // Navegación con validación: solo avanzamos si la página actual está completa y sin errores
  document.getElementById("next1").addEventListener("click", function () {
    if (validatePage(pages[currentPage])) {
      currentPage = 1;
      showPage(currentPage);
    }
  });

  document.getElementById("next2").addEventListener("click", function () {
    if (validatePage(pages[currentPage])) {
      currentPage = 2;
      showPage(currentPage);
    }
  });

  // Botones para volver a páginas anteriores
  document.getElementById("prev2").addEventListener("click", function () {
    currentPage = 0;
    showPage(currentPage);
  });

  document.getElementById("prev3").addEventListener("click", function () {
    currentPage = 1;
    showPage(currentPage);
  });

  // Envío del formulario usando AJAX (fetch) para evitar redirecciones a la página de Formspree
  document.getElementById("surveyForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevenimos el envío tradicional
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
        form.reset();         // Se borran las opciones seleccionadas
        currentPage = 0;      // Se vuelve a la primera página
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

  // Para asegurarnos de que, si el usuario vuelve al formulario (por ejemplo, usando el botón "volver" del navegador),
  // se reinicie el formulario y se muestre la primera página.
  window.addEventListener("pageshow", function(event) {
    document.getElementById("surveyForm").reset();
    currentPage = 0;
    showPage(currentPage);
  });
});
