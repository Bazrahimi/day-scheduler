// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });

//the code will run when DOM is fully loaded
$(document).ready(function() {
  const currentDay = dayjs().format('dddd, MMMM D, YYYY');
  //display current Day to the top of Calender
  $('#currentDay').text(currentDay);

  const container = $('.container-fluid');
  const currentHour = dayjs().hour();

 // loop through hours 10am to 5pm.
 for (let hour = 10; hour <= 17; hour++) {
  const timeBlock = $('<div>').attr('id', 'hour-' + hour).addClass('row time-block');
  container.append(timeBlock);
  console.log(container);
 
  const hourEl = $('<div>').addClass("col-2 col-md-1 hour text-center py-3").text(dayjs(hour, 'H')).format('hA');
  timeBlock.append(hourEl);

  const textarea = $('<textarea>').addClass("col-8 col-md-10 description").attr("rows", "3");
  timeBlock.append(textarea);

  const saveButton = $('<button>').addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  const saveIcon = $('<li>').addClass("fas fa-save").attr("aria-hidden", "true");
  saveBtn.append(saveIcon);
  timeBlock.append(saveButton);

  //add class to the hour
  if (hour < currentHour) {
    timeBlock.addClass('past');
  } else if (hour === currentHour) {
    timeBlock.addClass('present');
  } else if (hour > currentHour) {
    timeBlock.addClass('future')
  }
 }

 //Load saved event from local storage
 for (let i = 10; i <= 17; i++) {
  const savedEvent = localStorage.getItem('hour-' + i);
  $('#hour-' + i + " .description").val(savedEvent);
  
 }

 //add event listener to saved button
 $('.saveBtn').on('click', function() {
  const userInput = $(this).siblings('.description').val()
  const timeBlockId = $(this).parent().attr('id')

  //save to localStorage
  localStorage.setItem(timeBlockId, userInput);
 });
});


