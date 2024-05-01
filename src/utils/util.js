function generateTimeSlots(start_time, end_time, duration) {
  const timeSlots = []
  const startTime = new Date(`01/01/2000 ${start_time}`)
  const endTime = new Date(`01/01/2000 ${end_time}`)

  while (startTime < endTime) {
    const startTimeString = startTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    startTime.setMinutes(startTime.getMinutes() + duration)
    const endTimeString = startTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    timeSlots.push({
      id: timeSlots.length + 1,
      startTime: startTimeString,
      endTime: endTimeString,
    })
  }

  return timeSlots
}

function getTodayDay() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayIndex = today.getDay();
    const todayDay = daysOfWeek[dayIndex];

    return todayDay.toLowerCase();
}

function convertTimeToMinutes(timeString) {
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);

  const totalMinutes = (hours * 60) + minutes + (seconds / 60);
  return totalMinutes;
}

export { generateTimeSlots,getTodayDay,convertTimeToMinutes }
