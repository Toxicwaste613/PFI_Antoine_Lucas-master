const apiBaseURL = "http://localhost:5000/api/images";
const hostURL = "http://localhost:5000/";

function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ID(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ALL(successCallBack, errorCallBack, queryString = null) {
    let url = apiBaseURL + "api/images" + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PostImage(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PutImage(bookmark, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + bookmark.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(bookmark),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function DeleteImage(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'DELETE',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PostUser(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PutUser(bookmark, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + bookmark.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(bookmark),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function DeleteUser(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'DELETE',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function deleteToken(){
    localStorage.removeItem('token');
}
function storeToken(tokeninfo){
    localStorage.setItem('token', tokeninfo.Access_token);
}
function createToken(){

}
//À CHANGÉ SI POSSIBLE
function getUserInfo(userId, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "accounts/index/" + userId,
        type: 'GET',
        success: (userInfo) => {
            localStorage.setItem('user', JSON.stringify(userInfo));
            successCallBack();
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}
//À CHANGÉ SI POSSIBLE
function login(credentials, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(credentials),
        success: (tokenInfo) => {
            storeToken(tokenInfo);
            getUserInfo(tokenInfo.UserId, successCallBack, errorCallBack);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}