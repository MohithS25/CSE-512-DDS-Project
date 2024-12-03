// src/app/utils/api.ts

export const getDoctorAvailability = async (
    hospitalName: string,
    departmentName: string,
    doctorName: string
  ) => {
    try {
      const response = await fetch('http://localhost:8000/get-doctor-availability/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospitalName,
          departmentName,
          doctorName,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch doctor availability');
      }
  
      const data = await response.json();
      return data; // Assuming the API response is structured with doctor availability data
    } catch (error) {
      console.error('Error fetching doctor availability:', error);
      throw error; // Re-throw the error for handling at the call site
    }
  };
  