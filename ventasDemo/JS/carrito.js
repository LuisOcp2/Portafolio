document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Función para renderizar el contenido del carrito
  function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    cart.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add(
        "cart-item",
        "flex",
        "items-center",
        "justify-between",
        "p-4",
        "border",
        "border-gray-300",
        "rounded"
      );
      productElement.innerHTML = `
          <img src="../img/Productos/?product.jpg" alt="${
            product.name
          }" class="w-20 h-20 object-cover rounded mr-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold">${product.name}</h3>
            <p class="text-gray-700">Precio por unidad: $${product.price.toFixed(
              2
            )}</p>
            <p class="text-gray-700">Cantidad: ${product.quantity}</p>
            <p class="text-gray-700">Precio total: $${(
              product.price * product.quantity
            ).toFixed(2)}</p>
          </div>
          <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 remove-from-cart" data-id="${
            product.id
          }">Eliminar</button>
        `;
      cartContainer.appendChild(productElement);
    });
    calculateTotal();
  }

  // Función para calcular el total del carrito
  function calculateTotal() {
    const totalContainer = document.getElementById("total-container");
    const total = cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Manejar el evento de clic en el botón "Eliminar del Carrito"
  document
    .getElementById("cart-container")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-from-cart")) {
        const id = event.target.getAttribute("data-id");
        removeFromCart(id);
      }
    });

  // Función para eliminar productos del carrito
  function removeFromCart(id) {
    const index = cart.findIndex((product) => product.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  }

  // Función para guardar el carrito en el almacenamiento local
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Renderizar el carrito al cargar la página
  renderCart();
});
