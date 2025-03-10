document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Función para agregar productos al carrito
  function addToCart(id, name, price, quantity) {
    const existingProduct = cart.find((product) => product.id === id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      const product = { id, name, price, quantity };
      cart.push(product);
    }
    saveCart();
    console.log("Producto añadido al carrito:", cart);
  }

  // Función para eliminar productos del carrito
  function removeFromCart(id) {
    cart = cart.filter((product) => product.id !== id);
    saveCart();
    console.log("Producto eliminado del carrito:", cart);
  }

  // Función para guardar el carrito en el almacenamiento local
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Manejar el evento de clic en el botón "Añadir al Carrito"
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");
      const name = event.target.getAttribute("data-name");
      const price = parseFloat(event.target.getAttribute("data-price"));
      const quantity = parseInt(document.getElementById(`quantity${id}`).value);
      addToCart(id, name, price, quantity);
    });
  });

  // Manejar el evento de clic en el botón "Eliminar del Carrito"
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");
      removeFromCart(id);
    });
  });
});
