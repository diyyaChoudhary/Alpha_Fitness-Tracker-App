let activities = JSON.parse(localStorage.getItem("activities")) || [];

displayActivities();

function addActivity() {

    const activity = document.getElementById("activity").value.trim();
    const duration = document.getElementById("duration").value;
    const calories = document.getElementById("calories").value;

    if (activity === "" || duration === "" || calories === "") {
        alert("Please fill all fields.");
        return;
    }

    const newActivity = {
        activity: activity,
        duration: Number(duration),
        calories: Number(calories),
        date: new Date().toLocaleString()
    };

    activities.push(newActivity);

    saveData();

    document.getElementById("activity").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("calories").value = "";

    displayActivities();
}

function displayActivities() {

    const list = document.getElementById("activityList");

    list.innerHTML = "";

    let totalMinutes = 0;
    let totalCalories = 0;

    activities.forEach((item, index) => {

        totalMinutes += item.duration;
        totalCalories += item.calories;

        list.innerHTML += `
        <li>
            <div>
                <strong>${item.activity}</strong><br>
                🕒 ${item.duration} min | 🔥 ${item.calories} Calories
                <br>
                <small>📅 ${item.date}</small>
            </div>

            <button class="deleteBtn" onclick="deleteActivity(${index})">
                Delete
            </button>
        </li>
        `;
    });

    document.getElementById("totalActivities").innerText = activities.length;
    document.getElementById("totalMinutes").innerText = totalMinutes;
    document.getElementById("totalCalories").innerText = totalCalories;

    const goal = 500;

    let percentage = (totalCalories / goal) * 100;

    if (percentage > 100) {
        percentage = 100;
    }

    document.getElementById("progressBar").style.width = percentage + "%";

    document.getElementById("progressText").innerText =
        `${totalCalories} / ${goal} Calories`;
}

function deleteActivity(index) {

    activities.splice(index, 1);

    saveData();

    displayActivities();
}

function saveData() {

    localStorage.setItem("activities", JSON.stringify(activities));

}