import { useState, useEffect } from 'react';
import { submitContact, getContacts } from '../../services/api';
import '../../styles/Apps.css';

const ContactApp = ({ isAdmin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [viewMode, setViewMode] = useState('form'); // 'form' or 'messages'

    useEffect(() => {
        if (isAdmin && viewMode === 'messages') {
            fetchMessages();
        }
    }, [isAdmin, viewMode]);

    const fetchMessages = async () => {
        try {
            const data = await getContacts();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await submitContact(formData);
            setStatus({
                type: 'success',
                message: 'Message sent successfully! I\'ll get back to you soon.'
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try again.'
            });
            console.error('Error submitting contact form:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="app-container">
            <div className="contact-container">
                <div className="contact-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 className="contact-title" style={{ margin: 0 }}>
                        {viewMode === 'form' ? 'Get In Touch' : 'Messages'}
                    </h2>
                    {isAdmin && (
                        <button
                            onClick={() => setViewMode(viewMode === 'form' ? 'messages' : 'form')}
                            className="admin-toggle-btn"
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                background: 'rgba(0, 122, 255, 0.1)',
                                color: '#007aff',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            {viewMode === 'form' ? 'View Messages' : 'Write Message'}
                        </button>
                    )}
                </div>

                {viewMode === 'form' ? (
                    <>
                        <p className="contact-subtitle">
                            Have a question or want to work together? Send me a message!
                        </p>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your message..."
                                    rows="5"
                                    className="form-textarea"
                                />
                            </div>

                            {status.message && (
                                <div className={`form-status ${status.type}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="form-submit"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="messages-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', maxHeight: '60vh' }}>
                        {messages.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#666' }}>No messages yet.</p>
                        ) : (
                            messages.map(msg => (
                                <div key={msg._id} className="message-card" style={{
                                    background: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: '12px',
                                    padding: '15px',
                                    border: '1px solid rgba(0, 0, 0, 0.05)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <strong style={{ fontSize: '1.1em' }}>{msg.name}</strong>
                                        <span style={{ fontSize: '0.85em', color: '#666' }}>{formatDate(msg.createdAt)}</span>
                                    </div>
                                    <div style={{ fontSize: '0.9em', color: '#007aff', marginBottom: '8px' }}>{msg.email}</div>
                                    <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{msg.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactApp;
