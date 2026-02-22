const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// ===== NAVBAR CART COUNT =====

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += Number(item.quantity);
  });

  const counters = document.querySelectorAll(".cart-count");

  counters.forEach((counter) => {
    counter.textContent = totalQuantity;
    counter.style.display = totalQuantity > 0 ? "inline-block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", updateCartCount);



// home page modal view

const products = document.querySelectorAll(".pro");
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalMainImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalQty = document.getElementById("modalQty");
const modalAddBtn = document.getElementById("modalAddToCart");
const modalClose = document.querySelector(".modal .close");

products.forEach((product) => {
  product.addEventListener("click", function (e) {
    e.preventDefault();

    const img = this.querySelector("img").src;
    const title = this.querySelector("h5").textContent;
    const price = this.querySelector("h4").textContent;
    const descEl = this.querySelector(".des .prod-desc");
    const desc = descEl ? descEl.textContent : "";

    modalImg.src = img;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    document.getElementById("modalDesc").textContent = desc;
    modalQty.value = 1;

    modal.style.display = "flex";
  });
});

// Close modal
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// Add to cart from modal
modalAddBtn.addEventListener("click", () => {
  const product = {
    name: modalTitle.textContent,
    price: Number(modalPrice.textContent.replace("$", "")),
    image: modalImg.src,
    quantity: Number(modalQty.value),
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // your existing function
  alert("✅ Item added to cart successfully!");

  modal.style.display = "none";
});

