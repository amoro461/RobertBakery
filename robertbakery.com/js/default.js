//All URLS needed
const productListURL = "/api/products.php";

//Global variables to hold data
let products = []; //To hold all products that are sorted by title

document.addEventListener("DOMContentLoaded", (e) => {
  //To fetch all the products
  fetchProducts();
  function fetchProducts() {
    fetch(productListURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
          });
        }
      })
      .then((data) => {
        if (data.data) {
          products = data.data; //Set global variable

          showingProducts = products.slice(); //Set global variable

          populateDefaultView();
        } else {
          alert(data.errorMessage);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const loadingSymbolDefaultView = document.querySelector(
    "#loadingSymbolDefaultView"
  );

  //To display the default view with all the products
  function populateDefaultView() {
    populateProductList();

    rowsBlock.style.display = "block";
    loadingSymbolDefaultView.style.display = "none";
  }

  //Elements selected for showing products or error in the list
  const errorProductSearch = document.querySelector("#errorProductSearch");
  const rowsBlock = document.querySelector("#rowsBlock");

  //To display showingProducts to the screen
  function populateProductList() {
    //Readjust screen if error message was showing
    rowsBlock.style.height = "75vh";
    errorProductSearch.style.display = "none";

    //Empty the list element
    rowsBlock.innerHTML = "";

    //Flag to see if a product is displayed
    let productShown = false;

    for (let i = 0; i < showingProducts.length; i++) {
      if (showingProducts[i]) {
        generateMatchRow(showingProducts[i]);
        productShown = true;
      }
    }

    //If no product was displayed, then show error message
    if (!productShown) {
      rowsBlock.style.height = "70vh";
      errorProductSearch.style.display = "block";
    }
  }

  //To generate each row of showingProducts
  function generateMatchRow(product) {
    let div = document.createElement("div");
    div.classList.add("matchesRow");
    div.setAttribute("productId", product.id);

    let title = document.createElement("label");
    title.classList.add("title");
    title.textContent = product.productName;
    div.appendChild(title);

    let view = document.createElement("button");
    view.textContent = "View";

    div.appendChild(view);

    rowsBlock.append(div);
  }
});
