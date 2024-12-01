import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const HomePage = () => {
  const [location, setLocation] = useState("Phoenix"); // Default location
  const [hospitals, setHospitals] = useState<any[]>([]); // State to store hospital data

  // Fetch data from API based on location
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`http://localhost:8000/hospitals?location=${location}`);
        const data = await response.json();

        if (data.status === "success") {
          setHospitals(data.data); // Store hospital data
        } else {
          console.error("Error fetching hospital data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHospitals(); // Call the API when the location changes
  }, [location]); // Dependency array includes location to refetch when location changes

  // Handler for location change
  const handleLocationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string); // Update location and fetch new data
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Location Dropdown */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>Change Location:</Typography>
        <select value={location} onChange={handleLocationChange} style={{ padding: "8px" }}>
          <option value="Phoenix">Phoenix</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          {/* Add more locations if needed */}
        </select>
      </Box>

      {/* Display Hospitals in Cards */}
      <Grid container spacing={2}>
        {hospitals.map((hospital) => (
          <Grid item xs={12} sm={6} md={4} key={hospital.hospital_id}>
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">{hospital.name}</Typography>
                <Typography variant="body2" color="text.secondary">{hospital.location}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {hospital.address}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: "center" }}>
                <Button variant="contained" sx={{ mt: 2 }}>
                  <a href={`/book-appointment/${hospital.name.replace(/\s+/g, '-')}`} style={{ textDecoration: "none", color: "white" }}>
                    Book Appointment
                  </a>
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
