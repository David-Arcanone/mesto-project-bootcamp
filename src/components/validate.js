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
function checkInvalidTextInput(inputList){//проверяем форму на наличие ошибок валидации
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  });
};
function toggleButtonState (inputList,buttonElement, inactiveButtonClass){//функция меняет состояние кнопки сохранить от валидации формы
  if(checkInvalidTextInput(inputList, inactiveButtonClass)){
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }else{
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};
function enableValidation(ValidationInfo){
  const formList = Array.from(document.querySelectorAll(ValidationInfo.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(ValidationInfo.inputSelector));
    const buttonElement = formElement.querySelector(ValidationInfo.submitButtonSelector);
    toggleButtonState(inputList,buttonElement,ValidationInfo.inactiveButtonClass);//начальное состояние кнопок сохранения в форме
    formElement.addEventListener("reset", ()=>{
      setTimeout(() => {
        toggleButtonState(inputList,buttonElement,ValidationInfo.inactiveButtonClass);
      }, 0);
    })
    inputList.forEach((inputElement) => {//валидация по инпутам формы
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement,ValidationInfo.inputErrorClass,ValidationInfo.errorClass);
        toggleButtonState(inputList,buttonElement,ValidationInfo.inactiveButtonClass);
      });
    });
  });
};
export {enableValidation};