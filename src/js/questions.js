// Variables for fetching question APIs
let url = "https://would-you-rather-api.abaanshanid.repl.co/"
const questionsPara = document.querySelector('.questions--para');
const questionBtn = document.querySelector('.questions--btn');
// Questions API function block
questionBtn.addEventListener('click',() => {
    fetchQuestions();
})

async function fetchQuestions() {
    const response = await fetch(url);
    const data = await response.json();

    questionsPara.textContent = data.data;
    console.log(data.data)
}

// variables for menuToggle 
const menuBtn = document.querySelector('.menu-toggle');
const header = document.querySelector('.header');

// Burger menu function
let isHeaderOpen = false;
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    if(!isHeaderOpen) {
        header.style.left = '0'
        isHeaderOpen = true;
    } else if (isHeaderOpen) {
        header.style.left = '-500px'
        isHeaderOpen = false;
    }
})

let themeBtn = document.querySelector('.theme');

// LOCAL STORAGE AND DARK MODE
let darkMode = localStorage.getItem('darkMode');

const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', null);
}

if(darkMode === 'enabled') {
    enableDarkMode();
}

themeBtn.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    if(darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})
