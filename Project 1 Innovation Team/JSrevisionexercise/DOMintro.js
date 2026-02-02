// 1. SELECTING ELEMENTS FROM THE DOM

// Select by ID
const title = document.getElementById("title");

// Select by class
const buttons = document.getElementsByClassName("btn");

// Select first matching element
const message = document.querySelector(".message");

// Select all matching elements
const paragraphs = document.querySelectorAll("p");

//Too muvh info omggggg

// 2. CHANGING CONTENT

title.textContent = "Welcome to My Web App";
message.innerHTML = "<strong>This text was added using DOM</strong>";


// 3. CHANGING STYLES

title.style.color = "blue";
title.style.fontSize = "24px";


// 4. ADDING AN EVENT LISTENER

const clickBtn = document.getElementById("clickBtn");

clickBtn.addEventListener("click", function () {
  alert("Button clicked!");
});


// 5. CREATING AND ADDING ELEMENTS

const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was created using JavaScript.";

document.body.appendChild(newParagraph);


// 6. REMOVING ELEMENTS

const removeBtn = document.getElementById("removeBtn");

removeBtn.addEventListener("click", function () {
  if (message) {
    message.remove();
  }
});


// 7. LOOPING THROUGH ELEMENTS

paragraphs.forEach(function (para) {
  para.style.backgroundColor = "#f0f0f0";
});
