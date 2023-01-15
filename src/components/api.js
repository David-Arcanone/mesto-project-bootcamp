const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
    headers: {
      authorization: '53974bf9-4dd2-454a-be24-3d74e4bf4738',
      'Content-Type': 'application/json'
    }
};
function getAccountInfo(){
    return fetch(`${config.baseUrl}/users/me`, {
        headers:config.headers})
        .then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка получения профиля: ${res.status}`);
        });
}
function getInitialCards(){
    return fetch(`${config.baseUrl}/cards`, {
        headers:config.headers})
        .then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка загрузки карточек: ${res.status}`);
        });
}
function changeAvatar(newAvatarUrl){
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers:config.headers,
        method: 'PATCH',
        body: JSON.stringify({avatar: newAvatarUrl})
    })
        .then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка изменения аватара: ${res.status}`);
        });
}
function changeProfileInfo(newName,newStatus){
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers:config.headers,
        body: JSON.stringify({
            name:newName,
            about: newStatus
        })
    })
        .then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка изменения профиля: ${res.status}`);
        });
}
function deleteMyPhotocard(badId){
    return fetch(`${config.baseUrl}/cards/${badId}`, {
        headers:config.headers,
        method: 'DELETE',
    })
        .then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка удаления карточки: ${res.status}`);
        });
}
function addLike(likeId){
    return fetch(`${config.baseUrl}/cards/likes/${likeId}`, {
        headers:config.headers,
        method: 'PUT',
    })
        .then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка лайка: ${res.status}`);
        });
}
function deleteLike(likeId){
    return fetch(`${config.baseUrl}/cards/likes/${likeId}`, {
        headers:config.headers,
        method: 'DELETE',
    })
        .then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка удаления лайка: ${res.status}`);
        });
}
function createCard(sourceCard){
    return fetch(`${config.baseUrl}/cards`, {
        headers:config.headers,
        method: 'POST',
        body: JSON.stringify({
            name: sourceCard.name,
            link: sourceCard.link,
        })
    })
        .then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка создания карточки: ${res.status}`);
        });
}

export{getAccountInfo,getInitialCards, changeAvatar, changeProfileInfo, deleteMyPhotocard, addLike, deleteLike, createCard};
