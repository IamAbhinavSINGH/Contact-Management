import { useState , useEffect } from 'react';
import { Container , CssBaseline, ThemeProvider , createTheme } from '@mui/material';
import { Contact } from './types';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import Header from './components/Header';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const theme = createTheme({
  palette : {
    primary : { main : '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' }
  }
});

export default function App(){
  const [contacts , setContacts] = useState<Contact[]>([]);
  const [editingContact , setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
      fetchContacts();
  });

  const fetchContacts = async() => {
    try{
      const response = await axios.get(`${API_URL}/contacts`);
  
      if(response.status && response.data){
        setContacts(response.data.contacts);
      }
  
    }catch(err){
      console.log(`error while fetching contacts : ` , err);
    }
  };
  
  const addContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      await axios.post(`${API_URL}/contacts`, contact);
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const updateContact = async (id: number, contact: Omit<Contact, 'id'>) => {
    try {
      await axios.put(`${API_URL}/contacts/${id}`, contact);
      fetchContacts();
      setEditingContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline >
          <Container>
          <Header />
          <ContactTable
            contacts={contacts}
            onEdit={setEditingContact}
            onDelete={deleteContact}
          />
          <ContactForm 
            onSubmit={editingContact ? (contact : any) => updateContact(editingContact.id, contact) : addContact}
            initialValues={editingContact || undefined}
          />
          </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}