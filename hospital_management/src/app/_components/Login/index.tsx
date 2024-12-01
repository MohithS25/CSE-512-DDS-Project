"use client";
import React, { useState } from "react";
import { Grid, FormLabel, OutlinedInput, Button, Typography, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

// Define types for form fields and errors
type FormFields = {
  email: string;
  first_name: string;
  last_name: string;
  location: string;
  password: string;
  phone: string;
};

type Errors = Partial<FormFields>;

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormFields>({
    email: "",
    first_name: "",
    last_name: "",
    location: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const locations = ["Phoenix", "Tempe", "Gilbert", "Mesa", "Tucson"]; // Example locations

  const validateForm = () => {
    const newErrors: Errors = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ? ""
        : "Please enter a valid email address.",
      first_name: formData.first_name.trim() ? "" : "First name is required.",
      last_name: formData.last_name.trim() ? "" : "Last name is required.",
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

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Signup successful!");
        alert("Signup successful! Redirecting to homepage...");
        router.push("/homePage"); // Redirect to the homepage
      } else {
        const data = await response.json();
        console.error("Error:", data);
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      {/* Email */}
      <Grid item xs={12}>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          placeholder="Email"
          size="small"
          fullWidth
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={!!errors.email}
        />
        {errors.email && (
          <Typography color="error" variant="body2">
            {errors.email}
          </Typography>
        )}
      </Grid>

      {/* First Name */}
      <Grid item xs={12} sm={6}>
        <FormLabel htmlFor="first_name" required>
          First Name
        </FormLabel>
        <OutlinedInput
          id="first_name"
          placeholder="First Name"
          size="small"
          fullWidth
          value={formData.first_name}
          onChange={(e) => handleInputChange("first_name", e.target.value)}
          error={!!errors.first_name}
        />
        {errors.first_name && (
          <Typography color="error" variant="body2">
            {errors.first_name}
          </Typography>
        )}
      </Grid>

      {/* Last Name */}
      <Grid item xs={12} sm={6}>
        <FormLabel htmlFor="last_name" required>
          Last Name
        </FormLabel>
        <OutlinedInput
          id="last_name"
          placeholder="Last Name"
          size="small"
          fullWidth
          value={formData.last_name}
          onChange={(e) => handleInputChange("last_name", e.target.value)}
          error={!!errors.last_name}
        />
        {errors.last_name && (
          <Typography color="error" variant="body2">
            {errors.last_name}
          </Typography>
        )}
      </Grid>

      {/* Password */}
      <Grid item xs={12}>
        <FormLabel htmlFor="password" required>
          Password
        </FormLabel>
        <OutlinedInput
          id="password"
          type="password"
          placeholder="Password"
          size="small"
          fullWidth
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          error={!!errors.password}
        />
        {errors.password && (
          <Typography color="error" variant="body2">
            {errors.password}
          </Typography>
        )}
      </Grid>

      {/* Phone */}
      <Grid item xs={12}>
        <FormLabel htmlFor="phone" required>
          Phone
        </FormLabel>
        <OutlinedInput
          id="phone"
          placeholder="Phone"
          size="small"
          fullWidth
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          error={!!errors.phone}
        />
        {errors.phone && (
          <Typography color="error" variant="body2">
            {errors.phone}
          </Typography>
        )}
      </Grid>

      {/* Location as Dropdown */}
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
