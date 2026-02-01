/* -------------------- STATE -------------------- */
let counter = 0;
let history = [];

const counterEl = document.getElementById("counter");
const historyList = document.getElementById("historyList");

/* -------------------- LOAD FROM LOCAL STORAGE -------------------- */
function loadState() {
  const savedCounter = localStorage.getItem("counterValue");
  const savedHistory = localStorage.getItem("counterHistory");

  if (savedCounter !== null) counter = Number(savedCounter);
  if (savedHistory) history = JSON.parse(savedHistory);

  updateCounterUI();
  renderHistory();
}

/* -------------------- SAVE TO LOCAL STORAGE -------------------- */
function saveState() {
  localStorage.setItem("counterValue", counter);
  localStorage.setItem("counterHistory", JSON.stringify(history));
}

/* -------------------- UPDATE COUNTER UI -------------------- */
function updateCounterUI() {
  counterEl.textContent = counter;

  counterEl.classList.remove("positive", "negative", "zero");
  if (counter > 0) counterEl.classList.add("positive");
  else if (counter < 0) counterEl.classList.add("negative");
  else counterEl.classList.add("zero");

  counterEl.classList.add("bump");
  setTimeout(() => counterEl.classList.remove("bump"), 150);
}

/* -------------------- HISTORY -------------------- */
function addHistory(action) {
  const entry = {
    value: counter,
    action,
    time: new Date().toLocaleTimeString(),
  };

  history.unshift(entry);
  saveState();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";

  history.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      item.value > 0 ? "positive" : item.value < 0 ? "negative" : "zero";

    li.innerHTML = `
          <span>${item.action}: ${item.value}</span>
          <span>${item.time}</span>
        `;

    historyList.appendChild(li);
  });
}

/* -------------------- ACTIONS -------------------- */
function increment() {
  counter++;
  updateCounterUI();
  addHistory("Increment");
}

function decrement() {
  counter--;
  updateCounterUI();
  addHistory("Decrement");
}

function reset() {
  counter = 0;
  updateCounterUI();
  addHistory("Reset");
}

/* -------------------- EVENTS -------------------- */
document.querySelector(".btn-inc").addEventListener("click", increment);
document.querySelector(".btn-dec").addEventListener("click", decrement);
document.querySelector(".btn-reset").addEventListener("click", reset);

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") increment();
  if (e.key === "ArrowDown") decrement();
  if (e.key.toLowerCase() === "r") reset();
});

/* -------------------- INIT -------------------- */
loadState();
