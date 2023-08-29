//get products from localstorage//////////////////////////////////////
let price=0
let allProducts = localStorage.getItem("productsCard");
let allPrice =JSON.parse(localStorage.getItem("productsPrice"));
console.log(allPrice);

for (let item of allPrice){
  price += item;
}



console.log(price);
let priceParent = document.getElementById("price");
priceParent.innerHTML=`Total price: ${price} $`;


let onlyCard = document.getElementById("card");
console.log(JSON.parse(allProducts));
let parsedProducts = JSON.parse(allProducts);
for (let product of parsedProducts ){
    console.log(product.respone.id);
//display//////////////////////////////////////////////////////////////
  let titleProduct = product.respone.title;
  let idProduct = product.respone.id;
  let imageProduct = product.respone.images[0];
  let priceProduct = product.respone.price;
  let discProduct = product.respone.description;
  let countProduct = product.respone.rating;
  let counter = product.countProduct;
  let cardParent = document.createElement("div");
  cardParent.setAttribute("id", "allItems")
  cardParent.setAttribute("class", "col-12 col-md-3 col-lg-2 innerCard card m-1 border-0 shadow mb-5")
  cardParent.innerHTML= `<img src=${imageProduct} class="card-img-top image p-2" style="height: 18rem !important"><div class="card-title">${titleProduct}</div><div class="card-text">${discProduct}</div><div class="card-subtitle mb-2 text-body-secondary">${priceProduct} $</div><div class="d-flex justify-content-between"><button class="bg-success link-light p-2 rounded btns"><i class="fa-solid fa-star"></i>${countProduct}</button><button class="bg-success link-light p-2 rounded btns">${counter} item</button></div>`
  onlyCard.appendChild(cardParent);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

