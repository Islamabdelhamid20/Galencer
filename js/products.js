const productsJsonUrl = "products.json"; // قم بتعديل المسار حسب ملف JSON الخاص بك

const productsContainer = document.getElementById("products-container");

function displayProducts(products) {
  if (!productsContainer) {
    console.error("عنصر 'products-container' غير موجود في الـ HTML.");
    return;
  }

  productsContainer.innerHTML = ""; // تفريغ المحتوى الحالي

  products.forEach((product) => {
    productsContainer.innerHTML += `
             <div data-aos="zoom-in" class="col-lg-3 col-sm-12 mt-5 ">
                 <div class="card">
                     <img src="${product.image}" class="card-img-top" alt="${product.name}">
                     <div class="card-body">
                         <h5 class="card-title">${product.name}</h5>
                         <p class="card-text">${product.description}</p>
                         <button class="button" style="--clr: #002D62" onclick="goToDetails(${product.id})">
                             View Details
                         </button>
                     </div>
                 </div>
             </div>
         `;
  });
}

// دالة جلب البيانات من ملف JSON
function fetchProducts() {
  fetch(productsJsonUrl)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.products)) {
        displayProducts(data.products);
      } else {
        console.error(
          "Error: Expected an array of products but received:",
          data
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// دالة الانتقال إلى صفحة التفاصيل
function goToDetails(productId) {
  // حفظ ID المنتج في localStorage
  localStorage.setItem("selectedProductId", productId);
  // الانتقال إلى صفحة التفاصيل
  window.location.href = "product-details.html";
}

// عند تحميل الصفحة، جلب المنتجات
window.onload = fetchProducts;
