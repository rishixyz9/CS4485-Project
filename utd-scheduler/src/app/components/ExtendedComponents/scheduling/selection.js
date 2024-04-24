const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 8; // Start from 8am
    return `${hour < 10 ? '0' : ''}${hour}:00`;
  });
  
  let selectedStartSlot = null;
  let selectedEndSlot = null;
  
  function selectTimeSlot(slot) {
    if (!selectedStartSlot) {
      selectedStartSlot = slot;
      updateSelectedSlotsDisplay();
    } else if (!selectedEndSlot && slot !== selectedStartSlot) {
      selectedEndSlot = slot;
      updateSelectedSlotsDisplay();
    } else {
      // Deselect previously selected slots
      selectedStartSlot = null;
      selectedEndSlot = null;
      updateSelectedSlotsDisplay();
    }
  }
  
  function updateSelectedSlotsDisplay() {
    if (selectedStartSlot && selectedEndSlot) {
      const startIndex = timeSlots.indexOf(selectedStartSlot);
      const endIndex = timeSlots.indexOf(selectedEndSlot);
  
      const selectedSlots = timeSlots.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1);
      console.log('Selected time slots:', selectedSlots);
    } else if (selectedStartSlot) {
      console.log('Selected time slot:', selectedStartSlot);
    } else {
      console.log('No time slots selected.');
    }
  }
  