let addUserFormEle =document.getElementById("addUserForm");
let nameEle = document.getElementById("name");
let emailEle = document.getElementById("email");
let statusEle = document.getElementById("status");
let genderMaleEle = document.getElementById("genderMale");
let genderFemaleEle = document.getElementById("genderFemale");
let nameErrMsgEle = document.getElementById("nameErrMsg");
let emailErrMsgEle = document.getElementById("emailErrMsg");

let formData = {
    name:'',
    email:'',
    status:'active',
    gender:'male'

}
nameEle.addEventListener("change",function(event){
    if(event.target.value === ""){
        nameErrMsgEle.textContent = 'Required*';
        nameErrMsgEle.classList.add("red-color");
    }else{
        nameErrMsgEle.textContent = "";
    }
    formData.name = event.target.value;
})
emailEle.addEventListener("change",function(event){
    if(event.target.value === ""){
        emailErrMsgEle.textContent = 'Required*';
        emailErrMsgEle.classList.add("red-color");

    }else{
        emailErrMsgEle.textContent = "";
    }
    formData.email = event.target.value;
})

statusEle.addEventListener("change",function(event){
    formData.status = event.target.value;
})

genderMaleEle.addEventListener("change",function(event){
    formData.gender = event.target.value;
})
genderFemaleEle.addEventListener("change",function(event){
    formData.gender = event.target.value;
})

function validateFormData(formData){
    let {
        name,
        email
    }= formData;
    if(name === ""){
        nameErrMsgEle.textContent = 'Required*';
        nameErrMsgEle.classList.add("red-color");

    }
    if(email === ""){
        emailErrMsgEle.textContent = 'Required*';
        emailErrMsgEle.classList.add("red-color");
    }
}

function submitFormData(formData){
    let options = {
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer  7651efb0ffb5e819d3c105fa7299f5c9a7a7786cdc794ea26f1e0fe8da2f61d9"
        },
        body: JSON.stringify(formData)
    };

    let url ="https://gorest.co.in/public-api/users";
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        console.log(jsonData);
        if(jsonData === 422){
           if (jsonData.data[0].message === "has already been taken"){
             emailErrMsgEle.textContent = "Email already exists";
           }
        }
    });
}
addUserFormEle.addEventListener("submit",function(event){
    event.preventDefault();
    validateFormData(formData);
    submitFormData(formData);
})