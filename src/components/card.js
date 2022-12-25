import {openPopUp,newElement} from "./utils";
const initialCards = [//отображаем следующие карточки при загрузке страницы 
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
function defaultElements(){//загрузка элементов фотокарточек с таблицы по-умолчанию
  for(let i=0;i<initialCards.length;i++){
    document.querySelector('.elements').prepend(newElement(initialCards[i].name,initialCards[i].link));
  }
};
function likePress(evt){//изменение статуса like
  evt.target.classList.toggle("element__like_liked");
};
function displayImg(evt,popUpPhotocard){
  const photocardName = popUpPhotocard.querySelector(".pop-up__photocard-name");//фото с попапа фотокарточки
  const photocardImg = popUpPhotocard.querySelector(".pop-up__photocard-img");//поле описания с попапа фотокарточки
  photocardName.textContent=evt.target.closest(".element").querySelector(".element__name").textContent;
  photocardImg.setAttribute("src", evt.target.getAttribute('src'));
  photocardImg.setAttribute("alt", evt.target.getAttribute('alt'));
  openPopUp(popUpPhotocard);
};
function photoCardLogic(){//логика Фотокарточек
  const ElementsSection =document.querySelector(".elements");
  ElementsSection.addEventListener('click',(evt)=>{//грид фотокарточек
    const sourceClass= evt.target.classList;
    const popUpPhotocard =document.querySelector(".pop-up_container_photocard");
    if (sourceClass.contains("element__trash")){//click корзина
      evt.target.closest(".elements__child").remove();}
    else if (sourceClass.contains("element__photo")){//click картинки
      displayImg(evt,popUpPhotocard);}
    else if (sourceClass.contains("element__like")){//click like
      likePress(evt);}
  });
  defaultElements();//запуск фукции загрузки фотокарточек по-умолчанию
};
export {initialCards,defaultElements,likePress,photoCardLogic};