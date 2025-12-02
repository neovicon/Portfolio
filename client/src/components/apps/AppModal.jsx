import { useState } from 'react';
import '../../styles/AppModal.css';

const AppModal = ({ isOpen, onClose, onSave, appData = null }) => {
    const [formData, setFormData] = useState(appData || {
        name: '',
        url: '',
        logo: ''
    });
    const [logoPreview, setLogoPreview] = useState(appData?.logo || '');

    if (!isOpen) return null;

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setLogoPreview(imageUrl);
                setFormData({ ...formData, logo: imageUrl });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.url && formData.logo) {
            onSave(formData);
            onClose();
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="app-modal-overlay" onClick={onClose}>
            <div className="app-modal glass" onClick={(e) => e.stopPropagation()}>
                <div className="app-modal-header">
                    <h2>{appData ? 'Edit App' : 'Add New App'}</h2>
                    <button className="app-modal-close" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="app-modal-form">
                    <div className="form-group">
                        <label>App Logo</label>
                        <div className="logo-upload-section">
                            {logoPreview && (
                                <div className="logo-preview">
                                    <img src={logoPreview} alt="Logo preview" />
                                </div>
                            )}
                            <label className="upload-logo-btn">
                                {logoPreview ? '📷 Change Logo' : '📤 Upload Logo'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>App Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="My Awesome App"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>App URL</label>
                        <input
                            type="url"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            placeholder="https://example.com"
                            required
                        />
                    </div>

                    <div className="app-modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn">
                            💾 Save App
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppModal;
