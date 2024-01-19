// exporting cart variable so it can be used in other js files

export const cart = [];

export function addToCart(productId) {
  let matchingItem; //takes productId and adds it to the cart

  //checking if the product is already in the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  //getting the addedToCartMessage for each product
  const addedToCartMessage = document.querySelector(
    `.js-added-to-cart-${productId}`
  );

  addedToCartMessage.classList.add("active"); //adding the active class with opacity 1

  //setting timeout to remove message after 1.2s
  setTimeout(() => {
    addedToCartMessage.classList.remove("active");
  }, 1200);

  //getting the select element for each product
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

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
    });
  }
}
