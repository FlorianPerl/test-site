// GTM Product Add to Cart Events
document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.product-row .btn.add');

  const productData = [
    {
      "Product Name": "Carpenter's Hammer",
      "Product Category 1": "Workshop",
      "Product Category 2": "Hand Tools",
      "Product Quantity": 1,
      "Product Price": 199
    },
    {
      "Product Name": "Electric Drill",
      "Product Category 1": "Workshop",
      "Product Category 2": "Power Tools",
      "Product Quantity": 1,
      "Product Price": 899
    },
    {
      "Product Name": "Tool Set (32pcs)",
      "Product Category 1": "Workshop",
      "Product Category 2": "Kits",
      "Product Quantity": 1,
      "Product Price": 499
    }
  ];

  addButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (index < 3) {
        dataLayer.push({
          event: "Product Added to Cart",
          Products: [productData[index]]
        });
        console.log("GTM Event pushed:", productData[index]);
      }
    });
  });
});
