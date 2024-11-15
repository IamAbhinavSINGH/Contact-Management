import express from 'express';
import cors from 'cors';
import { Request , Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
const app = express();
dotenv.config();

console.log("database url : " , process.env.DATABASE_URL);

const ContactScheam = z.object({
    firstName : z.string().min(1),
    lastName : z.string().min(1),
    email : z.string().email(),
    phone : z.string().min(10),
    company : z.string().min(1),
    jobTitle : z.string().min(1)
});

type Contact = z.infer<typeof ContactScheam>;

app.use(cors());
app.use(express.json());

app.get('/' , (req : Request, res : Response) => {
    res.status(200).json({
        message : "Healthy Server!"
    })
});


// for fetching all the contacts
app.get('/contacts' , async (req : Request , res : Response) => {
    try{
        const contacts = await prisma.contact.findMany();
        
        res.json({
            contacts : contacts
        });

    }catch(err){
        console.error(`error while fetching contacts from db :` , err);
        res.status(500).json({
            message : "An error occured!"
        });
    }
});


// for creating a new contact
app.post('/contacts' , async (req : Request, res : Response) => {
    try{
        const contactData = ContactScheam.safeParse(req.body);
        if(!contactData.success){
            res.status(500).json({
                message : "Invalid inputs"
            });
            return;
        }

        const newContact = await prisma.contact.create({
            data : contactData.data
        });

        res.json({
            newContact : newContact
        });

    }catch(err){
        console.error(`error while adding a contact to db :` , err);
        res.status(500).json({
            message : "An error occured!"
        });
    }
});

// Update a contact with given 'id'
app.put('/contacts/:id' , async (req : Request , res : Response) => {
    const { id } = req.params;
    try{
        const contactData = ContactScheam.safeParse(req.body);
        if(!contactData.success){
            res.status(500).json({
                message : "Invalid inputs"
            });
            return;
        }

        const existingContact = await prisma.contact.findFirst({ where : { id : parseInt(id) } });
        if(!existingContact){
            res.status(500).json({
                message : "No contact exist with the given Id"
            });
            return;
        }

        const updatedContact = await prisma.contact.update({
            where : { id : parseInt(id) },
            data : contactData.data
        });

        res.json({ updatedContact });

    }catch(err){
        console.error(`error while updating a contact :` , err);
        res.status(500).json({
            message : "An error occured!"
        });
    }
});

// delete a contact with an id
app.delete('/contacts/:id' , async (req : Request , res : Response) => {
    const { id } = req.params;
    try{
        const existingContact = await prisma.contact.findFirst({ where : { id : parseInt(id) } });
        if(!existingContact){
            res.json({
                message : "No existing contact found with the given id"
            });
            return;
        }

        await prisma.contact.delete({ where : { id : parseInt(id) } });

        res.json({ message : 'Contact deleted successfully' });

    }catch(err){
        console.error(`error while deleting a contact from db :` , err);
        res.status(500).json({
            message : "An error occured!"
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT , () => {
    console.log(`started server on port ${PORT}`);
})