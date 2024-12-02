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
import { useHospitalContext } from "../_components/Context/HospitalContext"; // Use context
import Modal from "@mui/material/Modal";

// Helper function to fetch doctor availability
const getDoctorAvailability = async (hospital_name: string, department_name: string, doctor_name: string) => {
  const response = await fetch("http://localhost:8000/get-doctor-availability/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hospital_name,
      department_name,
      doctor_name,
    }),
  });

  const data = await response.json();
  return data;
};

const locations = ["Phoenix", "Tempe", "Gilbert", "Mesa", "Tucson"];

const CardComponent = () => {
  const { setHospital } = useHospitalContext(); // Access the context setter
  const [location, setLocation] = useState<string>(""); // State for location selection
  const [hospitals, setHospitals] = useState<any[]>([]); // State to store hospital data
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API request
  const [selectedHospital, setSelectedHospital] = useState<any>(null); // Store selected hospital details
  const [openHospitalModal, setOpenHospitalModal] = useState<boolean>(false); // Hospital Modal open/close state
  const [openDoctorModal, setOpenDoctorModal] = useState<boolean>(false); // Doctor Availability Modal open/close state
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null); // Store selected department
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null); // Store selected doctor
  const [doctorAvailability, setDoctorAvailability] = useState<any>(null); // Store doctor availability data

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
    setOpenHospitalModal(true);
  };

  // Handle department and doctor selection inside hospital modal
  const handleSelectDepartmentAndDoctor = (department: any, doctor: any) => {
    setSelectedDepartment(department);
    setSelectedDoctor(doctor);
    setOpenHospitalModal(false); // Close the hospital modal
    setOpenDoctorModal(true); // Open doctor availability modal
    handleCheckAvailability(department, doctor); // Call API to fetch doctor availability
  };

  // Fetch doctor availability from the API
  const handleCheckAvailability = async (department: any, doctor: any) => {
    if (selectedHospital && department && doctor) {
      try {
        const data = await getDoctorAvailability(
          selectedHospital.name,
          department.department_name,
          doctor.doctor_name
        );
        setDoctorAvailability(data.data); // Set doctor availability data
      } catch (error) {
        console.error("Error fetching doctor availability:", error);
        setDoctorAvailability(null); // Reset on error
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
            <Card key={index} sx={{ backgroundColor: index % 2 === 0 ? "#B1B1B1" : "#808286", color: "black", boxShadow: 3 }}>
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
          <Typography>No hospitals available for this location.</Typography>
        )}
      </Box>

      {/* Hospital Modal: Departments and Doctors */}
      <Modal open={openHospitalModal} onClose={() => setOpenHospitalModal(false)}>
        <Box sx={{ width: 400, padding: 2, backgroundColor: "white", margin: "auto", marginTop: "100px" }}>
          <Typography variant="h6">Departments and Doctors</Typography>
          {selectedHospital && selectedHospital.departments.map((department: any) => (
            <Box key={department.department_id}>
              <Typography variant="body2">{department.department_name}</Typography>
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
        </Box>
      </Modal>

      {/* Doctor Availability Modal */}
      <Modal open={openDoctorModal} onClose={() => setOpenDoctorModal(false)}>
        <Box sx={{ width: 400, padding: 2, backgroundColor: "white", margin: "auto", marginTop: "100px" }}>
          <Typography variant="h6">Doctor Availability</Typography>
          {doctorAvailability ? (
            <div>
              <Typography variant="body2">Hospital: {selectedHospital?.name}</Typography>
              <Typography variant="body2">Department: {selectedDepartment?.department_name}</Typography>
              <Typography variant="body2">Doctor: {selectedDoctor?.doctor_name}</Typography>
              <Typography variant="body2">Available Time: {doctorAvailability?.available_time}</Typography>
            </div>
          ) : (
            <Typography variant="body2">Loading doctor availability...</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CardComponent;
