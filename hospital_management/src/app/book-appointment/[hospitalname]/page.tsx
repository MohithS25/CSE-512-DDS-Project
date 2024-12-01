// src/app/book-appointment/[hospitalName]/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// The Book Appointment page for a specific hospital
const BookAppointmentPage = () => {
  const router = useRouter();
  const { hospitalName } = router.query; // Access the hospital name from the URL
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    date: "",
    time: "",
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (for now just log data)
  const handleSubmit = () => {
    console.log("Appointment Data:", appointmentData);
    // Add logic to send the data to the API when ready
  };

  return (
    <Box sx={{ p: 4, pt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Book Appointment at {hospitalName}
      </Typography>
      <Box sx={{ maxWidth: 400, margin: "auto" }}>
        <TextField
          label="Your Name"
          name="name"
          value={appointmentData.name}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Appointment Date"
          type="date"
          name="date"
          value={appointmentData.date}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Appointment Time"
          type="time"
          name="time"
          value={appointmentData.time}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
        >
          Book Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default BookAppointmentPage;
