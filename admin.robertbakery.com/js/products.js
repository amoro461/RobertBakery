//All URLS needed
const productCreateURL = "/api/products/create.php";
const productUpdateURL = "/api/products/update.php";
const productGetAllURL = "/api/products/all.php";

//Global variables to hold data
let products = []; //To hold all products that are sorted by title

document.addEventListener("DOMContentLoaded", (e) => {
  //To fetch all the products
  fetchProducts();
  
  function fetchProducts()
  {
    fetch(productGetAllURL)
      .then(function (response)
	  {
        if (response.ok)
		{
          return response.json();
        }
		else
		{
          return Promise.reject(
		  {
            status: response.status,
            statusText: response.statusText,
          });
        }
      })
      .then((data) => {
        if (data.data) {
          products = data.data; //Set global variable

          populateDefaultView();
        }
		else
		{
          alert(data.errorMessage);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  const productNameInputField = document.querySelector("#productNameInputField");
  
  const createProductSubmitButton = document.querySelector("#createProductSubmitButton");

  const loadingSymbolDefaultView = document.querySelector("#loadingSymbolDefaultView");
  
  createProductSubmitButton.addEventListener("click", (e) =>
  {
	  let productName = productNameInputField.value;
	  
	  if(productName)
	  {
		fetch(productCreateURL, {
			method: 'POST',
			body: '{"productName" : "' + productName + '"}'
		})
		.then(function (response) {
			if (response.ok)
			{
			  return response.json();
			}
			else
			{
			  alert("Something went wrong in creating the Product!");
			}
		})
		.then((data) => {
			if(data.isSuccessful)
			{
				alert("Successfully created the Product!");
			}
			else
			{
			  alert(data.errorMessage);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	  }
	  else
	  {
		  alert("Require name for Product!");
	  }
  });

  //To display the default view with all the products
  function populateDefaultView() {
    populateProductList();

    rowsBlock.style.display = "block";
	
	if(loadingSymbolDefaultView)
	{
		loadingSymbolDefaultView.style.display = "none";
	}
  }

  //Elements selected for showing products or error in the list
  const errorProductSearch = document.querySelector("#errorProductSearch");
  const rowsBlock = document.querySelector("#rowsBlock");

  //To display products to the screen
  function populateProductList() {
    //Readjust screen if error message was showing
    rowsBlock.style.height = "75vh";
    errorProductSearch.style.display = "none";

    //Empty the list element
    rowsBlock.innerHTML = "";

    //Flag to see if a product is displayed
    let productShown = false;

    for (let i = 0; i < products.length; i++) {
      if (products[i]) {
        generateMatchRow(products[i]);
        productShown = true;
      }
    }

    //If no product was displayed, then show error message
    if (!productShown) {
      rowsBlock.style.height = "70vh";
      errorProductSearch.style.display = "block";
    }
  }

  //To generate each row of products
  function generateMatchRow(product) {
    let div = document.createElement("div");
    div.classList.add("matchesRow");
    div.setAttribute("productId", product.id);

    let title = document.createElement("label");
    title.classList.add("title");
    title.textContent = product.productName;
    div.appendChild(title);

    let view = document.createElement("button");
	
	if(product.isActive)
	{
		view.textContent = "Deactivate";
	}
	else
	{
		view.textContent = "Activate";
	}
	
	view.addEventListener("click", (e) => {
		let newIsActiveValue = 0;
		
		if(product.isActive){
			newIsActiveValue = 0;
		} else {
			newIsActiveValue = 1;
		} 
		
		fetch(productUpdateURL, {
			method: 'PATCH',
			body: '{ "productId" : "' + product.productId + '", "isActive" : "' + newIsActiveValue + '" }'
		})
		.then(function (response) {
			if (response.ok)
			{
			  return response.json();
			}
			else
			{
			  alert("Something went wrong in updating the Product!");
			}
		})
		.then((data) => {
			if(data.isSuccessful)
			{
				product.isActive = !product.isActive;
					
				if(product.isActive)
				{
					view.textContent = "Deactivate";
				}
				else
				{
					view.textContent = "Activate";
				}
				
				alert("Successfully updated the Product!");
			}
			else
			{
			  alert(data.errorMessage);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	});

    div.appendChild(view);

    rowsBlock.append(div);
  }
});
