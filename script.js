////////////////////////////////////////////////Slider//////////////////////////////////////////////////

let images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
];
let i = 1;
function slideShow() {
  setInterval(() => {
    if (i > images.length - 1) {
      i = 0;
    } else {
      document.getElementById(
        "img"
      ).style.backgroundImage = `url('./images/SlideShow/${images[i]}')`;
      i++;
    }
  }, 2000);
}

////////////////////////////////////////////////Get Products//////////////////////////////////////////////////

//get all products
function getProducts() {
  let xhr = new XMLHttpRequest();
  let responeProducts;
  xhr.open("get", "https://dummyjson.com/products?limit=0");
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      responeProducts = xhr.response;
      console.log(responeProducts);
      let respone = JSON.parse(responeProducts);
      let Products = respone.products;
      for (let product of Products) {
        displayProducts(product);
      }
    }
  });
  xhr.send();
}

///////////////////////////////////////////////Main Products/////////////////////////////////////////////////////

//creat card and display product

let onlyCard = document.getElementById("card");
function displayProducts(product) {
  let titleProduct = product.title;
  let idProduct = product.id;
  let imageProduct = product.images[0];
  let priceProduct = product.price;
  let discProduct = product.description;
  let countProduct = product.rating;
  let cardParent = document.createElement("div");
  cardParent.setAttribute("id", "allItems");
  cardParent.setAttribute(
    "class",
    "col-10 col-md-3 col-lg-2 innerCard card m-1 border-0 shadow mb-5"
  );
  cardParent.innerHTML = `<img onclick="onlyProduct('${product.id}')" src=${imageProduct} class="card-img-top image p-2" style="height: 18rem !important"><div class="card-title">${titleProduct}</div><div class="card-text">${discProduct}</div><div class="card-subtitle mb-2 text-body-secondary">${priceProduct} $</div><div class="d-flex justify-content-between"><button id ="buy"class="btns btn btn-warning" onclick="addCart('${idProduct}')">Buy</button><button class="bg-success link-light p-2 rounded btns"><i class="fa-solid fa-star"></i>${countProduct}</button></div>`;
  onlyCard.appendChild(cardParent);
}

/////////////////////////////////////////////////nav-2/////////////////////////////////////////////////////////

let navTwo = document.getElementById("navTwo");

function getCategory() {
  let xhr = new XMLHttpRequest();
  let responeProducts;
  xhr.open("get", "https://dummyjson.com/products/categories");
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      responeProducts = xhr.response;
      console.log(responeProducts);
      let respone = JSON.parse(responeProducts);
      for (let catego of respone) {
        console.log(catego);

        navTwo.innerHTML += `<span class="nav-item catego co1-2" onclick="onlyCatego('${catego}')">${catego}</span>`;
      }
    }
  });
  xhr.send();
}
getCategory();

///////////////////////////////////////////////////onlyCategory///////////////////////////////////////////////////////

function onlyCatego(selectedCategory) {
  let xhr = new XMLHttpRequest();
  let responeProducts;
  xhr.open(
    "get",
    `https://dummyjson.com/products/category/${selectedCategory}`
  );
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      responeProducts = xhr.response;
      console.log(responeProducts);
      let respone = JSON.parse(responeProducts);
      let Products = respone.products;
      console.log(Products);
      let items = document.getElementById("allItems");
      onlyCard.innerHTML = "";
      for (let product of Products) {
        displayProducts(product);
      }
    }
  });
  xhr.send();
}

///////////////////////////////////////////////////Change naVUserName/////////////////////////////////////////////////
let isSign = localStorage.getItem("isSigned");
let UserfirstName = localStorage.getItem("Username");
let ParentNameUser = document.getElementById("nameUser");
let SignoutUser = document.getElementsByClassName("signout");

if (isSign == "true") {
  /*  let nameUser = document.createElement("span");
  nameUser.innerHTML = UserfirstName;
  nameUser.style.color='red';
  ParentNameUser.appendChild(nameUser);
  SignoutUser[0].innerHTML= `Sign out `;
  
 SignoutUser.addEventListener("click", function(){


  localStorage.setItem("isSigned", "false");
  SignoutUser.href="./index.html"; */

  let nameUser = document.createElement("a");
  nameUser.innerHTML = "Sign out";
  nameUser.style.paddingLeft = "2rem;";

  nameUser.style.cursor = "pointer";
  ParentNameUser.appendChild(nameUser);
  SignoutUser[0].innerHTML = UserfirstName;
  SignoutUser[0].style.pointerEvents = "none";

  nameUser.addEventListener("click", function () {
    localStorage.setItem("isSigned", "false");
    nameUser.setAttribute("href", "./index.html");
  });
}

///////////////////////////////////////////////////Add items/////////////////////////////////////////////////
let totalproducts = [];
let totalPrice = [];
let sum = 0;
let CountNav = document.createElement("span");
CountNav.setAttribute("class", "badge text-bg-secondary");

