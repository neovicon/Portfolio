import Contact from '../models/Contact.js';

// Submit contact form
export const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            error: 'Failed to send message',
            message: error.message
        });
    }
};

// Get all contact messages (admin)
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch contacts',
            message: error.message
        });
    }
};
