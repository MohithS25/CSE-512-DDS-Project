"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Simulate an API call to get hospital details
const fetchHospitalDetails = async (hospitalId: string) => {
  const response = await fetch(`http://localhost:8000/gethospitalbyid/${hospitalId}`);
  const data = await response.json();
  return data;
};

const BookAppointmentPage = ({ hospital }: { hospital: any }) => {
  const router = useRouter();
  const { hospitalId } = router.query; // Dynamic parameter from URL

  return (
    <div>
      <h1>Book Appointment at {hospital.name}</h1>
      {/* You can now show the appointment form and fetch doctors, availability etc. */}
    </div>
  );
};

export default BookAppointmentPage;

// Generate Static Params (for dynamic routing with pre-rendered paths)
export async function generateStaticParams() {
  // You can fetch all the available hospitals or their IDs from an API or your database
  const response = await fetch('http://localhost:8000/gethospitalsdetails/');
  const data = await response.json();
  const hospitals = data.data || [];

  // Generate a list of params to pre-render based on hospital IDs
  const params = hospitals.map((hospital: any) => ({
    hospitalId: hospital.hospital_id.toString(), // Dynamically get the hospital ID
  }));

  return params;
}

// This is an optional approach if you want data on the page at build time
export async function getStaticProps({ params }: { params: { hospitalId: string } }) {
  // Fetch hospital details based on hospitalId
  const hospitalDetails = await fetchHospitalDetails(params.hospitalId);

  return {
    props: {
      hospital: hospitalDetails,
    },
  };
}
