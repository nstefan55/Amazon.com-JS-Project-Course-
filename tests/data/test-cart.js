import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from '../../data/cart.js';

describe('Test Suite : addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          delliveryOptionId: '1',
        },
      ]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWidth(
      'cart',
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          delliveryOptionId: '1',
        },
      ])
    );
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2); //2 instead of 1 because we are just adding to the existing product in the cart
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      //overriding original getItems

      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expet(localStorage.setItem).toHaveBeenCalledWidth(
      'cart',
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          delliveryOptionId: '1',
        },
      ])
    );
    //checking if the first productID is equal to the id on the right
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    //check if the cart quantity of the first product is equal to 1
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('Test Suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('removes a product from the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          delliveryOptionId: '1',
        },
      ]);
    });
    loadFromStorage();

    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    ecpect(localStorage.setItem).toHaveBeenCalledWidth(
      'cart',
      JSON.stringify([{}])
    );
  });

  it('does nothing if product is not in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          delliveryOptionId: '1',
        },
      ]);
    });
    loadFromStorage();

    removeFromCart('does-not-exist');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    ecpect(localStorage.setItem).toHaveBeenCalledWidth(
      'cart',
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          delliveryOptionId: '1',
        },
      ])
    );
  });
});

describe('Test Suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('updates the delivery option', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1',
        },
      ]);
    });
    loadFromStorage();

    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('3');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '3',
        },
      ])
    );
  });

  it('does nothing if the product is not in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1',
        },
      ]);
    });
    loadFromStorage();

    updateDeliveryOption('does-not-exist', '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the delivery option does not exist', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1',
        },
      ]);
    });
    loadFromStorage();

    updateDeliveryOption(
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      'does-not-exist'
    );
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
