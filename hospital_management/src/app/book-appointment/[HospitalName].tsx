"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Use this to access URL parameters
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material";

interface Doctor {
  doctor_id: string;
  doctor_name: string;
}

interface Department {
  department_id: string;
  department_name: string;
  doctors: Doctor[];
}

interface Availability {
  date: string;
  time_slots: string[];
}

const BookAppointmentPage = () => {
  const router = useRouter(); // Access the router to get dynamic parameters
  const { hospitalId } = router.query; // `hospitalId` comes from the URL path

  const [hospital, setHospital] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [availability, setAvailability] = useState<Availability | null>(null); // State for doctor availability

  // Fetch hospital details based on the hospital ID
  useEffect(() => {
    if (!hospitalId) return;  // Ensure the hospitalId is available

    const fetchHospitalDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/gethospitalsdetails/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location: hospitalId }),  // Use `hospitalId` from the URL
        });
        const data = await response.json();
        if (data.status === "success") {
          const hospitalData = data.data.find(
            (hospital: any) => hospital.hospital_id === hospitalId // Match the hospital ID
          );
          setHospital(hospitalData);
          setDepartments(hospitalData?.departments || []); // Set departments
        }
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [hospitalId]);  // This will run the effect whenever `hospitalId` changes

  // Fetch doctor availability
  const fetchDoctorAvailability = async (doctorId: string) => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/getdoctoravailability/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctor_id: doctorId }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setAvailability(data.data);  // Set the available time slots
      }
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
  };

  const handleDoctorChange = (event: SelectChangeEvent<string>) => {
    const doctorId = event.target.value;
    setSelectedDoctor(doctorId);
    fetchDoctorAvailability(doctorId);  // Fetch availability whenever doctor is selected
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Book Appointment at {hospital?.name}</Typography>
      {loading ? (
        <Typography>Loading available departments...</Typography>
      ) : (
        <>
          {/* Department selection */}
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel>Department</InputLabel>
            <Select value={selectedDepartment} onChange={handleDepartmentChange}>
              {departments.map((department) => (
                <MenuItem key={department.department_id} value={department.department_id}>
                  {department.department_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Doctor selection */}
          {selectedDepartment && (
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel>Doctor</InputLabel>
              <Select value={selectedDoctor} onChange={handleDoctorChange}>
                {departments
                  .find((dept) => dept.department_id === selectedDepartment)
                  ?.doctors.map((doctor) => (
                    <MenuItem key={doctor.doctor_id} value={doctor.doctor_id}>
                      {doctor.doctor_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          {/* Availability display */}
          {availability && selectedDoctor && (
            <>
              <Typography variant="h6" sx={{ marginTop: 3 }}>
                Available Slots for {selectedDoctor}
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                {availability.time_slots.length > 0 ? (
                  <ul>
                    {availability.time_slots.map((time: string, index: number) => (
                      <li key={index}>{time}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No available slots for this doctor.</Typography>
                )}
              </Box>
            </>
          )}

          <Button
            sx={{ marginTop: 3 }}
            variant="contained"
            color="primary"
            onClick={() => {
              // Logic to proceed with appointment booking after selecting time slot
              console.log("Appointment booked with doctor:", selectedDoctor);
            }}
          >
            Book Appointment
          </Button>
        </>
      )}
    </Box>
  );
};

export default BookAppointmentPage;
