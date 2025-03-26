const productsJsonUrl = "products.json"; // المسار لملف JSON
const productDetailsContainer = document.getElementById(
  "product-details-container"
);

// دالة جلب البيانات من ملف JSON
function fetchProductDetails(productId) {
  fetch(productsJsonUrl)
    .then((response) => response.json())
    .then((data) => {
      const product = data.products.find((p) => p.id === productId);
      if (product) {
        displayProductDetails(product);
      } else {
        console.error("منتج غير موجود.");
      }
    })
    .catch((error) => {
      console.error("خطأ في جلب بيانات المنتج:", error);
    });
}

// دالة عرض تفاصيل المنتج
function displayProductDetails(product) {
  productDetailsContainer.innerHTML = `



        <div class="col-lg-5 col-sm-12">
                <img class="img-fliud productimg" src="${product.image}" alt="">
            </div>
            <div class="col-lg-5 col-sm-12 ">
                <h2 class="mt-5">${product.name}</h2>
                <h4>${product.description} </h4>
                <ul>${product.subdescription}</ul>
                
                
                <a class="download-button" href="${product.files}" download="${product.name}">
                                  Product Information Sheet
                                   
                                </a> 
                
            </div>
    `;

}

// عند تحميل الصفحة، جلب ID المنتج من localStorage
window.onload = function () {
  const selectedProductId = localStorage.getItem("selectedProductId");
  if (selectedProductId) {
    fetchProductDetails(parseInt(selectedProductId, 10));
  } else {
    console.error("لا يوجد ID منتج مخزن.");
  }
};


