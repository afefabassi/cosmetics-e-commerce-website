// Get the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.product .pay button');

// Get the cart item element
const cartItemElement = document.getElementById('cartItem');

// Create an empty cart array
let cart = [];

// Function to update the cart item count
function updateCartItemCount() {
  const countElement = document.getElementById('count');
  countElement.textContent = cart.length;
}

// Function to update the total price in the cart
function updateCartTotal() {
  const totalElement = document.getElementById('total');
  const total = cart.reduce((acc, product) => acc + product.price, 0);
  totalElement.textContent = '$ ' + total.toFixed(2);
}

// Function to render the cart items
function renderCartItems() {
  if (cart.length === 0) {
    cartItemElement.textContent = 'Your cart is empty';
    return;
  }

  cartItemElement.innerHTML = '';

  cart.forEach((product, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <div class="cart-item-name">${product.name}</div>
      <div class="cart-item-price">$ ${product.price.toFixed(2)}</div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartItemElement.appendChild(cartItem);
  });

  // Attach event listeners to the "Remove" buttons
  const removeButtons = cartItemElement.querySelectorAll('.remove-btn');
  removeButtons.forEach((button) => {
    button.addEventListener('click', removeCartItem);
  });
}

// Function to handle the "Add to Cart" button click
function addToCartButtonClick(event) {
  const productElement = event.target.closest('.product');
  const productName = productElement.querySelector('.nameprice h3').textContent;
  const productPrice = parseFloat(productElement.querySelector('.nameprice span').textContent);

  const product = {
    name: productName,
    price: productPrice
  };

  cart.push(product);
  updateCartItemCount();
  updateCartTotal();
  renderCartItems();
}

// Function to handle the "Remove" button click
function removeCartItem(event) {
  const button = event.target;
  const index = button.dataset.index;

  cart.splice(index, 1);
  updateCartItemCount();
  updateCartTotal();
  renderCartItems();
}

// Attach event listeners to the "Add to Cart" buttons
addToCartButtons.forEach((button) => {
  button.addEventListener('click', addToCartButtonClick);
});
