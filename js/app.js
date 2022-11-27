function sendPost() {
    axios
        .request({
            url: "https://jsonplaceholder.typicode.com/posts/1/comments",
            method: `POST`,
            data: {
                title: document.getElementById(`postTitle`).value,
                body: document.getElementById(`postBody`).value,
                userId: document.getElementById(`userId`).value,
            },
        })
        .then(postSuccess)
        .catch(postFailure);
}

function postSuccess(response) {
    let data = response.data;
    Cookies.set(`sessionData`, data);
    document.getElementById(`postResults`).innerHTML = `<h4>Hello ${data.userId}, your review titled "${data.title}", has been successfully submitted! Thanks for your feedback.</h4>`;
    document.getElementById(`reviewBox`).innerHTML = `<h3>${data.body}</h3>`;
}

function postFailure(error) {
    console.log(error);
    document.getElementById(`postResults`).innerHTML = `<h3>Something went wrong. Your feedback is important to us. Please try again later.</h3>`;
}

function updatePost() {
    axios
        .request({
            url: "https://jsonplaceholder.typicode.com/posts/1/",
            method: `PATCH`,
            data: {
                title: document.getElementById(`postTitle`).value,
                body: document.getElementById(`postBody`).value,
            },
        })
        .then(patchSuccess)
        .catch(patchFailure);
}

function patchSuccess(response) {
    clearResults();
    let update = response.data;
    console.log(update);
    document.getElementById(`postResults`).insertAdjacentHTML(`beforeend`, `<h3> Your review has been updated: ${update.title}.</h3>`);
    document.getElementById(`reviewBox`).insertAdjacentHTML(`afterbegin`, `<h4>${update.body}</h4>`);
}

function patchFailure(error) {
    console.log(error);
    document.getElementById(`postResults`).innerHTML = `<h3>Something went wrong. Your feedback is important to us. Please try again later.</h3>`;
}

function deletePost() {
    axios
        .request({
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: `DELETE`,
            data: {
                title: document.getElementById(`postTitle`).value,
                body: document.getElementById(`postBody`).value,
                userId: document.getElementById(`userId`).value,
            },
        })
        .then(deleteSuccess)
        .catch(deleteFailure);
}

function deleteSuccess(response) {
    clearPost();
    clearResults();
    document.getElementById(`userId`).value = "";
    document.getElementById(`postResults`).innerHTML = `<h3>Your info has successfully been deleted.</h3>`;
    document.getElementById(`post`).innerHTML = "";
    document.getElementById(`commentary`).innerHTML = "";
}

function deleteFailure(error) {
    console.log(error);
    document.getElementById(`postResults`).innerHTML = `<h3>Something went wrong. Your feedback is important to us. Please try again later.</h3>`;
}

window.onload = function getPost() {
    axios
        .request({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: `GET`,
        })
        .then(getSuccess)
        .catch(getFailure);
};

function addComments() {
    axios
        .request({
            url: "https://jsonplaceholder.typicode.com/posts/1/comments",
            method: `GET`,
            data: {
                comments: [
                    {
                        // postID: '...',
                        // id: '...',
                        // name: '...',
                        // email: '...',
                        // body: '...',
                    },
                ],
            },
        })
        .then(commentSuccess)
        .catch(commentFailure);
}

function getSuccess(response) {
    // addComments();
    let posts = response.data;
    for (let post of posts) {
        document.getElementById(`post`).insertAdjacentHTML(`afterbegin`, `<p>Review Title:${post.title} <br> Review: ${post.body} <br> User: ${post.userId}</p>`);
    }
    addComments();
}

function commentSuccess(response) {
    let data = response.data;
    for (let comment of data) {
        document.getElementById(`commentary`).insertAdjacentHTML(`beforeend`, `<p>Comments: <br>Post ID: ${comment[`postId`]} <br> Name: ${comment[`name`]} <br>${comment[`body`]}</p>`);
    }
}

function getFailure(error) {
    console.log(error);
    document.getElementById(`postResults`).innerHTML = `<h3>Something went wrong. Your feedback is important to us. Please try again later.</h3>`;
}

function commentFailure(error) {
    console.log(error);
    document.getElementById(`postResults`).innerHTML = `<h3>Something went wrong. Your feedback is important to us. Please try again later.</h3>`;
}

function clearPost() {
    document.getElementById(`postTitle`).value = "";
    document.getElementById(`postBody`).value = "";
}

function clearResults() {
    document.getElementById(`postResults`).innerHTML = "";
    document.getElementById(`reviewBox`).innerHTML = "";
}

document.getElementById(`submit`).addEventListener(`click`, sendPost);
document.getElementById(`updatePost`).addEventListener(`click`, updatePost);
document.getElementById(`clearPost`).addEventListener(`click`, clearPost);
document.getElementById(`deleteAll`).addEventListener(`click`, deletePost);

