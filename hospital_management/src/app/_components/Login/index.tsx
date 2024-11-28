"use client"
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Login() {
  return (
    <>
    <Grid container spacing={3} sx={{ padding: '20px' }}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="First name"
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="last-name"
          placeholder="Last name"
          autoComplete="last name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="shipping email"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="address2">Phone</FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="phone"
          placeholder="Enter Phone Number"
          autoComplete="shipping address-line2"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="Location" required>
          Location
        </FormLabel>
        <OutlinedInput
          id="Location"
          name="Location"
          type="Location"
          placeholder="Enter Location"
          autoComplete="shipping country"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
    <Grid sx={{justifyContent:"center", display:"flex"}}>
    <Button variant="contained">Sign In</Button></Grid>
    </>
  );
}