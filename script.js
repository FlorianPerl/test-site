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
  // Get the new change workshop button
  const changeWorkshopButton = document.querySelector('.btn.change-workshop');

  // Update version no.
  console.log("v. 12");

  const productData = [
    {
      "Product Name": "Carpenter's Hammer",
      "Product Category 1": "Workshop",
      "Product Category 2": "Hand Tools",
      "Product Price": 199,
      "$price": 199,
      "$currency": "PLN"
    },
    {
      "Product Name": "Electric Drill",
      "Product Category 1": "Workshop",
      "Product Category 2": "Power Tools",
      "Product Price": 899,
      "$price": 899,
      "$currency": "PLN"
    },
    {
      "Product Name": "Tool Set (32pcs)",
      "Product Category 1": "Workshop",
      "Product Category 2": "Kits",
      "Product Price": 499,
      "$price":499,
      "$currency": "PLN"
    },
    {
      "Product Name": "Adjustable Wrench",
      "Product Category 1": "Workshop",
      "Product Category 2": "Hand Tools",
      "Product Price": 299,
      "$price": 299,
      "$currency": "PLN"
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
      addToCart(index);
      const product = productData[index];
      const quantity = 1; // For this event, quantity is always 1
      const productWithValue = {
        ...product,
        "Product Quantity": quantity,
        "Product Value": product["Product Price"] * quantity
      };

      dataLayer.push({
        event: "Product Added to Cart",
        amplitude_event_properties: {
          Products: [productWithValue]
        }
      });
      console.log("Add to Cart:", productWithValue);
    });
  });

  viewButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Note: 'Product Value' is not added here as 'Product Quantity' is not available.
      dataLayer.push({
        event: "Product Viewed",
        amplitude_event_properties: {
          Products: [productData[index]]
        }
      });
      console.log("Product Viewed:", productData[index]);
    });
  });

  viewCartButton.addEventListener('click', () => {
    const cart = getCart();
    const cartArray = Object.values(cart);
    const cartArrayWithValue = cartArray.map(product => ({
      ...product,
      "Product Value": product["Product Price"] * product["Product Quantity"]
    }));

    dataLayer.push({
      event: "Cart Viewed",
      amplitude_event_properties: {
        Products: cartArrayWithValue
      }
    });
    console.log("Cart Viewed:", cartArrayWithValue);
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
    const cartArrayWithValue = cartArray.map(product => ({
      ...product,
      "Product Value": product["Product Price"] * product["Product Quantity"]
    }));

    dataLayer.push({
      event: "Checkout Initiated",
      amplitude_event_properties: {
        Products: cartArrayWithValue
      }
    });
    console.log("Checkout Initiated:", cartArrayWithValue);
  });

  purchaseButton.addEventListener('click', () => {
    const cart = getCart();
    const cartArray = Object.values(cart);
    const revenue = calculateRevenue(cart);
    const transactionId = generateTransactionId();
    const cartArrayWithValue = cartArray.map(product => ({
        ...product,
        "Product Value": product["Product Price"] * product["Product Quantity"]
      }));

    dataLayer.push({
      event: "Transaction Completed",
      amplitude_event_properties: {
        Products: cartArrayWithValue,
        Revenue: revenue,
        $revenue: revenue,
        $currency: "PLN",
        "Transaction ID": transactionId,
        $transactionId: transactionId
      }
    });
    console.log("Transaction Completed:", { Products: cartArrayWithValue, Revenue: revenue, "Transaction ID": transactionId });
  });

  loginButton.addEventListener('click', () => {
    const userIds = ["Mandy", "Castello", "Frank", "Takeda"];
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const workshopIds = ["Grandpa's Workshop", "Subaru Garage", "Beekeeper's Woorkshop", "Anise's Cabin"];
    const workshopId = workshopIds[Math.floor(Math.random() * workshopIds.length)]
    dataLayer.push({
      event: "Log In",
      "user_id": userId,
      amplitude_groups: {
        group_type: "Workshop ID",
        group_name: workshopId
      }
    });
    console.log("Login event pushed:", { event: "Login", "user_id": userId, "Workshop ID": workshopId });
  });

  logoutButton.addEventListener('click', () => {
    dataLayer.push({
      event: "Log Out",
      "user_id": undefined
    });
    console.log("Log Out event pushed:", { event: "Log Out", "User ID": undefined });
  });

  emptyCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    dataLayer.push({ event: "Empty Cart" });
    console.log("Cart has been emptied.");
  });

  // New functionality for "Change Workshop" button
  changeWorkshopButton.addEventListener('click', () => {
    const workshopOptions = ["Grandpa's Workshop", "Subaru Garage", "Beekeeper's Woorkshop", "Anise's Cabin"];
    const randomWorkshopId = workshopOptions[Math.floor(Math.random() * workshopOptions.length)];

    dataLayer.push({
      event: "Workshop Changed",
      amplitude_groups: {
        group_type: "Workshop ID",
        group_name: randomWorkshopId
      }
    });
    console.log("Workshop Changed event pushed:", {
      event: "Workshop Changed",
      amplitude_groups: {
        group_type: "Workshop ID",
        group_name: randomWorkshopId
      }
    });
  });

  // Helper function for calculateRevenue, if it's missing from the original script
  function calculateRevenue(cart) {
    let totalRevenue = 0;
    for (const item in cart) {
      totalRevenue += cart[item]["Product Price"] * cart[item]["Product Quantity"];
    }
    return totalRevenue;
  }
});
