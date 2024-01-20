import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utilities/money.js";

updateCartQuantity(); // displays number of items in the header

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const { productId } = cartItem;

  let matchingProduct;

  //looping through products array
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  //console.log(matchingProduct);
  // cart html template
  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>

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
          <div class="delivery-option">
            <input
              type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  `;
});

// Generating html inside js
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

//selecting all update links on the checkout page

document.querySelectorAll(".js-update-link").forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const productId = updateLink.dataset.productId;

    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");

    updateCartQuantity();
    updateQuantity(productId, newQuantity);
  });
});

//selecting all save links on the checkout page

document.querySelectorAll(".js-save-link").forEach((saveLink) => {
  saveLink.addEventListener("click", () => {
    const productId = saveLink.dataset.productId;

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    const newQuantity = Number(quantityInput.value);

    //alerting the user if the value is less than zero and greater then 1000
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }

    updateQuantity(productId, newQuantity);

    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");

    //gets the input label
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );

    quantityLabel.innerHTML = newQuantity; //changes input label quantity to the updated quantity
    updateCartQuantity();
  });
});

// selecting all delete links on the checkout page
document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
  // when link is clicked, product with its id gets removed from cart with the function from cart.js
  deleteLink.addEventListener("click", () => {
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
