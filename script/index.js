const content = document.querySelector('.content');//сужаем для запросов в контентной области
const elements = content.querySelector('.elements');//для добавлений новых фотокарточек
const popUpEdit = document.querySelector(".pop-up_container_edit");//сужаем для запросов а попап окнах
const popUpAdd = document.querySelector(".pop-up_container_add");//сужаем для запросов а попап окнах
const popUpPhotocard = document.querySelector(".pop-up_container_photocard");//сужаем для запросов а попап окнах
const templateElement = document.querySelector("#template").content;//ловим темплейт
const addButton = content.querySelector('.profile__add-button');//кнопка открытия попап добавления карточки
const editButton = content.querySelector('.profile__edit-button');//кнопка открытия попап изменения профиля
const closeEdit = popUpEdit.querySelector(".pop-up__close-button_type_edit");//кнопка закрытия popup Edit
const closeAdd = popUpAdd.querySelector(".pop-up__close-button_type_add");//кнопка закрытия popup Add
const closeImage = popUpPhotocard.querySelector(".pop-up__close-button_type_image");//кнопка закрытия popup Фотокарточки
const profileName = content.querySelector(".profile__name");//поле текущего имени
const profileStatus = content.querySelector(".profile__status");//поле текущего профиля
const photocardName = popUpPhotocard.querySelector(".pop-up__photocard-name");//фото с попапа фотокарточки
const photocardImg = popUpPhotocard.querySelector(".pop-up__photocard-img");//поле описания с попапа фотокарточки
const newName = popUpEdit.querySelector(".pop-up__input-box_type_name");//поле записи имени профиля
const newStatus = popUpEdit.querySelector(".pop-up__input-box_type_status");//поле записи статуса профиля
const newElementName= popUpAdd.querySelector(".pop-up__input-box_type_element-name");//поле записи имени новой фотокаточки
const newElementSrc= popUpAdd.querySelector(".pop-up__input-box_type_element-src");//поле записи адреса новой фотокарточки
function openPopUp(source){
    source.closest(".pop-up").classList.remove("pop-up_fade_no-display");
}
function displayEdit(){
  openPopUp(popUpEdit);
  newName.value=profileName.textContent;
  newStatus.value=profileStatus.textContent;
}
function displayAdd(){
  openPopUp(popUpAdd);
  newElementName.value="";
  newElementSrc.value="";
}
function displayImg(evt){
  photocardName.textContent=evt.target.closest(".element").querySelector(".element__name").textContent;
  photocardImg.setAttribute("src", evt.target.getAttribute('src'));
  openPopUp(popUpPhotocard);
}
function closePopUp(evt){
    evt.target.closest(".pop-up").classList.add("pop-up_fade_fading");
}
function newProfile(evt){
  evt.preventDefault();
  if(newName.value !=="" && newStatus.value !==""){
    profileName.textContent=newName.value;
    profileStatus.textContent=newStatus.value;
    closePopUp(evt);
  } else{alert( "Заполните поля профиля");}
}
function newElement(newImgName, newImgSrc){//создание элемента
  const newElementFromTemplate = templateElement.cloneNode(true);
  newElementFromTemplate.querySelector(".element__name").textContent=newImgName;
  newElementFromTemplate.querySelector(".element__photo").setAttribute("src", newImgSrc);
  newElementFromTemplate.querySelector(".element__photo").addEventListener("click",displayImg);
  newElementFromTemplate.querySelector(".element__trash").addEventListener("click",deleteElement);
  return newElementFromTemplate;
}
function createElement(evt){//создание элемента с попап окна
  evt.preventDefault();
  if(newElementName.value !=="" && newElementSrc.value !==""){
    elements.prepend(newElement(newElementName.value,newElementSrc.value));
    closePopUp(evt);
  } else{alert( "Заполните поля новой карточки");}
}
function defaultElements(){//загрузка элементов фотокарточек с таблицы по-умолчанию
  for(let i=0;i<initialCards.length;i++){
    elements.prepend(newElement(initialCards[i].name,initialCards[i].link));
  }
}
function deleteElement(evt){
  evt.target.closest(".elements__child").querySelector(".element__photo").removeEventListener("click",displayImg);//нажатие на изображение
  evt.target.removeEventListener("click", deleteElement);//нажатие на корзину
  evt.target.closest(".elements__child").remove();//удаление
}
function filterEnter(evt){//Функция фильтрации обработки submit с текстовых input при нажатии Enter
  if (evt.keyCode === 13) {
    evt.preventDefault();
}}
for(let i=0; i<filterKeyEventList.length; i++){//Запуск фильтрации Enter со всех текстовых полей
  newStatus.addEventListener(filterKeyEventList[i],filterEnter);
  newName.addEventListener(filterKeyEventList[i],filterEnter);
  newElementSrc.addEventListener(filterKeyEventList[i],filterEnter);
  newElementName.addEventListener(filterKeyEventList[i],filterEnter);
}
function fadingAnimation(evt){//функция анимации закрытия pop-up
  if (evt.animationName === "fade"){
    evt.target.classList.remove("pop-up_fade_fading");
    evt.target.classList.add("pop-up_fade_no-display");
  }
}
function fadingAnimationListener(){//функция обработки анимации закрытия pop-up
  popUpEdit.addEventListener("animationend",fadingAnimation);
  popUpAdd.addEventListener("animationend",fadingAnimation);
  popUpPhotocard.addEventListener("animationend",fadingAnimation);
}
editButton.addEventListener("click", displayEdit);//нажатие кнопки редактирования профиля
addButton.addEventListener("click", displayAdd);//нажатие кнопки добавления карточки
closeEdit.addEventListener("click", closePopUp);//нажатие кнопки закрытия попап Edit
closeAdd.addEventListener("click", closePopUp);//нажатие кнопки закрытия попап Add
closeImage.addEventListener("click", closePopUp);//нажатие кнопки закрытия попап Фотокарточки 
popUpEdit.querySelector(".form_type_edit").addEventListener("submit",newProfile);//нажатие кнопки сохранить изменения профиля
popUpAdd.querySelector(".form_type_add").addEventListener("submit",createElement);//нажатие кнопки подтвердить создание карточки
defaultElements();//запуск фукции загрузки фотокарточек по-умолчанию
fadingAnimationListener();//запуск фукции обработки начала закрытия pop-up


