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

  // Función de validación personalizada para la página actual.
  // Se valida cada campo (y para grupos de radio se comprueba que se haya seleccionado al menos uno).
  function validatePage(page) {
    let valid = true;
    const radioGroups = new Set();

    // Validar inputs (excepto radios) y recolectar nombres de radios
    const fields = page.querySelectorAll("input, select, textarea");
    fields.forEach(field => {
      if (field.type === "radio") {
        radioGroups.add(field.name);
      } else {
        if (!field.checkValidity()) {
          field.reportValidity();
          valid = false;
        }
      }
    });

    // Validar que en cada grupo de radio se haya seleccionado alguna opción
    radioGroups.forEach(name => {
      const radios = page.querySelectorAll(`input[name="${name}"]`);
      let isChecked = false;
      radios.forEach(radio => {
        if (radio.checked) isChecked = true;
      });
      if (!isChecked) {
        // Reporta la validez sobre el primer radio del grupo
        radios[0].reportValidity();
        valid = false;
      }
    });

    return valid;
  }

  // Mostrar la primera página al cargar
  showPage(currentPage);

  // Botón "Siguiente" de la página 1
  document.getElementById("next1").addEventListener("click", function () {
    if (validatePage(pages[currentPage])) {
      currentPage = 1;
      showPage(currentPage);
    } else {
      alert("Por favor, completa todos los campos obligatorios antes de continuar.");
    }
  });

  // Botón "Siguiente" de la página 2
  document.getElementById("next2").addEventListener("click", function () {
    if (validatePage(pages[currentPage])) {
      currentPage = 2;
      showPage(currentPage);
    } else {
      alert("Por favor, completa todos los campos obligatorios antes de continuar.");
    }
  });

  // Botones "Volver"
  document.getElementById("prev2").addEventListener("click", function () {
    currentPage = 0;
    showPage(currentPage);
  });
  document.getElementById("prev3").addEventListener("click", function () {
    currentPage = 1;
    showPage(currentPage);
  });

  // No se interviene en el submit, se permite la validación nativa y el envío a Formspree.
  // Así, tras el envío, se muestra la página de Formspree (thank you).

  // Al volver al formulario (por ejemplo, con el botón "atrás" del navegador), se resetea el formulario y se muestra la primera página.
  window.addEventListener("pageshow", function(event) {
    document.getElementById("surveyForm").reset();
    currentPage = 0;
    showPage(currentPage);
  });
  
});
