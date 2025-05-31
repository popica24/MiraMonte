const setupBooking = () => {
  const form = document.getElementById("book-form");
  const arrivalDateElement = document.getElementById("check-in-datepicker");
  const departureDateElement = document.getElementById("checkout-date-picker");
  const adultsElement = document.getElementById("adults-count-input");
  const childrenElement = document.getElementById("children-count-input");

  if (
    !form ||
    !arrivalDateElement ||
    !departureDateElement ||
    !adultsElement ||
    !childrenElement
  )
    return;

  // Function to validate weekend booking rules
  const validateWeekendStay = (checkIn, checkOut) => {
    const arrivalDate = new Date(checkIn);
    const departureDate = new Date(checkOut);

    // Get day of week (0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday)
    const arrivalDay = arrivalDate.getDay();
    const departureDay = departureDate.getDay();

    // Calculate nights stayed
    const timeDiff = departureDate.getTime() - arrivalDate.getTime();
    const nightsStayed = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Validation rules
    if (arrivalDay === 5) {
      // Friday arrival
      if (nightsStayed < 2) {
        return {
          valid: false,
          message:
            "Rezervarile de vineri necesita minimum 2 nopti (Vineri-Duminica checkout).",
        };
      }
    }

    if (arrivalDay === 6) {
      // Saturday arrival
      if (nightsStayed < 2) {
        return {
          valid: false,
          message:
            "Rezervarile de sambata necesita minimum 2 nopti (Sambata-Luni checkout).",
        };
      }
    }

    return { valid: true };
  };

  // Function to suggest correct departure date
  const suggestCorrectDeparture = (checkIn) => {
    const arrivalDate = new Date(checkIn);
    const arrivalDay = arrivalDate.getDay();

    if (arrivalDay === 5) {
      // Friday
      const suggestedDeparture = new Date(arrivalDate);
      suggestedDeparture.setDate(arrivalDate.getDate() + 2); // Add 2 days
      return suggestedDeparture.toISOString().split("T")[0];
    }

    if (arrivalDay === 6) {
      // Saturday
      const suggestedDeparture = new Date(arrivalDate);
      suggestedDeparture.setDate(arrivalDate.getDate() + 2); // Add 2 days
      return suggestedDeparture.toISOString().split("T")[0];
    }

    return null;
  };

  // Function to display error message
  const showError = (message) => {
    // Remove existing error message
    const existingError = document.querySelector(".booking-error");
    if (existingError) {
      existingError.remove();
    }

    // Create and show new error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "booking-error";
    errorDiv.style.color = "red";
    errorDiv.style.marginTop = "10px";
    errorDiv.style.padding = "10px";
    errorDiv.style.border = "1px solid red";
    errorDiv.style.borderRadius = "4px";
    errorDiv.style.backgroundColor = "#ffebee";
    errorDiv.textContent = message;

    form.appendChild(errorDiv);
  };

  // Function to clear error messages
  const clearError = () => {
    const existingError = document.querySelector(".booking-error");
    if (existingError) {
      existingError.remove();
    }
  };

  // Auto-adjust departure date when arrival date changes
  arrivalDateElement.addEventListener("change", (e) => {
    const checkIn = e.target.value;
    const currentCheckOut = departureDateElement.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn && currentCheckOut) {
      if (new Date(checkIn) < today || new Date(currentCheckOut) < today) {
        showError("Data de check-in nu poate fi in trecut");
        return;
      }
      const validation = validateWeekendStay(checkIn, currentCheckOut);
      if (!validation.valid) {
        const suggestedDate = suggestCorrectDeparture(checkIn);
        if (suggestedDate) {
          departureDateElement.value = suggestedDate;
          showError(
            `Data plecarii a fost ajustata automat. ${validation.message}`
          );
        }
      } else {
        clearError();
      }
    }
  });

  // Validate on departure date change
  departureDateElement.addEventListener("change", () => {
    const checkIn = arrivalDateElement.value;
    const checkOut = departureDateElement.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn && checkOut) {
      if (new Date(checkIn) < today || new Date(checkOut) < today) {
        showError("Data de check-out nu poate fi in trecut");
        return;
      }
      const validation = validateWeekendStay(checkIn, checkOut);
      if (!validation.valid) {
        showError(validation.message);
      } else {
        clearError();
      }
    }
  });

  const submitBooking = async (booking) => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxT-KkfnN9b2DRayiH68WJWQfDltLtEhxy5KF11RE3p-b7a1WxUNIidZewL2TiIoXpx/exec",
        {
          method: "POST",
          body: JSON.stringify(booking),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      );

      if (response.ok) {
        const result = await response.text(); // or response.json() if your script returns JSON
        console.log("Booking submitted successfully:", result);
        return result;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      throw error;
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const arrival = arrivalDateElement.value;
    const departure = departureDateElement.value;
    const adults = adultsElement.value;
    const children = childrenElement.value;

    // Validate dates are provided
    if (!arrival || !departure) {
      showError("Te rugam sa alegi data de check-in si data de check-out.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (arrival && departure) {
      if (
        new Date(arrival) < today ||
        new Date(departure) < today ||
        new Date(arrival) > new Date(departure)
      ) {
        showError("Data de check-in sau check-out nu poate fi in trecut");
        return;
      }
    }

    // Validate weekend stay requirements
    const validation = validateWeekendStay(arrival, departure);
    if (!validation.valid) {
      showError(validation.message);
      return;
    }

    // Clear any existing errors
    clearError();

    // If validation passes, proceed with booking
    const booking = {
      arrival,
      departure,
      adults,
      children,
    };

    submitBooking(booking);
  });
};

setupBooking();
