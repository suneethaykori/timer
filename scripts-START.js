let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    //clear any existing timers
    clearInterval(countdown);


    const now = Date.now();
    const then = now + seconds * 1000;
    //console.log({now, then});
    displayTimeLeft(seconds);
    displayEndTime(then);

    //every single second need to display the amount of time left. run every sec which is 10,000 milisecond
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it!
        if(secondsLeft <= 0){
            //return;// this is will stop where the timer ends. in order to not stop, create a global var countdown and clear this.
            clearInterval(countdown);
            return;
        }
        //console.log(secondsLeft);
        displayTimeLeft(secondsLeft);
    }, 1000);
}

// setInterval runs after a sec is elapsed if 5 secs it will run after a sec and start from 4, so displayTimeLeft fun is used to start immediately
function displayTimeLeft(seconds){
    //console.log(seconds); 
    const minutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;
    const display = (`${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds} `);
    //console.log(display);
    timerDisplay.textContent = display;
    document.title = display;
    //console.log({minutes, reminderSeconds});
}

function displayEndTime(timestamp){
    const end = new Date(timestamp); // creating a new date object from the timestamp and get the hours
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back at ${hour >12 ? hour-12 : hour}:${minutes <10 ? '0' : ''}${minutes}`;
}

function startTimer(){
    //onsole.log(this.dataset.time); // this.dataset will give a object with a time onit. this.dataset.time will give a string of number of minutes;
    const seconds = parseInt(this.dataset.time);
    //console.log(seconds);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();

});
