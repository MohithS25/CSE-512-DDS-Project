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
import { SelectChangeEvent } from "@mui/material"; // Correct import for the event type
import Link from "next/link"; // Import Link for navigation

const locations = ["Phoenix", "Tempe", "Gilbert", "Mesa", "Tucson"];

// Define types for hospital, department, and doctor
interface Doctor {
  doctor_id: string;
  doctor_name: string;
}

interface Department {
  department_id: string;
  department_name: string;
  doctors: Doctor[];
}

interface Hospital {
  hospital_id: string;
  name: string;
  location: string;
  address: string;
  departments: Department[];
}

const CardComponent = () => {
  const [location, setLocation] = useState<string>(""); // Initial state for location selection
  const [hospitals, setHospitals] = useState<Hospital[]>([]); // State to store hospital data
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API request

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

  return (
    <Box sx={{ p: 4, pt: 10 }}>
      {/* Location Dropdown with FormLabel */}
      <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 3 }}>
        <FormLabel htmlFor="location" sx={{ marginBottom: 2 }}>
          Change Location
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

                {/* Display departments and doctors */}
                {hospital.departments && hospital.departments.length > 0 ? (
                  <Box sx={{ marginTop: 2 }}>
                    {hospital.departments.map((department) => (
                      <Box key={department.department_id} sx={{ marginBottom: 2 }}>
                        <Typography variant="h6">{department.department_name}</Typography>
                        <ul>
                          {department.doctors.map((doctor) => (
                            <li key={doctor.doctor_id}>
                              <Typography variant="body2">{doctor.doctor_name}</Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2">No departments available</Typography>
                )}
              </CardContent>
             
              <CardActions>
              <Link
  href={`/book-appointment/${hospital.hospital_id}`} // Use hospital ID instead of name
  passHref
>
  <Button size="small">Book Appointment</Button>
</Link>
</CardActions>
              
            </Card>
          ))
        ) : (
          <Typography>No hospitals found for this location</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CardComponent;
