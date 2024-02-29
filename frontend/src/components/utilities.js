export const getMonthYearDisplay = (currentStartDate) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  
    const startMonth = currentStartDate.getMonth();
    const startYear = currentStartDate.getFullYear();
    const endMonth = new Date(currentStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).getMonth();
    const endYear = new Date(currentStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).getFullYear();
  
    if (startMonth === endMonth) {
      return `${monthNames[startMonth]} ${startYear}`;
    } else if (startYear === endYear) {
      return `${monthNames[startMonth]} - ${monthNames[endMonth]} ${startYear}`;
    } else {
      return `${monthNames[startMonth]} ${startYear} - ${monthNames[endMonth]} ${endYear}`;
    }
  };
  
  export const getDatesArray = (currentStartDate) => {
    const datesArray = [];
    const currentDate = new Date(currentStartDate);
    for (let i = 0; i < 7; i++) {
      datesArray.push(new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000));
    }
    return datesArray;
  };
  
  export const generateTimeSlots = (timePeriod) => {
    let timeSlots = [];
  
    if (timePeriod === 'morning') {
      // Morning time slots (10 am to 12 pm)
      for (let hour = 10; hour < 12; hour++) {
        timeSlots.push(`${hour}:00 AM`);
        timeSlots.push(`${hour}:30 AM`);
      }
    } else if (timePeriod === 'afternoon') {
      // Afternoon time slots (12 pm to 5 pm)
      for (let hour = 12; hour < 17; hour++) {
        timeSlots.push(`${hour}:00 PM`);
        timeSlots.push(`${hour}:30 PM`);
      }
    } else if (timePeriod === 'evening') {
      // Evening time slots (5 pm to 7:30 pm)
      for (let hour = 17; hour < 19; hour++) {
        timeSlots.push(`${hour}:00 PM`);
        if (hour === 18) {
          timeSlots.push(`${hour}:30 PM`);
        }
      }
    }
  
    return timeSlots;
  };
  
  export const handleTimeSlotSelection = (slot, setSelectedDateTime, handleSlotSelect, handleNext) => {
    setSelectedDateTime(slot);
    handleSlotSelect(slot);
    handleNext();
  };
  
  export const handleCategorySelect = (category, setSelectedCategory, setStep) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
    setStep(1);
  };
  
  export const handleSubCategorySelect = (subcategory, selectedSubCategories, setSelectedSubCategories) => {
    if (selectedSubCategories[subcategory.id]) {
      // Subcategory already selected, do nothing
      return;
    }
    setSelectedSubCategories(prevState => ({
      ...prevState,
      [subcategory.id]: subcategory
    }));
  };
  
  export const removeSelectedSubCategory = (subcategory, selectedSubCategories, setSelectedSubCategories) => {
    setSelectedSubCategories(prevState => {
      const updatedState = { ...prevState };
      delete updatedState[subcategory.id];
      return updatedState;
    });
  };
  
  export const handleTimePeriodSelect = (period, setTimePeriods, prevTimePeriods) => {
    setTimePeriods(prevTimePeriods => ({
      ...prevTimePeriods,
      [period]: !prevTimePeriods[period] // Toggle the display of time slots
    }));
  };
  
  export const handleBack = (setStep, step) => {
    setStep(step - 1);
  };
  