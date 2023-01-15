function closeByEscape(evt){//обработчик нажатия Esc при открытом попапе
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.pop-up_opened');
    closePopUp(openedPopup);
  };
}
function openPopUp(popup){
    popup.classList.add("pop-up_opened");
    document.addEventListener("keydown",closeByEscape);//добавляем лисенер Esc
};
function closePopUp(popUp){
  document.removeEventListener("keydown",closeByEscape);//удаляем лисенер Esc
  popUp.classList.remove("pop-up_opened");
};
function createNewElement(source){
  const newElementFromTemplate = source.template.content.cloneNode(true);//клон темплейта
  newElementFromTemplate.querySelector(source.elementNameSelector).textContent=source.newImgName;//описание фотокарточки
  const photoTemplate=newElementFromTemplate.querySelector(source.elementPhotoSelector);
  photoTemplate.setAttribute("src", source.newImgSrc);//фото фотокарточки
  photoTemplate.setAttribute("alt", source.newImgName);//alt фотокарточки
  newElementFromTemplate.querySelector(source.elementNumberOfLikesSelector).textContent=source.likes;
  newElementFromTemplate.querySelector(source.elementPhotocardSelector).setAttribute("id", source.newId);//Id фотокарточки
  if(!source.trashFilter){
    newElementFromTemplate.querySelector(source.elementTrashSelector).remove();
  }
  if(source.liked){
    newElementFromTemplate.querySelector(source.elementLikeSelector).classList.add(source.elementLikedByUserClass);
  }
  return newElementFromTemplate;
}
function checkMyLike(myArray,myId){
  for(let i=0; i< myArray.length;i++){
    if(myArray[i]._id === myId){return true}
  }
  return false;
}
  export {openPopUp,createNewElement,closePopUp,checkMyLike};
