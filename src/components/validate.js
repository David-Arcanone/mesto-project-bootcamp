function showInputError (formElement, inputElement, errorMessage,inputErrorClass,errorClass){//показываем сообщение об ошибке
  const errorElement = formElement.querySelector(`.form__input-error-message_type_${inputElement.id}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
function hideInputError (formElement, inputElement,inputErrorClass,errorClass){//прячем сообщение об ошибке
  const errorElement = formElement.querySelector(`.form__input-error-message_type_${inputElement.id}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
function checkInputValidity (formElement, inputElement,inputErrorClass,errorClass){//проверяем состояние input
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,inputErrorClass,errorClass);}
  else {
    hideInputError(formElement, inputElement,inputErrorClass,errorClass);
  }
};
function hasInvalidInput (inputList){//проверяем форму на наличие ошибок валидации
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  });
};
function toggleButtonState (inputList,buttonElement, inactiveButtonClass){//функция меняет состояние кнопки сохранить от валидации формы
  if(hasInvalidInput(inputList, inactiveButtonClass)){
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.classList.remove("link-transition");
    buttonElement.classList.remove("link-transition_type_save");
  }else{
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.classList.add("link-transition");
    buttonElement.classList.add("link-transition_type_save");
  }
};
function enableValidation(ValidationInfo){
  const formList = Array.from(document.querySelectorAll(ValidationInfo.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(ValidationInfo.inputSelector));
    const buttonElement = formElement.querySelector(ValidationInfo.submitButtonSelector);
    toggleButtonState(inputList,buttonElement,ValidationInfo.inactiveButtonClass);//начальное состояние кнопок сохранения в форме
    inputList.forEach((inputElement) => {//валидация по инпутам формы
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement,ValidationInfo.inputErrorClass,ValidationInfo.errorClass);
        toggleButtonState(inputList,buttonElement,ValidationInfo.inactiveButtonClass);
      });
    });
  });
};
export {enableValidation};