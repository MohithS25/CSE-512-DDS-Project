"use client";
import React, { useState } from "react";
import { Grid, FormLabel, OutlinedInput, Button, Typography, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

// Define types for form fields and errors
type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  location: string;
};

type Errors = Partial<FormFields>;

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"]; // Example locations

  const validateForm = () => {
    const newErrors: Errors = {
      firstName: formData.firstName.trim() ? "" : "First name is required.",
      lastName: formData.lastName.trim() ? "" : "Last name is required.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ? ""
        : "Please enter a valid email address.",
      phone: /^[0-9]{10}$/.test(formData.phone.trim())
        ? ""
        : "Phone number must be 10 digits.",
      password: formData.password.trim().length >= 6
        ? ""
        : "Password must be at least 6 characters.",
      location: formData.location.trim() ? "" : "Please select a location.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleInputChange = (field: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear specific error
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    console.log("Signup successful!", formData);
   // alert("Signup successful! Redirecting to homepage...");
    router.push("/homePage"); // Redirect to the homepage
  };

  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      {/* Render all fields except Location */}
      {Object.entries(formData).map(([field, value]) => {
        if (field === "location") return null; // Skip rendering the location here
        const label = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()); // Convert "firstName" to "First Name"
        const isPassword = field === "password";
        const isPhone = field === "phone";

        return (
          <Grid
            key={field}
            item
            xs={12}
            md={["firstName", "lastName", "phone", "password"].includes(field) ? 6 : 12}
          >
            <FormLabel htmlFor={field} required>
              {label}
            </FormLabel>
            <OutlinedInput
              id={field}
              type={isPassword ? "password" : isPhone ? "tel" : "text"}
              placeholder={label}
              size="small"
              fullWidth
              value={value}
              onChange={(e) => handleInputChange(field as keyof FormFields, e.target.value)}
              error={!!errors[field as keyof FormFields]}
            />
            {errors[field as keyof FormFields] && (
              <Typography color="error" variant="body2">
                {errors[field as keyof FormFields]}
              </Typography>
            )}
          </Grid>
        );
      })}

      {/* Location Field as Dropdown */}
      <Grid item xs={12}>
        <FormLabel htmlFor="location" required>
          Location
        </FormLabel>
        <Select
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          fullWidth
          displayEmpty
          size="small"
          error={!!errors.location}
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
        {errors.location && (
          <Typography color="error" variant="body2">
            {errors.location}
          </Typography>
        )}
      </Grid>

      {/* Submit Button */}
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button variant="contained" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}
