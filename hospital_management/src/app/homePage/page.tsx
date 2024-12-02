"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";
import { useHospitalContext } from "../_components/Context/HospitalContext"; // Use context
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert"; // Import Alert and AlertColor

const locations = ["Phoenix", "Tempe", "Gilbert", "Mesa", "Tucson"];

const CardComponent = () => {
  const { setHospital } = useHospitalContext(); // Access the context setter
  const [location, setLocation] = useState<string>(""); // State for location selection
  const [hospitals, setHospitals] = useState<any[]>([]); // State to store hospital data
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API request
  const [selectedHospital, setSelectedHospital] = useState<any>(null); // Store selected hospital details
  const [openHospitalModal, setOpenHospitalModal] = useState<boolean>(false); // Hospital Modal open/close state
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null); // Store selected department
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null); // Store selected doctor
  const [doctorAvailability, setDoctorAvailability] = useState<any>(null); // Store doctor availability data
  const [selectedSlots, setSelectedSlots] = useState<any[]>([]); // State to store selected slots

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success"); // Use AlertColor type for severity

  // Handle location change
  const handleLocationChange = async (event: SelectChangeEvent<string>) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);

    // Fetch hospitals for the selected location
    if (selectedLocation) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/gethospitalsdetails/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location: selectedLocation }),
        });
        const data = await response.json();

        if (response.ok) {
          setHospitals(data.data || []); // Update hospitals data with the response
        } else {
          console.error("Error fetching hospital data:", data.message);
          setHospitals([]); // Reset if no hospitals found
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setHospitals([]); // Reset on error
      } finally {
        setLoading(false);
      }
    }
  };

  // Open Hospital Modal and set selected hospital
  const handleOpenHospitalModal = (hospital: any) => {
    setSelectedHospital(hospital);
    setSelectedDepartment(null); // Reset department and doctor when new hospital is selected
    setSelectedDoctor(null);
    setDoctorAvailability(null); // Reset doctor availability
    setOpenHospitalModal(true);
  };

  // Handle department and doctor selection inside hospital modal
  const handleSelectDepartmentAndDoctor = (department: any, doctor: any) => {
    setSelectedDepartment(department);
    setSelectedDoctor(doctor);
    setDoctorAvailability(doctor.available_slots); // Show doctor's available slots immediately
  };

  // Handle checkbox change for selecting available slots
  const handleSlotChange = (slot: any) => {
    setSelectedSlots((prevSelectedSlots) => {
      if (prevSelectedSlots.includes(slot)) {
        // If the slot is already selected, remove it from the array
        return prevSelectedSlots.filter((item) => item !== slot);
      } else {
        // If the slot is not selected, add it to the array
        return [...prevSelectedSlots, slot];
      }
    });
  };

  // Handle booking the appointment by sending the selected date and time to the backend API
  const handleBookAppointment = async () => {
    if (!selectedDoctor || selectedSlots.length === 0) {
      alert("Please select a doctor and at least one slot.");
      return;
    }

    // Construct the data to be sent to the backend
    const appointmentData = selectedSlots.map((slot) => ({
      doctor_id: selectedDoctor.doctor_id,
      date: slot.available_date,
      time: slot.available_time,
    }));

    try {
      // Send the data to the book_appointment API
      const response = await fetch("http://localhost:8000/book_appointment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage("Appointment booked successfully.");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage(`Error: ${data.message}`);
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setSnackbarMessage("An error occurred while booking the appointment.");
      setSnackbarSeverity("error");
    }
    setOpenSnackbar(true); // Show snackbar after API response
  };

  return (
    <Box sx={{ p: 4, pt: 10 }}>
      {/* Location Dropdown and Location Text */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <FormLabel htmlFor="location" sx={{ marginRight: 2 }}>
          Choose Location
        </FormLabel>
        <Select
          id="location"
          value={location}
          onChange={handleLocationChange}
          displayEmpty
          sx={{ width: 200 }}
        >
          <MenuItem value="" disabled>
            Select a location
          </MenuItem>
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>

        {/* Display the selected location */}
        {location && (
          <Typography sx={{ marginLeft: 2, fontSize: "1.5rem", // Increase the font size
            textAlign: "center", // Center the text
            fontWeight: "bold",
            color: "primary.main" }}>
            You are viewing the hospitals at <strong>{location}</strong>
          </Typography>
        )}
      </Box>

      {/* Loading Indicator */}
      {loading && <Typography variant="h6">Loading hospitals...</Typography>}

      {/* Cards Grid Layout */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, marginBottom: 4 }}>
        {hospitals.length > 0 ? (
          hospitals.map((hospital, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#B1B1B1" : "#808286",
                color: "black",
                boxShadow: 3,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                  Hospital Information
                </Typography>
                <Typography variant="h5" component="div">
                  {hospital.name}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{hospital.location}</Typography>
                <Typography variant="body2">{hospital.address}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpenHospitalModal(hospital)}>
                  View Departments
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography></Typography>
        )}
      </Box>

      {/* Hospital Modal */}
      <Modal open={openHospitalModal} onClose={() => setOpenHospitalModal(false)}>
        <Box sx={{ width: 600, padding: 2, backgroundColor: "white", margin: "auto", marginTop: "100px" }}>
          <Typography variant="h6">Hospital: {selectedHospital?.name}</Typography>
          <Typography variant="body2">{selectedHospital?.location}</Typography>
          <Typography variant="body2">{selectedHospital?.address}</Typography>
          <hr />
          <Typography variant="h6">Departments</Typography>
          {selectedHospital &&
            selectedHospital.departments.map((department: any) => (
              <Box key={department.department_id} sx={{ marginBottom: 2 }}>
                <Typography variant="body1">{department.department_name}</Typography>
                {department.doctors.map((doctor: any) => (
                  <Button
                    key={doctor.doctor_id}
                    onClick={() => handleSelectDepartmentAndDoctor(department, doctor)}
                    sx={{ marginLeft: 2 }}
                  >
                    {doctor.doctor_name}
                  </Button>
                ))}
              </Box>
            ))}
          {selectedDepartment && selectedDoctor && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6">Doctor: {selectedDoctor?.doctor_name}</Typography>
              <Typography variant="body2">Department: {selectedDepartment?.department_name}</Typography>
              <Typography variant="body2">Available Slots:</Typography>
              {doctorAvailability && doctorAvailability.length > 0 ? (
                doctorAvailability.map((slot: any, index: number) => (
                  <Box key={index}>
                    <FormControlLabel
                      control={<Checkbox onChange={() => handleSlotChange(slot)} />}
                      label={`Date: ${slot.available_date}, Time: ${slot.available_time}`}
                    />
                  </Box>
                ))
              ) : (
                <Typography>No available slots.</Typography>
              )}
              <Button onClick={handleBookAppointment} sx={{ marginTop: 3 }} variant="contained">
                Book Appointment
              </Button>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position the Snackbar at the center top
        sx={{ top: "50%", transform: "translateY(-50%)" }} // Center vertically
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            fontSize: "1.2rem", // Larger text size
            textAlign: "center", // Center the text
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CardComponent;
