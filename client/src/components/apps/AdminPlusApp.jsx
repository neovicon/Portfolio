import React, { useState } from 'react';

const AdminPlusApp = ({ onAdd, onClose }) => {
    const [folderName, setFolderName] = useState('');
    const [folderIcon, setFolderIcon] = useState('📁');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (folderName.trim()) {
            onAdd({
                name: folderName,
                icon: folderIcon,
                type: 'folder'
            });
            setFolderName('');
            setFolderIcon('📁');
            if (onClose) onClose();
        }
    };

    return (
        <div className="admin-plus-app" style={{ padding: '2rem', color: 'var(--text-primary)' }}>
            <h2>Add New Folder</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Folder Name</label>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="My New Folder"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)'
                        }}
                        required
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Icon (Emoji)</label>
                    <input
                        type="text"
                        value={folderIcon}
                        onChange={(e) => setFolderIcon(e.target.value)}
                        placeholder="📁"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '0.75rem',
                        background: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        marginTop: '1rem'
                    }}
                >
                    Create Folder
                </button>
            </form>
        </div>
    );
};

export default AdminPlusApp;
