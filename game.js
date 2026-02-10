let gameData = {
  age: 18,
  food: 100,
  city: 100,
  lastPlayed: Date.now()
};

// Load game if saved
if (localStorage.getItem("realTimeWorld")) {
  gameData = JSON.parse(localStorage.getItem("realTimeWorld"));

  let now = Date.now();
  let diffSeconds = Math.floor((now - gameData.lastPlayed) / 1000);

  // Real-time effects (offline damage)
  gameData.age += diffSeconds / 3600;   // প্রতি ঘন্টায় বয়স বাড়ে
  gameData.food -= diffSeconds / 30;    // ফসল কমে
  gameData.city -= diffSeconds / 60;    // শহর ভাঙে
}

// Limits
gameData.food = Math.max(0, Math.floor(gameData.food));
gameData.city = Math.max(0, Math.floor(gameData.city));

// UI Update
document.getElementById("age").innerText = gameData.age.toFixed(1);
document.getElementById("food").innerText = gameData.food;
document.getElementById("city").innerText = gameData.city;
document.getElementById("lastPlayed").innerText =
  new Date(gameData.lastPlayed).toLocaleString();

// Save Game
function saveGame() {
  gameData.lastPlayed = Date.now();
  localStorage.setItem("realTimeWorld", JSON.stringify(gameData));
  alert("Game Saved!");
}

// Reset Game
function resetGame() {
  if (confirm("Are you sure? World will reset.")) {
    localStorage.removeItem("realTimeWorld");
    location.reload();
  }
}
