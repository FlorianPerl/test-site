// GTM Events: Add to Cart, View Product, View Cart, Page View
document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.product-row .btn.add');
  const viewButtons = document.querySelectorAll('.product-row .btn.view');
  const viewCartButton = document.querySelector('.btn.cart');
  const startCheckoutButton = document.querySelector('.btn.checkout');
  const purchaseButton = document.querySelector('.btn.purchase');
  const loginButton = document.querySelector('.btn.login');
  const pageViewBtn = document.querySelector('.actions .btn.view');
  const logoutButton = document.querySelector('.btn.logout');
  const emptyCartButton = document.querySelector('.btn.empty-cart');

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
    },
    {
      "Product Name": "Adjustable Wrench",
      "Product Category 1": "Workshop",
      "Product Category 2": "Hand Tools",
      "Product Price": 299
    }
  ];

  function generateTransactionId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

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
          amplitude_event_properties: {
            Products: [{ ...productData[index], "Product Quantity": 1 }]
          }
        });
        console.log("Add to Cart:", productData[index]);
      }
      if (index === 3) {
        addToCart(index);
        dataLayer.push({
          event: "Product Added to Cart",
          amplitude_event_properties: {
            Products: [{ ...productData[index], "Product Quantity": 1 }]
          }
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
          amplitude_event_properties: {
            Products: [productData[index]]
          }
        });
        console.log("Product Viewed:", productData[index]);
      }
      if (index === 3) {
        dataLayer.push({
          event: "Product Viewed",
          amplitude_event_properties: {
            Products: [productData[index]]
          }
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
      amplitude_event_properties: {
        Products: cartArray
      }
    });
    console.log("Cart Viewed:", cartArray);
  });

  pageViewBtn.addEventListener('click', () => {
    dataLayer.push({
      event: "Page Viewed",
      amplitude_event_properties: {}
    });
    console.log("Page Viewed event pushed.");
  });

  startCheckoutButton.addEventListener('click', () => {
    const cart = getCart();
    const cartArray = Object.values(cart);
    dataLayer.push({
      event: "Checkout Initiated",
      amplitude_event_properties: {
        Products: cartArray
      }
    });
    console.log("Checkout Initiated:", cartArray);
  });

  purchaseButton.addEventListener('click', () => {
    const cart = getCart();
    const cartArray = Object.values(cart);
    const revenue = calculateRevenue(cart);
    const transactionId = generateTransactionId();
    
    dataLayer.push({
      event: "Transaction Completed",
      amplitude_event_properties: {
        Products: cartArray,
        Revenue: revenue,
        "Transaction ID": transactionId
      }
    });
    console.log("Transaction Completed:", { Products: cartArray, Revenue: revenue, "Transaction ID": transactionId });
  });

  loginButton.addEventListener('click', () => {
    const userIds = ["ABC123", "DEF456", "GHI789"];
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const workshopIds = ["Grandpa's Workshop", "Garage", "Beekeeper's Woorkshop", "Basement"];
    const workshopId = workshopIds[Math.floor(Math.random() * workshopIds.length)]
    dataLayer.push({
      event: "Login",
      "User ID": userId,
      "Workshop ID": workshopId
    });
    console.log("Login event pushed:", { event: "Login", "User ID": userId });
  });

  logoutButton.addEventListener('click', () => {
    dataLayer.push({
      event: "Log Out",
      "User ID": undefined
    });
    console.log("Log Out event pushed:", { event: "Log Out", "User ID": undefined });
  });

  emptyCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    dataLayer.push({ event: "Empty Cart" });
    console.log("Cart has been emptied.");
  });
});
