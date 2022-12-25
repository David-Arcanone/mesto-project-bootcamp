import {openPopUp,newElement} from "./utils";
function closePopUp(evt){//закрывает текущий попап
  evt.target.closest(".pop-up").classList.add("pop-up_fade_fading");
};
function fadingAnimation(evt){//функция анимации закрытия pop-up
  if (evt.animationName === "fade"){
    evt.target.classList.remove("pop-up_fade_fading");
    evt.target.classList.add("pop-up_fade_no-display");
  }
};
function closePopUpLogic(){//проверка нажатия по фону попапа или кнопке Х для закрытия
  const PopUpAll = document.querySelectorAll('.pop-up');//все попапы
  PopUpAll.forEach((popUpElement) => {//закрытие для всех pop-up
    popUpElement.addEventListener('click',(evt)=>{//обработка закрытия от кнопок-Х и бэкграундов
      if(evt.target.classList.contains("pop-up") || evt.target.classList.contains("pop-up__close-button")){
        closePopUp(evt);};});
    popUpElement.addEventListener('animationend',fadingAnimation);//обработка анимации закрытия pop-up (вспомогательная для закрытия)    
  });
};
function newProfile(evt){//функция сохраняет новый профиль
  evt.preventDefault();
  if(!evt.target.querySelector(".form__save-button-box").classList.contains("form__save-button-box_inactive")){
    const profileName = document.querySelector(".profile__name");//поле текущего имени
    const profileStatus = document.querySelector(".profile__status");//поле текущего статуса
    const newName = document.forms.edit.elements.inputName;//поле записи нового имени профиля
    const newStatus = document.forms.edit.elements.inputStatus;//поле записи нового статуса профиля
    profileName.textContent=newName.value;
    profileStatus.textContent=newStatus.value;
    closePopUp(evt);}
};
function displayEdit(){//функция открываем попап edit
  const newName = document.forms.edit.elements.inputName;//поле записи нового имени профиля
  const newStatus = document.forms.edit.elements.inputStatus;//поле записи нового статуса профиля
  const profileName = document.querySelector(".profile__name");//поле текущего имени
  const profileStatus = document.querySelector(".profile__status");//поле текущего статуса
  openPopUp(document.forms.edit);
  newName.value=profileName.textContent;
  newStatus.value=profileStatus.textContent;
}
function editLogic(){//логика редактирования профиля
  document.querySelector('.profile__edit-button').addEventListener("click", displayEdit);//нажатие кнопки редактирования профиля
  document.forms.edit.addEventListener('submit', newProfile);// обработчик команды сохранения профиля
};
function displayAdd(){
  openPopUp(document.forms.add);
  document.forms.add.elements.inputElementName.value="";
  document.forms.add.elements.inputElementSrc.value="";
};
function checkNewElement(evt){//создание элемента
  evt.preventDefault();
  const formAddElements = document.forms.add.elements;
    if(!formAddElements.addSave.classList.contains("form__save-button-box_inactive")){
      document.querySelector('.elements').prepend(newElement(formAddElements.inputElementName.value,formAddElements.inputElementSrc.value));
      closePopUp(evt);
    }
};
function addLogic(){//логика добавления фотокарточки
  document.querySelector('.profile__add-button').addEventListener("click", displayAdd);//нажатие кнопки добавления карточки
  document.forms.add.addEventListener('submit', checkNewElement);//сабмит формы добавления фотокарточки
};
export {closePopUpLogic,editLogic,addLogic};