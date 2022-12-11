let content = document.querySelector('.content');
let popUp =document.querySelector(".pop-up");

let edit = content.querySelector('.Profile__edit-button');
let closeEdit =popUp.querySelector(".pop-up__close-button");
let save =popUp.querySelector(".pop-up__save-button-box");

function openPopUp(){    
    popUp.classList.remove("pop-up_no-display");    
}
function closePopUp(){
    popUp.classList.add("pop-up_no-display");
}
function newProfile(){
    let name= content.querySelector(".Profile__name");
    let status=content.querySelector(".Profile__status");
    let newName= popUp.querySelector(".pop-up__input-box_type_name");
    let newStatus=popUp.querySelector(".pop-up__input-box_type_status");
    
    if(newName.value !=="" || newStatus.value !==""){
        /*name.value=newName.value;*/
        name.textContent=newName.value;
        status.textContent=newStatus.value;
        console.log("1");
        console.log(newName.value);
        console.log(newStatus.value);
        console.log("2");
    }
}
edit.addEventListener("click",openPopUp);
closeEdit.addEventListener("click",closePopUp);
save.addEventListener("click",newProfile);