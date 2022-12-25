import '../index.css';
import {photoCardLogic} from "./card";
import {closePopUpLogic,editLogic,addLogic} from "./modal";
import {enableValidation} from "./validate";
function SiteLogic(){//логика
  closePopUpLogic();//логика закрытия попапов
  photoCardLogic()//логика фотокарточек
  editLogic();//логика попап редактирования профиля
  addLogic();//логика попап создания фотокарточек
  enableValidation({//валидация
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button-box',
    inactiveButtonClass: 'form__save-button-box_inactive',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error-message_active'
  });
}
SiteLogic();//запуск обработчиков