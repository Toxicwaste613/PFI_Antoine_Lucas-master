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
    let url = apiBaseURL + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

//---------------------------------------------------------------
//-------------          IMAGE     ------------------------------
//---------------------------------------------------------------
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


//---------------------------------------------------------------
//-------------          USER      ------------------------------
//---------------------------------------------------------------
// POST: accounts/register body payload[{"Id": 0, "Name": "...", "Email": "...", "Password": "..."}]
function PostUser(data, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (newData) => { successCallBack(newData.Id) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


function PutUser(bookmark, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "/" + bookmark.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(bookmark),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


function DeleteUser(id, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "/" + id,
        type: 'DELETE',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


function verifyUser(verifyUser, successCallBack, errorCallBack) {
    console.log(verifyUser);
    $.ajax({
        url: hostURL + "accounts/verify?id=" + verifyUser.Id + "&code=" + verifyUser.VerifyCode,
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(verifyUser),
        success: (verifyUser) => { StoreToken(verifyUser); successCallBack(verifyUser); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


function editUser(user, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "accounts/modify",
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (changedUser) => { successCallBack(changedUser.Id) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


//---------------------------------------------------------------
//-------------          TOKEN     ------------------------------
//---------------------------------------------------------------
function DeleteToken() {
    localStorage.removeItem('token');
}


function StoreToken(tokeninfo) {
    localStorage.setItem('token', tokeninfo.Access_token);
}




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


function login(credentials, successCallBack, errorCallBack) {
    console.log(credentials);
    $.ajax({
        url: hostURL + "token", // "token" va devenir l<information du token creer
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(credentials),
        success: (tokenInfo) => {
            StoreToken(tokenInfo);
            getUserInfo(tokenInfo.UserId, successCallBack, errorCallBack);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function logout(credentials, successCallBack, errorCallBack) {
    console.log(credentials);
    $.ajax({
        url: hostURL + "token", // "token" va devenir l<information du token creer
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(credentials),
        success: (tokenInfo) => {
            DeleteToken();
            successCallBack();
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}