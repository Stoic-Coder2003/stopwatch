// Get references to the HTML elements
const timeDisplay = document.querySelector("#container");
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");

// Initialize variables to track time and state
let startTime = 0; // Store the start time when the timer is running
let elapsedTime = 0; // Store the elapsed time
let currentTime = 0; // Store the current time (not used in this code)
let paused = true; // Flag to indicate if the timer is paused or not
let intervalId; // Store the interval ID to clear later
let hrs = 0; // Hours part of the time
let mins = 0; // Minutes part of the time
let secs = 0; // Seconds part of the time

// Event listener for the "Start" button
startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime; // Calculate the starting time minus elapsed time
        /*
In the given code, `Date.now() - elapsedTime` is used to calculate the start time of the timer when the "Start" button is clicked. Let me break down how this works:
1. `Date.now()` returns the current timestamp in milliseconds since the Unix epoch (January 1, 1970). This value represents the current time when the
"Start" button is clicked.
2. `elapsedTime` is a variable that holds the accumulated elapsed time since the timer started. It represents the time that has passed since the timer
was last paused or reset.
3. When the "Start" button is clicked, the code calculates the time that has already passed during any previous runs of the timer by subtracting `elapsedTime` from the current timestamp.
This essentially "resets" the start time to account for the time that has already elapsed before the current run of the timer.
Let's say the timer was started and ran for 10 seconds before being paused. When you click the "Start" button again,
`elapsedTime` would be 10000 milliseconds (10 seconds). By subtracting this value from the current timestamp, you effectively set the `startTime` to
the point where the timer should start counting from.

Here's a simple example to illustrate:

```plaintext
Initial state: startTime = 0, elapsedTime = 0

1. Timer starts (start button clicked)
   - Current timestamp: 10000 ms (let's assume)
   - elapsedTime = 0
   - startTime = 10000 - 0 = 10000

2. Timer runs for 5 seconds
   - Current timestamp: 15000 ms (let's assume)
   - elapsedTime = 15000 - 10000 = 5000 ms (5 seconds)

3. Timer is paused
   - elapsedTime = 5000 ms

4. Timer starts again (start button clicked)
   - Current timestamp: 22000 ms (let's assume)
   - elapsedTime = 5000 ms
   - startTime = 22000 - 5000 = 17000 (to account for the time that already passed)

And so on...
```

By using `Date.now() - elapsedTime`, you ensure that the timer starts counting from the correct point in time,
accounting for any time that has already elapsed during previous runs of the timer.
         */
        intervalId = setInterval(updateTime, 75); // Start updating time every 75 milliseconds
    }
});

// Event listener for the "Pause" button
pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime; // Calculate elapsed time when pausing
        clearInterval(intervalId); // Clear the interval to stop updating time
    }
});

// Event listener for the "Reset" button
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId); // Clear the interval
    startTime = 0; // Reset start time
    elapsedTime = 0; // Reset elapsed time
    currentTime = 0; // Reset current time (not used)
    hrs = 0; // Reset hours
    mins = 0; // Reset minutes
    secs = 0; // Reset seconds
    timeDisplay.textContent = "00:00:00"; // Update the display to show "00:00:00"
});

// Function to update the time display
function updateTime() {
    elapsedTime = Date.now() - startTime; // Calculate elapsed time

    // Calculate hours, minutes, and seconds
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    // Add leading zeros to single-digit seconds, minutes, and hours
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    // Update the time display
    timeDisplay.textContent = `${hrs}:${mins}:${secs} `;

    // Function to pad a number with a leading zero if needed
    function pad(unit) {
        return unit.toString().length > 1 ? unit : "0" + unit;
    }
}
