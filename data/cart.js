// exporting cart variable so it can be used in other js files

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')); //converting string to array

  //if there is no cart in localStorage, cart will be given default values
  if (!cart) {
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      },
    ];
  }
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); //converting the cart into string and saving to local storage
}

export function addToCart(productId) {
  let matchingItem; //takes productId and adds it to the cart

  //checking if the product is already in the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  //getting the select element for each product
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  //getting the addedToCartMessage for each product
  const addedToCartMessage = document.querySelector(
    `.js-added-to-cart-${productId}`
  );

  addedToCartMessage.classList.add('active'); //adding the active class with opacity 1

  //setting timeout to remove message after 1.2s
  setTimeout(() => {
    addedToCartMessage.classList.remove('active');
  }, 1200);

  const quantity = Number(quantitySelector.value); //converting the quanity into a number, by default its value is a string

  //if the product is already in the cart, increase quantity by the number of quantity selected
  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  // if its not in the cart add it to the cart array
  else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1', //default delivery option
    });
  }

  saveToStorage(); //updating the local storage
}

export function removeFromCart(productId) {
  const newCart = []; //creating a new array

  //looping through the new array and if the product is not eqaul to the product Id
  //that we want to remove it will add it to the new array
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart; //replacing the old cart with the updated cart

  saveToStorage();
}

//calcutating cartQuantity and displaying it in the header
export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(
    '.js-return-to-home-link'
  ).innerHTML = `${cartQuantity} Items`;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  //finding the product

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId; //updating the ID with ID param given to the function

  saveToStorage();
}
