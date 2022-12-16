const apiBaseURL = "https://pfi-antoine-lucas.glitch.me/api/images";
const hostURL = "https://pfi-antoine-lucas.glitch.me/";

function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
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

function GET_ID_IMAGE(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function GET_ALL_IMAGES(successCallBack, errorCallBack, queryString = null) {
    let url = apiBaseURL + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

//---------------------------------------------------------------
//-------------          USER      ------------------------------
//---------------------------------------------------------------
// POST: accounts/register body payload[{"Id": 0, "Name": "...", "Email": "...", "Password": "..."}]
function PostUser(data, successCallBack1, errorCallBack) {
    console.log(data);
    $.ajax({
        url: hostURL + "accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (newData) => { successCallBack1(newData.Id) },
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
        type: 'GET',
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
        //data: JSON.stringify(verifyUser),
        success: (verifyUser) => { StoreToken(verifyUser); successCallBack(verifyUser); /*localStorage.removeItem("user") */ },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


function editUser(user, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "accounts/modify" /*+ user.Id*/,
        type: 'PUT',
        headers: getBearerAuthorizationToken(),
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: () => {
            //sessionStorage.setItem('user', userEdited);
            successCallBack();

        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


function GET_ID_USER(id, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "accounts/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function GET_ALL_USERS(successCallBack, errorCallBack, queryString = null) {
    let url = hostURL + "accounts/" + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

//---------------------------------------------------------------
//-------------          TOKEN     ------------------------------
//---------------------------------------------------------------
function DeleteToken() {
    //localStorage.removeItem('token');
    sessionStorage.removeItem('token');
}


function StoreToken(tokeninfo) {
    //localStorage.setItem('token', tokeninfo.Access_token);
    sessionStorage.setItem('token', tokeninfo.Access_token);
}

function retrieveToken() {
    return localStorage.getItem('token');
}

function getBearerAuthorizationToken() {
    return { 'Authorization': 'Bearer ' + retrieveToken() };
}

function getUserInfo(userId, successCallBack, errorCallBack) {
    $.ajax({
        url: hostURL + "accounts/index/" + userId,
        type: 'GET',
        success: (userInfo) => {
            //localStorage.setItem('user', JSON.stringify(userInfo));
            sessionStorage.setItem('user', JSON.stringify(userInfo));
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
        url: hostURL + "accounts/logout/" + credentials.id, // "token" va devenir l<information du token creer
        type: 'GET',
        contentType: 'application/json',
        //data: JSON.stringify(credentials),
        success: (tokenInfo) => {
            DeleteToken(tokenInfo);
            successCallBack();
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}