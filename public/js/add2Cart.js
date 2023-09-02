function addToCart(productId) {
  console.log("You clicked add to cart");

  // Check if local storage is available
  if (typeof Storage !== "undefined") {
    // Get existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product is already in the cart
    let existingProduct = cartItems.find((item) => item.productId === productId);

    if (existingProduct) {
      // Product already in cart, update quantity
      existingProduct.quantity += 1;

      // Update the local storage with the modified cart items
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Display success message with the product name and new quantity
      alert(`${existingProduct.product.name} added to cart successfully. New quantity: ${existingProduct.quantity}`);
    } else {
      // Product not in cart, fetch product details from the API
      fetchProductDetails(productId)
        .then((product) => {
          // Add the product to the cart with a quantity of 1
          cartItems.push({ productId, product, quantity: 1 });

          // Save the updated cart items back to local storage
          localStorage.setItem("cartItems", JSON.stringify(cartItems));

          // Display success message with the product name
          alert(`${product.name} added to cart successfully.`);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  } else {
    alert("Local storage is not available. Cannot add to cart.");
  }
}
