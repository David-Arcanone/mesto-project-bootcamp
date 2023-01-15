import '../index.css';
import {runBasicCardLogic,runProfileSetting} from "./card.js";
import {runClosePopUpLogic,runEditLogic,runAddLogic,runAvatarChange} from "./modal.js";
import {enableValidation} from "./validate.js";
function runSiteLogic(){//логика
  //константы
  const elementsGrid =document.querySelector('.elements');//поиск грида фотокарточек
  const popUpPhotocard = document.querySelector(".pop-up_container_photocard");//попап просмотр фотокарточки
  const popUpEdit = document.querySelector(".pop-up_container_edit");//попап эдит профиля
  const popUpAdd = document.querySelector(".pop-up_container_add");//попап добавить фотокарточку
  const popUpAvatarChange = document.querySelector(".pop-up_container_change-avatar");//попап изменить аватар
  const template = document.querySelector("#template");
  const currentAvatarSrc=document.querySelector(".profile__avatar");
  const buttonOpenEdit = document.querySelector('.profile__edit-button');//кнопка запуска попап редактировать профиль
  const buttonOpenAddPhotocard = document.querySelector('.profile__add-button');//кнопка запуска попап добавить фотокарточку
  const buttonOpenAvatarChange = document.querySelector('.profile__change-avatar-button');//кнопка запуска попап  изменить аватар
  const profileName = document.querySelector(".profile__name");//поле текущего имени
  const profileStatus = document.querySelector(".profile__status");//поле текущего статуса
  const photocardName = popUpPhotocard.querySelector(".pop-up__photocard-name");//фото с попапа фотокарточки
  const photocardImg = popUpPhotocard.querySelector(".pop-up__photocard-img");//поле описания с попапа фотокарточки
//поиск в DOM дереве по формам только в Валидации
  const formEdit = document.forms.edit;//поле записи нового имени профиля
  const newName = formEdit.elements.inputName;//поле записи нового имени профиля
  const newStatus = formEdit.elements.inputStatus;//поле записи нового статуса профиля  
  const buttonEditSave = formEdit.elements.save;
  const formAdd =document.forms.add;
  const formAddElements = document.forms.add.elements;//элементы формы Add
  const imgNameAdd=formAddElements.inputElementName;
  const imgSrcAdd=formAddElements.inputElementSrc;
  const buttonAddSave = formAdd.elements.save;
  const formAvatarChange= document.forms.avatar;
  const newAvatarSrc=formAvatarChange.elements.inputAvatarSrc;
  const buttonAvatarChangeSave=formAvatarChange.elements.save;
//селекторы и 
  const elementPhotocardSelector =".element";
  const elementTrashSelector =".element__trash";
  const elementNameSelector =".element__name";
  const elementPhotoSelector = ".element__photo";
  const formSelector = '.form';
  const inputSelector = '.form__input';
  const submitButtonSelector = '.form__save-button-box';
  const inactiveButtonClass = 'form__save-button-box_inactive';
  const inputErrorClass = 'form__input_error';
  const errorClass = 'form__input-error-message_active';
  const trashClass = "element__trash";//класс корзины
  const elementFromGridSelector = ".elements__child";//селектор по классу элемент грида
  const elementPhotoClass = "element__photo";//класс фото из грида
  const elementLikeClass = "element__like";// класс лайка из грида
  const elementLikedByUserClass = "element__like_liked";//класс если поставили лайк
  const elementNumberOfLikesSelector =".element__number-of-likes";
  const popUpClass = 'pop-up';//класс попапов
  const popUpCloseButton ="pop-up__close-button";//класс кнопки Х
  runProfileSetting({
    currentAvatarSrc,
    profileName,
    profileStatus
  })
  .then((myId)=>{//карточки отображаем только после получения Id
    runBasicCardLogic({//логика первичной страницы, это загрузка грида фотокарточек
      elementLikedByUserClass,
      elementNumberOfLikesSelector,
      myId,
      elementTrashSelector,
      elementPhotocardSelector,
      elementsGrid,
      popUpPhotocard,
      elementNameSelector,
      elementPhotoSelector,
      photocardName,
      photocardImg,
      template,
      trashClass,
      elementFromGridSelector,
      elementPhotoClass,
      elementLikeClass,
    });
    runAddLogic({//логика попап создания фотокарточек, карточки отображаем только после получения Id
      elementLikeClass,
      elementLikedByUserClass,
      buttonAddSave,
      elementNumberOfLikesSelector,
      elementTrashSelector,
      elementPhotocardSelector,
      formAdd,
      elementsGrid,
      popUp: popUpAdd,
      buttonOpenAddPhotocard,
      formAddElements,
      imgNameAdd,
      imgSrcAdd,
      elementNameSelector,
      elementPhotoSelector,
      template,
    });
    })
  .catch((err)=>{
    console.log(`${err},карточки отображаем только после получения Id, id неполучен, нельзя создать карточки`);
  });
  runClosePopUpLogic({//логика закрытия попапов
    popUpClass,
    popUpCloseButton
  });
  runEditLogic({//логика попап редактирования профиля
    buttonEditSave,
    popUpEdit,
    formEdit,
    buttonOpenEdit,
    newName,
    newStatus,
    profileName,
    profileStatus
  });
  runAvatarChange({//логика попап редактирования аватара
    buttonAvatarChangeSave,
    formAvatarChange,
    popUp: popUpAvatarChange,
    buttonOpenAvatarChange,
    newAvatarSrc,
    currentAvatarSrc
  })
  enableValidation({//валидация
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  });
}
runSiteLogic();//запуск обработчиков

