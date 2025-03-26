
async function fetchSixProducts() {
  try {
    const response = await fetch("products.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "ar",
      },
    });

    if (!response.ok) {
      throw new Error("حدث خطأ أثناء جلب البيانات");
    }

    const data = await response.json();

    const products = Array.isArray(data) ? data : data.products; // التحقق إذا كانت البيانات مباشرةً مصفوفة أو مغلفة في كائن

    if (!Array.isArray(products)) {
      throw new Error("البيانات ليست مصفوفة كما هو متوقع.");
    }

    const sixProducts = products.slice(0, 8);
    console.log(sixProducts);

    displayProducts(sixProducts);
  } catch (error) {
    console.error("خطأ:", error.message, error);
  }
}
function displayProducts(products) {
  const productsContainer = document.getElementById("products-container");

  if (!productsContainer) {
    console.error("عنصر 'products-container' غير موجود في الـ HTML.");
    return;
  }

  productsContainer.innerHTML = ""; // تفريغ المحتوى الحالي

  products.forEach((product) => {
    productsContainer.innerHTML += `
          <div  data-aos="flip-down" class="col-lg-3 col-sm-12  mt-5 ">
              <div class="card">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.description}</p>
                      <button href="#" class="button" style="--clr: #002D62">
                          <span class="button__icon-wrapper">
                              <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                  class="button__icon-svg" width="10">
                                  <path
                                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                      fill="currentColor"></path>
                              </svg>
  
                              <svg viewBox="0 0 14 15" fill="none" width="10"
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="button__icon-svg button__icon-svg--copy">
                                  <path
                                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                      fill="currentColor"></path>
                              </svg>
                          </span>
                          <a  href="./products.html"> Show More</a>
                        
                      </button>
                  </div>
              </div>
          </div>
      `;
  });
}


fetchSixProducts();

