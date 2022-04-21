// Variables for fetching question APIs
let urlQuestions = "https://api.aakhilv.me/fun/wyr"
let urlFacts = "https://api.aakhilv.me/fun/facts"
const questionsPara = document.querySelector('.questions--para');
const questionBtn = document.querySelector('.questions--btn');
const factsBtn = document.querySelector('.facts--btn');
// Questions API function block
questionBtn.addEventListener('click',() => {
    fetchQuestions();
});

factsBtn.addEventListener('click', () => {
    fetchFacts();
});

async function fetchQuestions() {
    const response = await fetch(urlQuestions);
    const data = await response.json();

    questionsPara.textContent = data[0];
    console.log(data)
}

async function fetchFacts() {
    const response = await fetch(urlFacts);
    const data = await response.json();

    questionsPara.textContent = data[0];
    console.log(data[0]);
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
