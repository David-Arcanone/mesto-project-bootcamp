import {openPopUp,createNewElement,closePopUp, checkMyLike} from "./utils.js";
import {changeAvatar,changeProfileInfo, createCard} from "./api.js";

function runClosePopUpLogic(source){//проверка нажатия по фону попапа или кнопке Х для закрытия
  const PopUpAll = document.querySelectorAll(`.${source.popUpClass}`);//все попапы
  PopUpAll.forEach((popUpElement) => {//закрытие для всех pop-up
    popUpElement.addEventListener('click',(evt)=>{//обработка закрытия от кнопок-Х и бэкграундов
      if(evt.target.classList.contains(source.popUpClass) || evt.target.classList.contains(source.popUpCloseButton)){
        closePopUp(popUpElement);};});
  });
};
function changeSaveButtontext(button, message){
  button.textContent=message;
};
function newProfile(source){//функция сохраняет новый профиль
  changeSaveButtontext(source.buttonEditSave, "Сохранение...");
  changeProfileInfo(source.newName.value, source.newStatus.value)
  .then((result)=>{
    source.profileName.textContent=result.name;
    source.profileStatus.textContent=result.about;
    closePopUp(source.popUp);
    changeSaveButtontext(source.buttonEditSave, "Сохраненить");
  })
  .catch((err)=>{
    console.log(err);
    changeSaveButtontext(source.buttonEditSave, "Сохраненить");
  })
};
function displayEdit(source){//функция открываем попап edit
  openPopUp(source.popUp);
  source.newName.value=source.profileName.textContent;
  source.newStatus.value=source.profileStatus.textContent;
}
function runEditLogic(source){//логика редактирования профиля
  source.buttonOpenEdit.addEventListener("click", ()=>{//нажатие кнопки открыть попап
    displayEdit({
    popUp: source.popUpEdit,
    newName: source.newName,
    newStatus: source.newStatus,
    profileName: source.profileName,
    profileStatus: source.profileStatus
  })});
  source.popUpEdit.addEventListener('submit', (evt)=>{// обработчик команды сохранения профиля
    evt.preventDefault();
    newProfile({
    buttonEditSave: source.buttonEditSave,
    popUp: source.popUpEdit,
    newName: source.newName,
    newStatus: source.newStatus,
    profileName: source.profileName,
    profileStatus: source.profileStatus
  })});
};
function addNewElement(source){//создание
  changeSaveButtontext(source.buttonAddSave, "Сохранение...");
  createCard({
    name:source.formAddElements.inputElementName.value,
    link: source.formAddElements.inputElementSrc.value
  })
  .then((res)=>{
    source.elementsGrid.prepend(createNewElement({
      elementLikeSelector: source.elementLikeSelector,
      elementLikedByUserClass: source.elementLikedByUserClass,
      elementTrashSelector: source.elementTrashSelector,
      elementPhotocardSelector: source.elementPhotocardSelector,
      newImgName: res.name,
      newImgSrc: res.link,
      template: source.template,
      elementNameSelector: source.elementNameSelector,
      elementPhotoSelector: source.elementPhotoSelector,
      newId: res._id,
      elementNumberOfLikesSelector: source.elementNumberOfLikesSelector,
      likes: res.likes.length,
      liked: false,//у новосозданной вами карточки, еще нет на странице, поэтому лайка вашего тоже нет
      trashFilter: true,//рендер корзины необходим, тк создали его мы, проверка не нужна
    }));
    changeSaveButtontext(source.buttonAddSave, "Создать");
    closePopUp(source.popUp);
  })
  .catch((err)=>{
    console.log(err);
    changeSaveButtontext(source.buttonAddSave, "Создать");
  });
};
function runAddLogic(source){//логика добавления фотокарточки
  source.formAdd.reset();//первоначальное удаление
  source.buttonOpenAddPhotocard.addEventListener("click", ()=>{openPopUp(source.popUp);});//нажатие кнопки открыть попап
  source.formAdd.addEventListener('submit', (evt)=>{//сабмит формы добавления фотокарточки
    evt.preventDefault();
    addNewElement({
      elementLikeSelector: `.${source.elementLikeClass}`,
      elementLikedByUserClass: source.elementLikedByUserClass,
      elementNumberOfLikesSelector: source.elementNumberOfLikesSelector,
      buttonAddSave: source.buttonAddSave,
      elementTrashSelector: source.elementTrashSelector,
      elementPhotocardSelector: source.elementPhotocardSelector,
      elementsGrid: source.elementsGrid,
      formAddElements: source.formAddElements,
      popUp: source.popUp,
      template: source.template,
      elementNameSelector: source.elementNameSelector,
      elementPhotoSelector: source.elementPhotoSelector,
  });
  source.formAdd.reset();//удаление после сабмита
});
};
function changeAvatarPhoto(photoSource){
 changeSaveButtontext(photoSource.buttonAvatarChangeSave, "Сохранение...");
  changeAvatar(photoSource.newAvatarSrcValue)
  .then(
    (result)=>{
    console.log(result);
    photoSource.currentAvatarSrc.setAttribute("src", result.avatar);
    closePopUp(photoSource.popUp);
    changeSaveButtontext(photoSource.buttonAvatarChangeSave, "Сохранить");
  })
  .catch((errorMessage)=>{
    console.log(errorMessage);
    changeSaveButtontext(photoSource.buttonAvatarChangeSave, "Сохранить");
  })  
}
function runAvatarChange(source){
  source.formAvatarChange.reset();//изначально очищаем
  source.buttonOpenAvatarChange.addEventListener("click",()=>{openPopUp(source.popUp);});//нажатие кнопки открыть попап
  source.formAvatarChange.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    changeAvatarPhoto({
    buttonAvatarChangeSave: source.buttonAvatarChangeSave,
    currentAvatarSrc: source.currentAvatarSrc,
    newAvatarSrcValue: source.newAvatarSrc.value,
    popUp: source.popUp
    });
  source.formAvatarChange.reset();//удаление текста в инпуте после сабмита
});//сабмит формы добавления фотокарточки

}
export {runClosePopUpLogic,runEditLogic,runAddLogic,runAvatarChange};
