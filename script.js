let startTime = 0;
let running = false;
let elapsed = 0;
let timerInterval;
let lastLapTime = 0; // Store the last lap time in milliseconds

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const centiseconds = Math.floor((diff % 1000) / 10);
  document.getElementById('time').textContent =
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(centiseconds).padStart(2, '0')}`;
}

function toggleTimer() {
  if (!running) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    running = true;
  } else {
    clearInterval(timerInterval);
    elapsed += Date.now() - startTime;
    running = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  startTime = 0;
  elapsed = 0;
  document.getElementById('time').textContent = "00:00.00";

  // Clear the partial list
  const partialList = document.getElementById('partialList');
  partialList.innerHTML = '';

  // Reset the last lap time
  lastLapTime = 0;
}

function markPartial() {
  const time = document.getElementById('time').textContent;
  const partialOverlay = document.getElementById('partialOverlay');
  const partialValue = document.getElementById('partialValue');
  const partialList = document.getElementById('partialList');

  // Convert the current time to milliseconds
  const [minutes, seconds, milliseconds] = time.split(/[:.]/).map(Number);
  const currentTime = minutes * 60000 + seconds * 1000 + milliseconds;

  // Calculate the lap time
  const lapTime = currentTime - lastLapTime;
  lastLapTime = currentTime;

  // Format the lap time to a reduced format (e.g., 5.2 for 5 seconds and 200 milliseconds)
  const lapSeconds = Math.floor(lapTime / 1000);
  const lapMilliseconds = Math.floor((lapTime % 1000) / 100); // Only show tenths of a second
  const formattedLapTime = `${lapSeconds}.${lapMilliseconds}`;

  // Display the reduced lap time in the center
  partialValue.textContent = formattedLapTime;
  partialOverlay.classList.remove('hidden');

  setTimeout(() => {
    partialOverlay.classList.add('hidden');
  }, 5000);

  // Add the reduced lap time to the list
  const listItem = document.createElement('li');
  listItem.textContent = formattedLapTime;
  partialList.appendChild(listItem);
}
