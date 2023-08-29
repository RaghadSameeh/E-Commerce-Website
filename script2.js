/////////////////////////////////////////////////get-user/////////////////////////////////////////////////////////
let btnForm = document.getElementById("btn");

function getuser(){
  
///////////////values////////////

let inputForm = document.getElementById("input").value;
let passForm = document.getElementById("pass").value;



///////////Get Users////////////

let xhr = new XMLHttpRequest();
let responeProducts;
xhr.open ("get" , "https://dummyjson.com/users");
xhr.addEventListener("readystatechange" , ()=>{
  if ( xhr.readyState == 4 && xhr.status == 200){
    responeProducts = xhr.response;
    let respone = JSON.parse(responeProducts);
    let allUsers= respone.users;
    console.log(respone);
    console.log(allUsers);
    for ( let user of allUsers){
      if (user.email == inputForm && user.password == passForm){
        localStorage.setItem("isSigned", "true")
        localStorage.setItem("Username", user.firstName);
        console.log(user.firstName);
        newWindow = open("./index.html", "width=500,height=800,sceenX=600,screenY=1000")
      }
    }
  }

})
xhr.send();


}






