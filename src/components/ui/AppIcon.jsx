import { AboutIcon, ProjectsIcon, SkillsIcon, ContactIcon, SettingsIcon, FolderIcon } from './icons';
import '../../styles/AppIcon.css';

const AppIcon = ({ type, size = 60, onClick, label }) => {
    const getIcon = () => {
        switch (type) {
            case 'about':
                return <AboutIcon size={size} />;
            case 'projects':
                return <ProjectsIcon size={size} />;
            case 'skills':
                return <SkillsIcon size={size} />;
            case 'contact':
                return <ContactIcon size={size} />;
            case 'settings':
                return <SettingsIcon size={size} />;
            case 'folder':
                return <FolderIcon size={size} />;
            default:
                return <FolderIcon size={size} />;
        }
    };

    return (
        <button className="app-icon-wrapper" onClick={onClick} aria-label={label}>
            <div className="app-icon-container">
                {getIcon()}
            </div>
            {label && <span className="app-icon-label">{label}</span>}
        </button>
    );
};

export default AppIcon;
