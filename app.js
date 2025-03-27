let userName = document.querySelector("#username");
let email = document.querySelector("#email");
let num = document.querySelector("#age");
let btn1 = document.querySelector("#btn");
let listContainer = document.querySelector("#list");

btn1.addEventListener("click", function (event) {
    event.preventDefault();
    Save();
});

function validateEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function Validate() {
    if (userName.value === "" || email.value === "" || num.value === "") {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return false;
    }

    if (!validateEmail(email.value)) {
        alert("Iltimos, to'g'ri email kiriting!");
        return false;
    }

    if (isNaN(num.value) || num.value <= 0) {
        alert("Yoshingizni musbat son qilib kiriting!");
        return false;
    }
    return true;
}

function Save() {
    let nameValue = userName.value.trim();
    let emailValue = email.value.trim();
    let ageValue = num.value.trim();

    if (!Validate()) {
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let Check = users.some(user => user.name === nameValue || user.email === emailValue);

    if (Check) {
        alert("Bunday ism yoki email allaqachon mavjud!");
        return;
    }

    let user = {
        id: Date.now(),
        name: nameValue,
        email: emailValue,
        age: ageValue,
        done: false,
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    renderUsers();
}

function renderUsers() {
    listContainer.innerHTML = "";
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(user => {
        let elem = document.createElement("div");
        elem.classList.add("card");
        if (user.done) elem.id = "car";

        elem.innerHTML = `
            <h2>${user.name}</h2>
            <h4>${user.email}</h4>
            <p>${user.age}</p>
            <button class="del" onclick="deleteUser(${user.id})">Del</button>
            <button class="done" onclick="markAsDone(${user.id})">Done</button>
        `;
        listContainer.appendChild(elem);
    });
}

function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(users));

    renderUsers();
}

function markAsDone(userId) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(user => {
        if (user.id === userId) {
            user.done = !user.done;
        }
        return user;
    });
    localStorage.setItem("users", JSON.stringify(users));

    renderUsers();
}

document.addEventListener("DOMContentLoaded", renderUsers);
