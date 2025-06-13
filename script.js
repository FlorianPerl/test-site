// GTM Product Events: Add to Cart, View Product, View Cart (with localStorage)
document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.product-row .btn.add');
  const viewButtons = document.querySelectorAll('.product-row .btn.view');
  const viewCartButton = document.querySelector('.btn.cart');

  const productData = [
    {
      "Product Name": "Carpenter's Hammer",
      "Product Category 1": "Workshop",
      "Product Category 2": "Hand Tools",
      "Product Price": 199
    },
    {
      "Product Name": "Electric Drill",
      "Product Category 1": "Workshop",
      "Product Category 2": "Power Tools",
      "Product Price": 899
    },
    {
      "Product Name": "Tool Set (32pcs)",
      "Product Category 1": "Workshop",
      "Product Category 2": "Kits",
      "Product Price": 499
    }
  ];

  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || {};
  }

  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(index) {
    const cart = getCart();
    const productName = productData[index]["Product Name"];
    if (!cart[productName]) {
      cart[productName] = {
        ...productData[index],
        "Product Quantity": 1
      };
    } else {
      cart[productName]["Product Quantity"] += 1;
    }
    saveCart(cart);
  }

  addButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (index < 3) {
        addToCart(index);
        dataLayer.push({
          event: "Product Added to Cart",
          Products: [{ ...productData[index], "Product Quantity": 1 }]
        });
        console.log("Add to Cart:", productData[index]);
      }
    });
  });

  viewButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (index < 3) {
        dataLayer.push({
          event: "Product Viewed",
          Products: [productData[index]]
        });
        console.log("Product Viewed:", productData[index]);
      }
    });
  });

  viewCartButton.addEventListener('click', () => {
    const cart = getCart();
    const cartArray = Object.values(cart);
    dataLayer.push({
      event: "Cart Viewed",
      Products: cartArray
    });
    console.log("Cart Viewed:", cartArray);
  });
});
