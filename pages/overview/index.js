import { USER_LOGIN_INFO } from "../../js/constants.js";
import { createHTML, redirect } from "../../js/functions.js";

function clearUserInfo() {
    localStorage.clear()
    redirect("/pages/login/index.html")
}

function guard() {
    const userInfo = localStorage.getItem(USER_LOGIN_INFO)

    if (!userInfo) {
        redirect("/pages/login/index.html")
    }
}

guard()

const inputData = JSON.parse(localStorage.getItem(USER_LOGIN_INFO))

let newsletterSub

if (inputData.newsletter) {
    newsletterSub = "Želim se pretplatiti"
} else {
    newsletterSub = "Ne želim se pretplatiti"
}

const inputHTML = `
    <h1>Ime</h1>
    <b class="m-b-40">${inputData.name}</b>
    <h1>Prezime</h1>
    <b class="m-b-40">${inputData.surname}</b>
    <h1>Email</h1>
    <b class="m-b-40">${inputData.email}</b>
    <h1>Detalji</h1>
    <b class="m-b-40">${inputData.details}</b>
    <h1>Pretplati se na newsletter</h1>
    <b class="m-b-40">${newsletterSub}</b>
`

const overwiev = createHTML(inputHTML)

const overwievPanel = document.getElementById("overwiev-panel")
overwievPanel.append(overwiev)

const resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", clearUserInfo)