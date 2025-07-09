body {
  font-family: Arial, sans-serif;
  padding: 2em;
  background: #2c2c2c; /* Darker background for the page */
  color: #f0f0f0; /* Light text color for contrast */
}

h1 {
  color: #f0f0f0; /* Adjust heading color for dark background */
}

.product-list {
  margin-bottom: 2em;
}

.product-row {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
}

.actions {
  display: flex;
  gap: 1em;
}

.btn {
  padding: 0.6em 1.2em;
  font-size: 1em;
  border-radius: 6px; /* Slightly more rounded corners */
  background: #4a4a4a; /* Dark grey, like metal */
  border: 1px solid #2c2c2c; /* Darker border */
  color: #f0f0f0; /* Light text for contrast */
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* More pronounced shadow */
  font-weight: 600; /* Slightly bolder text */
  text-transform: uppercase; /* Make it stand out */
  letter-spacing: 0.05em; /* Add some spacing */
}

.btn:hover, .btn:focus {
  background: #616161; /* Lighter grey on hover */
  border-color: #4a4a4a;
  color: #ffffff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3); /* Deeper shadow on hover */
  transform: translateY(-1px); /* Slight lift effect */
}

/* Specific button styles, adjusted to complement the new base style */
.btn.view {
  background: #5a5a5a; /* Slightly lighter dark grey for view */
  border: 1px solid #3c3c3c;
  color: #f0f0f0;
}

.btn.view:hover, .btn.view:focus {
  background: #717171;
  border-color: #5a5a5a;
}

.btn.add {
  background: #388e3c; /* Darker green for add */
  border: 1px solid #1b5e20;
  color: #ffffff;
}

.btn.add:hover, .btn.add:focus {
  background: #4caf50;
  border-color: #388e3c;
}

.btn.cart {
  background: #1976d2; /* Darker blue for cart */
  border: 1px solid #0d47a1;
  color: #ffffff;
}

.btn.cart:hover, .btn.cart:focus {
  background: #2196f3;
  border-color: #1976d2;
}

.btn.empty-cart {
  background: #d32f2f; /* Darker red for empty cart */
  border: 1px solid #b71c1c;
  color: #ffffff;
}

.btn.empty-cart:hover, .btn.empty-cart:focus {
  background: #ef5350;
  border-color: #d32f2f;
}

.btn.checkout {
  background: #fbc02d; /* Darker yellow for checkout */
  border: 1px solid #ff8f00;
  color: #333333; /* Darker text for better contrast on yellow */
}

.btn.checkout:hover, .btn.checkout:focus {
  background: #ffeb3b;
  border-color: #fbc02d;
}

.btn.purchase {
  background: #00838f; /* Darker cyan for purchase */
  border: 1px solid #006064;
  color: #ffffff;
}

.btn.purchase:hover, .btn.purchase:focus {
  background: #00bcd4;
  border-color: #00838f;
}

.btn.login {
  background: #616161; /* Dark grey for login */
  border: 1px solid #424242;
  color: #f0f0f0;
}

.btn.login:hover, .btn.login:focus {
  background: #757575;
  border-color: #616161;
}

.btn.logout {
  background: #c62828; /* Darker red for logout */
  border: 1px solid #a10000;
  color: #ffffff;
}

.btn.logout:hover, .btn.logout:focus {
  background: #e53935;
  border-color: #c62828;
}

/* The change-workshop button now inherits from .btn and has no specific override */
/* .btn.change-workshop styles are removed as they are now covered by .btn */

.login-container {
  position: static;
  margin: 1em 0 2em 0;
  z-index: auto;
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
}
