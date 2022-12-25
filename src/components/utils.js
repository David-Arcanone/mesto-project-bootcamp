function openPopUp(source){
    source.closest(".pop-up").classList.remove("pop-up_fade_no-display");
};
function newElement(newImgName,newImgSrc){
  const newElementFromTemplate = document.querySelector("#template").content.cloneNode(true);//ловим темплейт
  newElementFromTemplate.querySelector(".element__name").textContent=newImgName;
  newElementFromTemplate.querySelector(".element__photo").setAttribute("src", newImgSrc);
  newElementFromTemplate.querySelector(".element__photo").setAttribute("alt", newImgName);
  return newElementFromTemplate;
}
  export {openPopUp,newElement};