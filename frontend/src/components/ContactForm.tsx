import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Contact } from '../types';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id'>) => void;
  initialValues?: Contact;
}

export default function ContactForm({ onSubmit, initialValues }: ContactFormProps) {
  const [formData, setFormData] = useState<Omit<Contact, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 , marginTop : 6 }}>
      <Typography variant="h6" gutterBottom>
        {initialValues ? 'Edit Contact' : 'Add New Contact'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="jobTitle"
            label="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        {initialValues ? 'Update Contact' : 'Add Contact'}
      </Button>
    </Box>
  );
}