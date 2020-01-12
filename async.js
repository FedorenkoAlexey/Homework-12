var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var usersData = "https://jsonplaceholder.typicode.com/users";
var usersPost = "https://jsonplaceholder.typicode.com/posts?userId=1";
var usersComment = "https://jsonplaceholder.typicode.com/comments?postId=1";
var btn = document.getElementById("getUser");
var list = document.getElementById("list-group");
var postList = document.getElementById("post-list");
var comments = document.getElementById("comment-list");
var message = document.getElementById("message");
var comResult;
var countCom = null;
var users$ = Rx.Observable.create(function (obs) {
    btn.onclick = function () {
        obs.next(getUsersData());
    };
});
users$.subscribe(function () {
    getComment();
    var posts$ = Rx.Observable.create(function (obsr) {
        list.onclick = function () {
            obsr.next(show(), console.log("post"));
        };
    });
    posts$.subscribe(function () {
        postList.onclick = function () {
            showComment(comResult), console.log("comm");
        };
    });
    posts$.unsubscribe;
});
function request(GET, url) {
    return new Promise(function (succes, fals) {
        var xhr = new XMLHttpRequest();
        xhr.open(GET, url);
        xhr.onload = succes;
        xhr.onerror = fals;
        xhr.send();
    });
}
function getUsersData() {
    return __awaiter(this, void 0, void 0, function () {
        var resultUser, resUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request("GET", usersData)];
                case 1:
                    resultUser = _a.sent();
                    resUser = JSON.parse(resultUser.target.response);
                    try {
                        list.innerHTML = " ";
                        resUser.forEach(function (users) {
                            var field = document.createElement("button");
                            field.classList.add("list-group-item", "btn-post");
                            field.classList.add("list-group-item-action");
                            field.id = "user_id" + users.id;
                            field.textContent = users.name;
                            list.appendChild(field);
                        });
                        message.innerHTML = "Request Users succes";
                    }
                    catch (_b) {
                        message.innerHTML = "Request failed";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function show() {
    postList.innerHTML = " ";
    getUsersPost();
}
function getUsersPost() {
    return __awaiter(this, void 0, void 0, function () {
        var resultPost, resPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request("GET", usersPost)];
                case 1:
                    resultPost = _a.sent();
                    resPost = JSON.parse(resultPost.target.response);
                    try {
                        resPost.forEach(function (post) {
                            var li = document.createElement("button");
                            li.classList.add("list-group-item");
                            li.classList.add("d-flex");
                            li.classList.add("justify-content-between");
                            li.classList.add("align-items-center");
                            li.textContent = post.title;
                            postList.appendChild(li);
                            var span = document.createElement("span");
                            span.classList.add("badge-pill");
                            span.classList.add("spinner-border", "float-right");
                            span.id = "post";
                            span.textContent = null;
                            li.appendChild(span);
                            setTimeout(function () {
                                span.classList.remove("spinner-border", "float-right");
                                span.classList.add("badge", "badge-primary");
                                span.textContent += countCom;
                            }, 1000);
                        });
                        message.innerHTML = "Request Posts succes";
                    }
                    catch (_b) {
                        message.innerHTML = "Request failed";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getComment() {
    return __awaiter(this, void 0, void 0, function () {
        var resCom, count_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request("GET", usersComment)];
                case 1:
                    resCom = _a.sent();
                    comResult = JSON.parse(resCom.target.response);
                    try {
                        count_1 = 0;
                        comResult.forEach(function (comm) {
                            count_1 += comm.postId;
                        });
                        countCom = count_1;
                    }
                    catch (_b) {
                        message.innerHTML = "Request failed";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function showComment(resultComment) {
    comments.innerHTML = " ";
    resultComment.forEach(function (comm) {
        var field = document.createElement("p");
        field.classList.add("list-group-item");
        field.classList.add("list-group-item-action");
        field.textContent = comm.name;
        comments.appendChild(field);
    });
    message.innerHTML = "Request Comments succes";
}
