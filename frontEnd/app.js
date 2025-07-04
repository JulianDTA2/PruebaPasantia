const API = "/api/productos";
const form = document.getElementById("form-producto");
const lista = document.getElementById("lista-productos");
const mensajeDiv = document.getElementById("mensaje");

// Cargar productos
async function cargar() {
  const res = await fetch(API);
  const data = await res.json();
  lista.innerHTML = data
    .map(
      (p) => `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.precio}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editar(${p.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="borrar(${p.id})">Eliminar</button>
      </td>
    </tr>
  `
    )
    .join("");
}

// Mostrar mensaje
function mensaje(texto, tipo = "success") {
  mensajeDiv.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
  setTimeout(() => (mensajeDiv.innerHTML = ""), 3000);
}

// Crear o actualizar
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("product-id").value;
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const precio = document.getElementById("precio").value;
  const opts = {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, precio }),
  };
  const res = await fetch(id ? `${API}/${id}` : API, opts);
  if (res.ok) {
    mensaje(id ? "Actualizado" : "Creado");
    form.reset();
    cargar();
  } else {
    mensaje("Error", "danger");
  }
});

// Editar
window.editar = async (id) => {
  const res = await fetch(`${API}/${id}`);
  const p = await res.json();
  document.getElementById("product-id").value = p.id;
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("descripcion").value = p.descripcion;
  document.getElementById("precio").value = p.precio;
};

// Eliminar
window.borrar = async (id) => {
  if (!confirm("¿Eliminar producto?")) return;
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (res.ok) {
    mensaje("Eliminado");
    cargar();
  }
};

// Inicializar
cargar();
