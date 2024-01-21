import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQuantity,
} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utilities/money.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import { deliveryOptions } from '../data/deliveryOptions.js';

updateCartQuantity(); // displays number of items in the header

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const { productId } = cartItem;

  let matchingProduct;

  //looping through products array
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId; //getting delivery option id from the cart

  let deliveryOption;

  //checking if the IDs are equal for each
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const currentDate = dayjs();

  const deliveryDate = currentDate.add(deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format('dddd, MMMM, D');

  // cart html template
  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">${formatCurrency(
            matchingProduct.priceCents
          )}</div> 
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${
              matchingProduct.id
            }">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${
              matchingProduct.id
            }">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${
              matchingProduct.id
            }">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>

  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const currentDate = dayjs();

    const deliveryDate = currentDate.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM, D');

    // asking if the price is equal to zero if it is after ? adds FREE string if not then displays code after :
    const priceString =
      deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input
          type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div> 
    `;
  });

  return html;
}

// Generating html inside js
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

//selecting all update links on the checkout page

document.querySelectorAll('.js-update-link').forEach((updateLink) => {
  updateLink.addEventListener('click', () => {
    const productId = updateLink.dataset.productId;

    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add('is-editing-quantity');

    updateCartQuantity();
    updateQuantity(productId, newQuantity);
  });
});

//selecting all save links on the checkout page

document.querySelectorAll('.js-save-link').forEach((saveLink) => {
  saveLink.addEventListener('click', () => {
    const productId = saveLink.dataset.productId;

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    const newQuantity = Number(quantityInput.value);

    //alerting the user if the value is less than zero and greater then 1000
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }

    updateQuantity(productId, newQuantity);

    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove('is-editing-quantity');

    //gets the input label
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );

    quantityLabel.innerHTML = newQuantity; //changes input label quantity to the updated quantity
    updateCartQuantity();
  });
});

// selecting all delete links on the checkout page
document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
  // when link is clicked, product with its id gets removed from cart with the function from cart.js
  deleteLink.addEventListener('click', () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);

    //selecting which product to remove from the checkout
    const productContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    productContainer.remove(); //removing the product from the page

    updateCartQuantity();
    updateQuantity(productId, newQuantity);
  });
});
