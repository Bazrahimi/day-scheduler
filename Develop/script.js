$(document).ready(function() {
  const currentDay = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDay);

 
  $(document).on('click', '.saveBtn', function() {
    const textInput = $(this).siblings(".description").val();
    const parentId = $(this).parent().attr('id');
    localStorage.setItem(parentId, textInput);
  });

  function populateTextareas() {
    const currentTime = dayjs().hour();
    const startHour = 10;
    const endHour = 17;
    const hourLabels = ['10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

    for (let hour = startHour; hour <= endHour; hour++) {
      const timeBlock = $('<div>').attr('id', `hour-${hour}`).addClass('row time-block');
      const hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hourLabels[hour - startHour]);
      const textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
      const saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      const saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

      timeBlock.attr('id', `hour-${hour}`);
      saveBtn.append(saveIcon);
      timeBlock.append(hourDiv, textarea, saveBtn);
      $('.container-lg').append(timeBlock);

      //apply past, present, future style based on current hour
      if (hour < currentTime) {
        timeBlock.addClass('past');
      } else if (hour === currentTime) {
        timeBlock.addClass('present');
      } else {
        timeBlock.addClass('future');
      }
    }

    $('.time-block').each(function() {
      const timeBlockId = $(this).attr('id');
      const savedValue = localStorage.getItem(timeBlockId);
      $(this).find('.description').val(savedValue);
    });
  }

  populateTextareas();
});
