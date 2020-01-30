const usersData = "https://jsonplaceholder.typicode.com/users";
const usersPost = "https://jsonplaceholder.typicode.com/posts?userId=1";
const usersComment =
  "https://jsonplaceholder.typicode.com/comments?postI222d=1";

const btn = document.getElementById("getUser");
const list = document.getElementById("list-group");
const postList = document.getElementById("post-list");
const comments = document.getElementById("comment-list");
const message = document.getElementById("message");

type response<T> = {
  data: Array<T>;
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

let comResult: response<Array<Comment>>;
let countCom: number = null;

const users$ = Rx.Observable.create(function(obs: object) {
  btn.onclick = () => {
    console.log("start");
    obs.next(getUsersData());
  };
});

users$.subscribe(() => {
  getComment();
  const posts$ = Rx.Observable.create(function(obsr: object) {
    list.onclick = () => {
      obsr.next(show(), console.log("post"));
    };
  });

  posts$.subscribe(() => {
    postList.onclick = () => {
      showComment(comResult), console.log("comm");
    };
  });
});

function request(GET, url: string) {
  return new Promise((succes, fals) => {
    const xhr = new XMLHttpRequest();
    xhr.open(GET, url);
    xhr.onload = succes;
    xhr.onerror = fals;
    xhr.send();
  });
}

async function getUsersData() {
  const resultUser = await request("GET", usersData);
  const resUser: response<Array<User>> = JSON.parse(resultUser.target.response);
  try {
    list.innerHTML = " ";
    resUser.forEach((users: User) => {
      const field = document.createElement("button");
      field.classList.add("list-group-item", "btn-post");
      field.classList.add("list-group-item-action");
      field.id = "user_id" + users.id;
      field.textContent = users.name;
      list.appendChild(field);
    });
    message.innerHTML = "Request Users succes";
  } catch {
    message.innerHTML = "Request failed";
  }
}

function show() {
  postList.innerHTML = " ";
  getUsersPost();
}

async function getUsersPost() {
  const resultPost = await request("GET", usersPost);
  const resPost: response<Array<Post>> = JSON.parse(resultPost.target.response);
  try {
    resPost.forEach((post: Post) => {
      const li = document.createElement("button");
      li.classList.add("list-group-item");
      li.classList.add("d-flex");
      li.classList.add("justify-content-between");
      li.classList.add("align-items-center");
      li.textContent = post.title;
      postList.appendChild(li);
      const span = document.createElement("span");
      span.classList.add("badge-pill");
      span.classList.add("spinner-border", "float-right");
      span.id = "post";
      span.textContent = null;
      li.appendChild(span);

      setTimeout(() => {
        span.classList.remove("spinner-border", "float-right");
        span.classList.add("badge", "badge-primary");
        span.textContent += countCom;
      }, 1000);
    });
    message.innerHTML = "Request Posts succes";
  } catch {
    message.innerHTML = "Request failed";
  }
}

async function getComment() {
  let resCom = await request("GET", usersComment);
  comResult = JSON.parse(resCom.target.response);
  try {
    let count = 0;
    comResult.forEach((comm: Comment) => {
      count += comm.postId;
    });
    countCom = count;
  } catch {
    message.innerHTML = "Request failed";
  }
}

function showComment(resultComment: response<Array<Comment>>) {
  comments.innerHTML = " ";
  resultComment.forEach((comm: Comment) => {
    const field = document.createElement("p");
    field.classList.add("list-group-item");
    field.classList.add("list-group-item-action");
    field.textContent = comm.name;
    comments.appendChild(field);
  });
  message.innerHTML = "Request Comments succes";
}
