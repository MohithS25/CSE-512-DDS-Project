"use client";
import React, { useState } from "react";
import { Grid, FormLabel, OutlinedInput, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from '../page.module.css'; 

// Define types for form fields and errors
type FormFields = {
  email: string;
  password: string;
};

type Errors = Partial<FormFields>;

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormFields>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors: Errors = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ? ""
        : "Please enter a valid email address.",
      password: formData.password.trim().length >= 6
        ? ""
        : "Password must be at least 6 characters.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleInputChange = (field: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear specific error
    setApiError(""); // Clear API error if any
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful!");
        alert("Login successful! Redirecting to homepage...");
        router.push("/homePage"); // Redirect to the homepage
      } else {
        const data = await response.json();
        setApiError(data.message || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setApiError("An error occurred. Please try again later.");
    }
  };

  return (
    <main className={styles.container}>
    <Box
      sx={{
        background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "500px",
        marginTop: "40px", // Margin top for spacing
        transform: "scale(1)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)", // Slight zoom effect on hover
        },
      }}
    >
      <Grid container spacing={2}>
        {/* Email */}
        <Grid item xs={12}>
          <FormLabel
            htmlFor="email"
            required
            sx={{
              textAlign: "left", // Left align the label
              display: "block", // Ensure label is block-level
            }}
          >
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
            sx={{
              "&:hover": {
                borderColor: "#ff7e5f",
              },
              "&.Mui-focused": {
                borderColor: "#ff7e5f", // Highlight on focus
              },
              transition: "border-color 0.3s ease",
            }}
          />
          {errors.email && (
            <Typography color="error" variant="body2">
              {errors.email}
            </Typography>
          )}
        </Grid>

        {/* Password */}
        <Grid item xs={12}>
          <FormLabel
            htmlFor="password"
            required
            sx={{
              textAlign: "left", // Left align the label
              display: "block", // Ensure label is block-level
            }}
          >
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
            sx={{
              "&:hover": {
                borderColor: "#ff7e5f",
              },
              "&.Mui-focused": {
                borderColor: "#ff7e5f",
              },
              transition: "border-color 0.3s ease",
            }}
          />
          {errors.password && (
            <Typography color="error" variant="body2">
              {errors.password}
            </Typography>
          )}
        </Grid>

        {/* Display API Errors */}
        {apiError && (
          <Grid item xs={12}>
            <Typography color="error" variant="body2" align="center">
              {apiError}
            </Typography>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: "#ff7e5f", // Button background color
              "&:hover": {
                backgroundColor: "#f06c5a", // Hover effect color
              },
              width: "100%",
              padding: "12px",
              transition: "background-color 0.3s ease",
              borderRadius: "6px", // Rounded corners for button
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
    </main>
  );
}