function addCart(productid) {
  //getItem
  let xhr = new XMLHttpRequest();
  let countProduct;
  let responeProducts;
  xhr.open("get", `https://dummyjson.com/products/${productid}`);
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      responeProducts = xhr.response;
      let respone = JSON.parse(responeProducts);
    
      //check items in local storage
       if (localStorage.getItem('productsCard')){
        totalproducts =JSON.parse(localStorage.getItem('productsCard'));
       }

        //check price in local storage
        if (localStorage.getItem('productsPrice')){
          totalPrice =JSON.parse(localStorage.getItem('productsPrice'));
          
         }

       totalPrice.push(parseInt(respone.price));
      console.log(totalPrice);
      localStorage.setItem("productsPrice", JSON.stringify(totalPrice));



      if (totalproducts.length != 0) {
        let productFound = false;

        for (let product of totalproducts) {
          if (product.respone.id == productid) {
            product.countProduct++;
            sum++;
            productFound = true;
            console.log("third");
            let countCart = localStorage.getItem("counter");
            let countt = parseInt(countCart);
            countt++;
            localStorage.setItem("counter", countt);

            //increase counter
            CountNav.innerHTML = countt;
            appendCard.appendChild(CountNav);
            break; // No need to continue searching if product is found
          }
        }

        if (!productFound) {
          let obj = { respone, countProduct: 1 };
          sum++;
          totalproducts.push(obj);
          console.log("second");
          let countCart = localStorage.getItem("counter");
          let countt = parseInt(countCart);
          countt++;
          localStorage.setItem("counter", countt);

          //increase counter
          CountNav.innerHTML = countt;
          appendCard.appendChild(CountNav);
        }

        localStorage.setItem("productsCard", JSON.stringify(totalproducts));
      } else {
        console.log(respone);
        countProduct = 1;
        sum++;
        let obj = { respone, countProduct };
        totalproducts.push(obj);
        console.log(totalproducts);
        localStorage.setItem("productsCard", JSON.stringify(totalproducts));
        localStorage.setItem("counter", "1");
        console.log("first");

        //increase counter
        CountNav.innerHTML = "1";
        appendCard.appendChild(CountNav);
      }

      console.log(totalproducts);
    }
  });
  xhr.send();
}

////Search products//////////////////////////////////////////////////////////////////////
let responseData;
function search() {
  //get value of input
  let searchProduct = document.getElementById("search").value;

  //get products by search
  fetch(`https://dummyjson.com/products/search?q=${searchProduct}`)
    .then((response) => response.text())
    .then((json) => (products = JSON.parse(json)))
    .then((items) => {
      responseData = items.products;
      onlyCard.innerHTML = "";
      for (let item of responseData) {
        console.log(item);
        displayProducts(item);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//////////increase counter in homepage/////////////////////////////////////////////////
if (localStorage.getItem("counter")) {
  let countCart = localStorage.getItem("counter");
  CountNav.innerHTML = countCart;
  appendCard.appendChild(CountNav);
}


///////Only Product view////////////////////////////////////////////////////////////////

function onlyProduct(element){

  let xhr = new XMLHttpRequest();
  let responeProducts;
  xhr.open("get", `https://dummyjson.com/products/${element}`);
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      responeProducts = xhr.response;
      let OnlyProductt= JSON.parse(responeProducts);
      console.log(responeProducts);
      displayOnlyProduct(OnlyProductt);



     
    }
  });
  xhr.send();



}
let allImg;
function displayOnlyProduct(product){
  console.log("raghad");
  console.log(product);
  console.log(product.title);

  let titleProduct = product.title;
  let idProduct = product.id;
  let imageProduct = product.images[0];
  allImg= product.images;
  let priceProduct = product.price;
  let brandProduct = product.brand;
  let categoryProduct = product.category;
  let discProduct = product.description;
  let countProduct = product.rating;
  let cardParent = document.createElement("div");
  cardParent.setAttribute("id", "allItems");
  cardParent.setAttribute(
    "class",
    "card mb-3 innerCard2 border-0 shadow mb-5 p-5 m-5"
  );
  cardParent.innerHTML = `<div class="row g-0">
  <div class="col-md-4">
    <img src='${imageProduct}' class="img-fluid rounded-start" alt="product" id="imgOne">
    <button class="bg-success link-light p-2 rounded btns" onclick="prev()"><i class="fa-solid fa-arrow-left"></i></button>
    <button class="bg-success link-light p-2 rounded btns" onclick="next()"><i class="fa-solid fa-arrow-right"></i></button>

  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${titleProduct}</h5>
      <p class="card-text mb-2 ">${discProduct}</p>
      <p class="card-text mb-2 ">${brandProduct}</p>
      <p class="card-text mb-2 ">${categoryProduct}</p>
      <p class="card-subtitle mb-2 text-body-secondary">${priceProduct} $</p>
      <div class="d-flex"><button id ="buy"class="btns btn btn-warning" onclick="addCart('${idProduct}')">Buy</button>
      <button class="bg-success link-light p-2 rounded btns"><i class="fa-solid fa-star"></i>${countProduct}</button>
      </div>
    </div>
  </div>
</div>
`;
onlyCard.innerHTML = "";
  onlyCard.appendChild(cardParent);

}


//previous & next of product
let j=0;
function next(){
  let img = document.getElementById("imgOne")
  console.log(img);
    if (j < allImg.length-1 ){
      j++
      img.src=`${allImg[j]}`;

    }
    else{
      j=0;
      img.src=`${allImg[j]}`;

    }


}

function prev(){
  let img = document.getElementById("imgOne")
  console.log(img);
    if (j>0){
      img.src=`${allImg[j-1]}`;
      j--;


    }
    else {
      j = allImg.length - 1;
      img.src=`${allImg[j]}`;

    }




 
}

