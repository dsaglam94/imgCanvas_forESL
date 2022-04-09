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