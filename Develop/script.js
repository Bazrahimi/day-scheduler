  //the code will run after the DOM load
$(document).ready(function() {
  //get the Current using Day.js
  const currentDay = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDay);

  //Event listener for the save button
  $(document).on('click', '.saveBtn', function() {
    const textInput = $(this).siblings(".description").val();
    const parentId = $(this).parent().attr('id');
    localStorage.setItem(parentId, textInput);
  });

  //function to populate textarea
  function populateTextareas() {
    const currentTime = dayjs().hour();
    const startHour = 9;
    const endHour = 17;
    const hourLabels = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

    //loop through each hour
    for (let hour = startHour; hour <= endHour; hour++) {
      const timeBlock = $('<div>').attr('id', `hour-${hour}`).addClass('row time-block');
      const hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hourLabels[hour - startHour]);
      const textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
      const saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      const saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

      //set the time Block ID and append hour, textarea, and save button
      timeBlock.attr('id', `hour-${hour}`);
      saveBtn.append(saveIcon);
      timeBlock.append(hourDiv, textarea, saveBtn);
      $('.container-lg').append(timeBlock);

      //apply past, present and future style base on current time
      if (hour < currentTime) {
        timeBlock.addClass('past');
      } else if (hour === currentTime) {
        timeBlock.addClass('present');
      } else {
        timeBlock.addClass('future');
      }
    }
    //get the saved value from local storage 
    $('.time-block').each(function() {
      const timeBlockId = $(this).attr('id');
      const savedValue = localStorage.getItem(timeBlockId);
      $(this).find('.description').val(savedValue);
    });
  }

  populateTextareas();
});
