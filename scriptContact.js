let nameUser = document.getElementById("name");
let emailUser = document.getElementById("email");
let subUser = document.getElementById("subject");
let txteUser = document.getElementById("message");
let name_labelUser = document.getElementById("labelname");
let email_labelUser = document.getElementById("labelemail");
let sub_labelUser = document.getElementById("labelsubject");
let msg_labelUser = document.getElementById("labelmsg");


nameUser.addEventListener("focus", ()=>{
    name_labelUser.style.display="block";
    name_labelUser.style.color=" #2b65b1";

})

nameUser.addEventListener("blur", ()=>{
    name_labelUser.style.display="none";
})



emailUser.addEventListener("focus", ()=>{
    email_labelUser.style.display="block";
    email_labelUser.style.color=" #2b65b1";
})

emailUser.addEventListener("blur", ()=>{
    email_labelUser.style.display="none";
})


subUser.addEventListener("focus", ()=>{
    sub_labelUser.style.display="block";
    sub_labelUser.style.color=" #2b65b1";

})

subUser.addEventListener("blur", ()=>{
    sub_labelUser.style.display="none";
})


txteUser.addEventListener("focus", ()=>{
    msg_labelUser.style.display="block";
    msg_labelUser.style.color=" #2b65b1";

})

txteUser.addEventListener("blur", ()=>{
    msg_labelUser.style.display="none";
})


////////////////check validation

 let nameRgx= /^[a-zA-Z]{3,20}$/;
 let mailRgx = /^[a-zA-Z0-9]{5,20}(@)(gmail.com|yahoo.com|outlook.com)$/;
 let invalidName = document.getElementById("invalidname");
 let invalidEmail = document.getElementById("invalidemail");
 let msgResponse = document.getElementById("msgresponse");

//check name
function checkname(element){
    nameUser = element.value;
    if (!(nameUser.match(nameRgx))){
        invalidName.style.display="block";
    }
    else {
        invalidName.style.display="none";

    }
}

//check email
function checkemail(element){
    emailUser = element.value;
    if (!(emailUser.match(mailRgx))){
        invalidEmail.style.display="block";
    }
    else {
        invalidEmail.style.display="none";

    }
}


//onsubmit

function checksubmit(event){
    if (emailUser.match(mailRgx) && nameUser.match(nameRgx) && subUser.value !="" && txteUser.value != ""){
        event.preventDefault();
        msgResponse.style.display="block";



    }

    else {
        event.preventDefault();

        checkemail(element);
        checkname(element);


    }

}




