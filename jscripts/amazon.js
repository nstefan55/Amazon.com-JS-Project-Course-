// importing variable from another file

import { cart } from "../data/cart.js";

// Template HTML generating each product using object info from products.js
let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${(product.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
    `;
});

//console.log(productsHTML);

//Generating Products

document.querySelector(".js-products-grid").innerHTML = productsHTML;

//looping through each "add to cart" button

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    //const productId = button.dataset.productId
    const { productId } = button.dataset;

    let matchingItem;

    //checking if the product is already in the cart
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    //getting the addedToCartMessage for each product
    const addedToCartMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    //adding the active class with opacity 1
    addedToCartMessage.classList.add("active");

    //setting timeout to remove message after 1.2s
    setTimeout(() => {
      addedToCartMessage.classList.remove("active");
    }, 1200);

    //getting the select element for each product
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );

    //converting the quanity into a number, by default its value is a string
    const quantity = Number(quantitySelector.value);

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

    //looping through each object in the cart
    //calculating total cart quantity

    let cartQuantityTotal = 0;

    cart.forEach((item) => {
      cartQuantityTotal += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantityTotal;
  });
});
