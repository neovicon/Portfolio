import React, { useState, useEffect } from 'react';
import { uploadFile, deleteFile } from '../../services/api';

const FolderApp = ({ name, icon, folder, isAdmin, onAddFile, onDeleteFolder, initialFileId }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newFile, setNewFile] = useState({ title: '', description: '', poster: '', content: '' });
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState(folder?.files || []);

    // Update files when folder prop changes
    useEffect(() => {
        setFiles(folder?.files || []);
    }, [folder]);

    // Handle Deep Linking for Files
    useEffect(() => {
        if (initialFileId && files.length > 0) {
            const fileToOpen = files.find(f => (f.id === initialFileId || f._id === initialFileId));
            if (fileToOpen) {
                setSelectedFile(fileToOpen);
            }
        }
    }, [initialFileId, files]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newFile.title && newFile.content) {
            onAddFile(newFile);
            setNewFile({ title: '', description: '', poster: '', content: '' });
            setShowAddForm(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true);
            try {
                const response = await uploadFile(file);
                // add a link from environment variable
                const fullUrl = `${import.meta.env.VITE_API_URL}${response.url}`;
                setNewFile(prev => ({ ...prev, poster: fullUrl }));
            } catch (error) {
                console.error('Upload failed:', error);
                alert('Failed to upload image');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleDeleteFile = async (fileId) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            try {
                const updatedFolder = await deleteFile(folder.id, fileId);
                setFiles(updatedFolder.files);
                setSelectedFile(null); // Go back to grid
            } catch (error) {
                console.error('Error deleting file:', error);
                alert('Failed to delete file');
            }
        }
    };

    const handleShareFolder = () => {
        const url = `${window.location.origin}/?folder=${folder.id}`;
        navigator.clipboard.writeText(url);
        alert('Folder link copied to clipboard!');
    };

    const handleShareFile = (file) => {
        const url = `${window.location.origin}/?folder=${folder.id}&file=${file._id || file.id}`;
        navigator.clipboard.writeText(url);
        alert('File link copied to clipboard!');
    };

    // Render Detail View
    if (selectedFile) {
        return (
            <div className="folder-app" style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                color: 'var(--text-primary)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden' // Prevent double scrollbars
            }}>
                {/* Detail Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button
                            onClick={() => setSelectedFile(null)}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: 'var(--text-primary)',
                                padding: '0 10px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            ← Back
                        </button>
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{selectedFile.title}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => handleShareFile(selectedFile)}
                            style={{
                                padding: '8px 16px',
                                background: 'var(--accent-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Share
                        </button>
                        {isAdmin && (
                            <button
                                onClick={() => handleDeleteFile(selectedFile._id || selectedFile.id)}
                                style={{
                                    padding: '8px 16px',
                                    background: '#ff4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>

                {/* Detail Content */}
                <div style={{ overflowY: 'auto', padding: '30px', flex: 1 }}>
                    {selectedFile.poster && (
                        <div style={{
                            width: '100%',
                            maxHeight: '400px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginBottom: '30px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            background: '#000',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={selectedFile.poster}
                                alt={selectedFile.title}
                                style={{
                                    maxWidth: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    display: 'block'
                                }}
                            />
                        </div>
                    )}

                    {selectedFile.description && (
                        <div style={{
                            fontSize: '1.2rem',
                            opacity: 0.9,
                            marginBottom: '30px',
                            fontStyle: 'italic',
                            borderLeft: '4px solid var(--accent-color)',
                            paddingLeft: '20px',
                            lineHeight: '1.6'
                        }}>
                            {selectedFile.description}
                        </div>
                    )}

                    <div style={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.8',
                        fontSize: '1.1rem',
                        color: 'var(--text-primary)',
                        padding: '20px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)'
                    }}>
                        {selectedFile.content || selectedFile.url}
                    </div>
                </div>
            </div>
        );
    }

    // Render Grid View
    return (
        <div className="folder-app" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'var(--text-primary)',
            padding: '20px',
            overflowY: 'auto',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            position: 'relative'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                gap: '15px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <div style={{ fontSize: '3rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>{icon}</div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: '700' }}>{name}</h2>
                    <p style={{ margin: '5px 0 0', opacity: 0.7 }}>{files.length} items</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleShareFolder}
                        style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            backdropFilter: 'blur(5px)',
                        }}
                    >
                        Share Folder
                    </button>
                    {isAdmin && (
                        <>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                style={{
                                    padding: '8px 16px',
                                    background: 'var(--accent-color)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                }}
                            >
                                {showAddForm ? 'Cancel' : 'Add File'}
                            </button>
                            <button
                                onClick={onDeleteFolder}
                                style={{
                                    padding: '8px 16px',
                                    background: '#ff4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Add File Form */}
            {showAddForm && (
                <form onSubmit={handleSubmit} style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '20px',
                    borderRadius: '16px',
                    marginBottom: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    border: '1px solid var(--border-color)'
                }}>
                    <h3 style={{ margin: '0 0 10px' }}>Add New File</h3>
                    <input
                        placeholder="Title"
                        value={newFile.title}
                        onChange={e => setNewFile({ ...newFile, title: e.target.value })}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-primary)',
                            fontSize: '1rem'
                        }}
                        required
                    />
                    <input
                        placeholder="Description"
                        value={newFile.description}
                        onChange={e => setNewFile({ ...newFile, description: e.target.value })}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-primary)',
                            fontSize: '1rem'
                        }}
                    />

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', opacity: 0.8 }}>Poster Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'var(--text-primary)',
                                    width: '100%'
                                }}
                            />
                        </div>
                        {uploading && <span>Uploading...</span>}
                        {newFile.poster && (
                            <div style={{ width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden' }}>
                                <img src={newFile.poster} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    <textarea
                        placeholder="Main Context (Content)"
                        value={newFile.content}
                        onChange={e => setNewFile({ ...newFile, content: e.target.value })}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            minHeight: '100px',
                            resize: 'vertical'
                        }}
                        required
                    />
                    <button type="submit" disabled={uploading} style={{
                        padding: '12px',
                        background: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        marginTop: '10px',
                        opacity: uploading ? 0.7 : 1
                    }}>Save File</button>
                </form>
            )}

            {/* Files Grid */}
            {files.length === 0 ? (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.5,
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <div style={{ fontSize: '4rem' }}>📭</div>
                    <p style={{ fontSize: '1.2rem' }}>This folder is empty.</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '20px' // Increased gap
                }}>
                    {files.map(file => (
                        <div
                            key={file.id || file._id}
                            onClick={() => setSelectedFile(file)}
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                height: '100%',
                                paddingBottom: '10px' // Add padding to bottom of card
                            }}
                            className="file-card"
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                background: '#222',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                {file.poster ? (
                                    <img src={file.poster} alt={file.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '3rem' }}>📄</span>
                                )}
                            </div>
                            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                                <div style={{
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    marginBottom: '2px' // Spacing below title
                                }}>{file.title}</div>
                                {file.description && <div style={{
                                    fontSize: '0.8rem',
                                    opacity: 0.7,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>{file.description}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FolderApp;
