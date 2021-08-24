// Page elements that JS interacts with
const currentDaySpan = $('#currentDay');
const timeBlockContainer = $('.container');

// Constants for the start of the workday and the end of the workday
const START_OF_WORKDAY = 9;
const END_OF_WORKDAY = 18;
// Array of schedules for each hour in day
let schedule = new Array(24).fill('');

// Code to initialize the webpage after loading;
function init() {
    // display day at top of page
    currentDaySpan.text(moment().format('MMMM D, YYYY'));
    // get schedule from localStorage, if it exists 
    const scheduleFromStorage = JSON.parse(localStorage.getItem('schedule'));
    if (scheduleFromStorage !== null) {
        schedule = scheduleFromStorage;
    }
    displaySchedule();
}

function displaySchedule() {
    timeBlockContainer.empty();
    for (let i = START_OF_WORKDAY; i < END_OF_WORKDAY; i++) {
        // create row element
        const row = $('<div></div>', {
            'class': 'row time-block',
            'id': 'tb' + i
        }).appendTo(timeBlockContainer);

        // add hour column to row
        $('<div></div>', {
            'class': 'hour col-1'
        }).text(i.toString() + ':00').appendTo(row);

        // add plans ('description') to row
        $('<textarea></textarea>', {
            'class': 'description col-10'
        }).text(schedule[i])
            .addClass(  i  <  moment().hours() ? 'past'
                      : i === moment().hours() ? 'present'
                      : 'future')
            .appendTo(row);
        
        // add save button to row
        $('<button></button>', {
            'class': 'saveBtn btn col-1',
            'type': 'button',
            'data-hour': i
        }).text('💾')
            .on('click', saveScheduleItem)
            .appendTo(row);
        
        // append row to schedule table
        //timeBlockContainer.append(row);
    }
}

function saveScheduleItem(event) {
    // get hour from event target
    const hour = parseInt(event.target.dataset.hour);

    // update array used to contain global state
    schedule[hour] = $(`#tb${hour}>textarea.description`).val();

    // update localStorage
    localStorage.setItem('schedule', JSON.stringify(schedule));

    // console.log(`Updated ${hour}:00`)
}

init();