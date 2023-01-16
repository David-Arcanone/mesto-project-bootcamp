import {openPopUp,createNewElement, checkMyLike} from "./utils.js";
import {getAccountInfo,getInitialCards,deleteMyPhotocard,addLike, deleteLike} from "./api.js";
function renderDefaultElements(source){//загрузка элементов фотокарточек с таблицы по-умолчанию
  getInitialCards()
  .then((result)=>{result.forEach(element=>{
    source.elementsGrid.append(createNewElement({
      elementLikeSelector: `.${source.elementLikeClass}`,
      elementLikedByUserClass: source.elementLikedByUserClass,
      elementTrashSelector: source.elementTrashSelector,
      elementPhotocardSelector: source.elementPhotocardSelector,
      newImgName: element.name,
      newImgSrc: element.link,
      template: source.template,
      elementNameSelector: source.elementNameSelector,
      elementPhotoSelector: source.elementPhotoSelector,
      newId: element._id,
      elementNumberOfLikesSelector: source.elementNumberOfLikesSelector,
      likes: element.likes.length,
      liked: checkMyLike(element.likes, source.myId),
      trashFilter: (element.owner._id===source.myId)?true:false,//рендер корзины, проверяем, мы ли его создали
    }))});
  })
  .catch((err)=>{console.log(`Ошибка получения карточек с сервера. ${err}`)});
};
function pressLike(source){//изменение статуса like
  const elementNumberOfLikes= source.elementBox.querySelector(source.elementNumberOfLikesSelector);
  if(source.likeButton.classList.contains(source.elementLikedByUserClass)){
    console.log(source.elementBox.id);
    deleteLike(source.elementBox.id)
    .then((res)=>{
      source.likeButton.classList.remove(source.elementLikedByUserClass);
      elementNumberOfLikes.textContent=res.likes.length;
    })
    .catch((err)=>{console.log(`Ошибка удаления лайка. ${err}`)});
  } else{
    console.log(source.elementBox.id);
    addLike(source.elementBox.id)
    .then((res)=>{
      source.likeButton.classList.add(source.elementLikedByUserClass);
      elementNumberOfLikes.textContent=res.likes.length;
    })
    .catch((err)=>{console.log(`Ошибка лайка. ${err}`)});
  }
};
function displayImg(evt,popUpPhotocard, photocardName, photocardImg ){
  photocardName.textContent=evt.target.closest(".element").querySelector(".element__name").textContent;
  photocardImg.setAttribute("src", evt.target.getAttribute('src'));
  photocardImg.setAttribute("alt", evt.target.getAttribute('alt'));
  openPopUp(popUpPhotocard);
};
function runProfileSetting(profileSource){
  return getAccountInfo()
  .then((res)=>{
    profileSource.currentAvatarSrc.setAttribute("src",res.avatar);
    profileSource.profileName.textContent=res.name;
    profileSource.profileStatus.textContent=res.about;
    return Promise.resolve(res._id);//вытащим Id в index.js
  })
  .catch((err)=>{console.log(err);
  return Promise.reject(`Неполучен Профиль пользователя (id). ${err}`);});
};
function pressTrash(trashSource){
  deleteMyPhotocard(trashSource.id)
  .then(()=>{
    trashSource.remove();
  })
  .catch((err)=>{
    console.log(`Ошибка удаления карточки. ${err}`);
  });
}
function runBasicCardLogic(source){//логика инициализации основной страницы
  source.elementsGrid.addEventListener('click',(evt)=>{//грид фотокарточек
    const sourceClass= evt.target.classList;
    if (sourceClass.contains(source.trashClass)){//click корзина
      pressTrash(evt.target.closest(source.elementFromGridSelector));
    }
    else if (sourceClass.contains(source.elementPhotoClass)){//click картинки
      displayImg(evt,source.popUpPhotocard, source.photocardName, source.photocardImg);
    }
    else if (sourceClass.contains(source.elementLikeClass)){//click like
      evt.preventD
      pressLike({
        elementLikedByUserClass: source.elementLikedByUserClass,
        likeButton: evt.target,
        elementNumberOfLikesSelector: source.elementNumberOfLikesSelector,
        elementBox: evt.target.closest(source.elementFromGridSelector),
      });
    }
  });
  renderDefaultElements({
    elementLikeClass: source.elementLikeClass,
    myId: source.myId,
    elementLikedByUserClass:source.elementLikedByUserClass,
    elementNumberOfLikesSelector: source.elementNumberOfLikesSelector,
    elementTrashSelector: source.elementTrashSelector,
    elementPhotocardSelector: source.elementPhotocardSelector,
    elementsGrid:source.elementsGrid,
    template: source.template,
    elementNameSelector: source.elementNameSelector,
    elementPhotoSelector: source.elementPhotoSelector,
  }); 
};
export {runBasicCardLogic,runProfileSetting};