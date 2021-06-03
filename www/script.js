const inputField = document.querySelector("#input-field");
const saveButton = document.querySelector("#save-button");
const outputField = document.querySelector("#output-field");
const resetButton = document.querySelector("#reset-button");
const averageSleep = document.querySelector(".average-sleep");
const scoreElement = document.querySelector(".score");

let sleepTotal = Number(localStorage.getItem("sleepTotal"));
if (sleepTotal == null) sleepTotal = 0;
let sleepList = [];

// Load sleep history
let localSleepString = localStorage.getItem("sleepList");
if (localSleepString != null) sleepList = localSleepString.split(",");

for (let sleepInHours of sleepList) {
  addSleepItemToList(sleepInHours);
}
calcAverageSleep();

// Add Event Listener to Submit Button
saveButton.addEventListener("click", (event) => {
  let sleepInHours = Number(inputField.value);
  inputField.value = "";

  sleepList.push(sleepInHours);

  if (sleepList.length > 5) {
    sleepList.splice(0, 1);
    let sleepElement = averageSleep.querySelector("div");
    sleepElement.remove();
  }
  localStorage.setItem("sleepList", sleepList);
  addSleepItemToList(sleepInHours);

  calcAverageSleep();
});

// Add hours slept per night in a list
function addSleepItemToList(sleep) {
  let sleepElement = document.createElement("div");
  sleepElement.innerHTML = `${sleep} hours`;
  averageSleep.append(sleepElement);
}

function calcAverageSleep() {
  let total = 0;
  for (let sleep of sleepList) {
    total += Number(sleep);
  }
  outputField.innerHTML = `You sleep an average of <br><span class="sleepAverage">${
    total / sleepList.length
  }</span><br> hours each night.`;

  scoreElement.classList.remove("hidden");
}

// Reset button to clear all data and local storage
resetButton.addEventListener("click", (event) => {
  averageSleep.innerHTML = "";
  outputField.innerHTML = "";
  scoreElement.classList.add("hidden");
  sleepList = [];
  localStorage.removeItem("sleepList");
});
