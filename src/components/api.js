const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
    headers: {
      authorization: '53974bf9-4dd2-454a-be24-3d74e4bf4738',
      'Content-Type': 'application/json'
    }
};
function checkServerResponse(res){
    if(res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};
function getAccountInfo(){
    return fetch(`${config.baseUrl}/users/me`, {
        headers:config.headers})
        .then(checkServerResponse); 
}
function getInitialCards(){
    return fetch(`${config.baseUrl}/cards`, {
        headers:config.headers})
        .then(checkServerResponse);
}
function changeAvatar(newAvatarUrl){
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers:config.headers,
        method: 'PATCH',
        body: JSON.stringify({avatar: newAvatarUrl})
    })
        .then(checkServerResponse);
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
        .then(checkServerResponse);
}
function deleteMyPhotocard(badId){
    return fetch(`${config.baseUrl}/cards/${badId}`, {
        headers:config.headers,
        method: 'DELETE',
    })
        .then(checkServerResponse);
}
function addLike(likeId){
    return fetch(`${config.baseUrl}/cards/likes/${likeId}`, {
        headers:config.headers,
        method: 'PUT',
    })
        .then(checkServerResponse);
}
function deleteLike(likeId){
    return fetch(`${config.baseUrl}/cards/likes/${likeId}`, {
        headers:config.headers,
        method: 'DELETE',
    })
        .then(checkServerResponse);
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
        .then(checkServerResponse);
}

export{getAccountInfo,getInitialCards, changeAvatar, changeProfileInfo, deleteMyPhotocard, addLike, deleteLike, createCard};
