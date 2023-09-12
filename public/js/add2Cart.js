// Function to add a product to the cart
function addToCart(productId) {
  console.log("You clicked add to cart");
  if (typeof Storage !== "undefined") {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let existingProduct = cartItems.find(
      (item) => item.productId === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert("Added item to cart");
    } else {
      fetchProductDetails(productId)
        .then((product) => {
          const product_name = product.name;
          const imagesurl = product.imagesurl;
          const price = product.price;
          const size = product.size;

          cartItems.push({
            productId,
            product_name,
            imagesurl,
            price,
            size,
            quantity: 1,
          });
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          alert(`${product.name} added to cart successfully.`);
          updateCartItems(); // Update the cart display after adding the item
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  } else {
    alert("Local storage is not available. Cannot add to cart.");
  }
}

// Function to fetch product details from the API
function fetchProductDetails(productId) {
  // Make an API request to get product details by productId
  return fetch(`/api/productsbyId/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

// Function to retrieve cart items from local storage
function getCartItems() {
  // Check if local storage is available
  if (typeof Storage !== "undefined") {
    // Get cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems;
  } else {
    alert("Local storage is not available.");
    return [];
  }
}

// Function to update the cart items in the HTML
function updateCartItems() {
  const cartItems = getCartItems();
  const tableBody = document.querySelector(".shoping__cart__table tbody");
  const totalCell = document.querySelector(".shoping__cart__total__price");

  // Clear the existing table rows
  tableBody.innerHTML = "";

  let total = 0; // Initialize the total price

  // Loop through the cart items and generate HTML for each item
  cartItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="shoping__cart__item">
          <img src="/img/uploads/${
            item.imagesurl[0]
          }" alt="" style="width: 20px; height: 20px;" />
          <h5>${item.product_name}</h5>
      </td>
      <td class="shoping__cart__price">KES ${parseFloat(item.price).toFixed(
        2
      )}</td>
      <td class="shoping__cart__quantity">
          <div class="quantity">
              <div class="pro-qty">
                  <input type="number" value="${
                    item.quantity
                  }" min="1" data-index="${index}" />
              </div>
          </div>
      </td>
      <td class="shoping__cart__total">KES ${(
        parseFloat(item.price) * item.quantity
      ).toFixed(2)}</td>
      <td class="shoping__cart__item__close">
          <span class="icon_close" data-index="${index}"></span>
      </td>
    `;

    // Update the total price
    total += parseFloat(item.price) * item.quantity;

    tableBody.appendChild(row);
  });

  // Update the total price in the table footer
  totalCell.textContent = `Total Price: KES ${total.toFixed(2)}`;

  // Add event listeners to quantity input fields
  const quantityInputs = document.querySelectorAll(
    ".shoping__cart__quantity input"
  );
  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });

  // Add event listeners to close buttons
  const closeButtons = document.querySelectorAll(
    ".shoping__cart__item__close span"
  );
  closeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });

  // Call the function to update cart information in the HTML
  updateCartInfoInHTML(cartItems);
}

// Function to update the quantity when the user changes it
function updateQuantity(event) {
  const indexToUpdate = event.target.getAttribute("data-index");
  const newQuantity = parseInt(event.target.value);
  const cartItems = getCartItems();

  if (!isNaN(newQuantity) && newQuantity >= 1) {
    cartItems[indexToUpdate].quantity = newQuantity;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartItems();
  } else {
    // Reset the input value if an invalid quantity is entered
    event.target.value = cartItems[indexToUpdate].quantity;
  }
}

// Function to remove an item from the cart
function removeFromCart(event) {
  const indexToRemove = event.target.getAttribute("data-index");
  const cartItems = getCartItems();

  if (indexToRemove !== null) {
    cartItems.splice(indexToRemove, 1); // Remove the item from the array
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update local storage
    updateCartItems(); // Refresh the cart display
  }
}

// Function to count the total quantity of items in the cart
function countCartItems(cartItems) {
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
}

// Function to calculate the total price of items in the cart
function calculateCartTotal(cartItems) {
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice += parseFloat(item.price) * item.quantity;
  });

  return totalPrice.toFixed(2);
}

// Function to update cart information (count and total) in the HTML
function updateCartInfoInHTML() {
  const cartItemCountElement = document.getElementById("cartItemCount");
  const cartTotalElement = document.getElementById("cartTotal");
  // console.log(cartItems);
  const cartItems = getCartItems();
  console.log(cartItems);

  const totalQuantity = countCartItems(cartItems);
  const totalCartPrice = calculateCartTotal(cartItems);

  console.log(totalQuantity);
  console.log(totalCartPrice);

  cartItemCountElement.textContent = totalQuantity;
  cartTotalElement.textContent = `KES ${totalCartPrice}`;
}

// Call the updateCartItems function to populate the cart table when the page loads
updateCartItems();

// Call the function to initially update cart information in the HTML
// updateCartInfoInHTML(getCartItems());
