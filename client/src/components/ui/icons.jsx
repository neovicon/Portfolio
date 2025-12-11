const AboutIcon = ({ size = 60 }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" rx="13" fill="url(#aboutGrad)" />
        <circle cx="30" cy="22" r="8" fill="white" opacity="0.9" />
        <path d="M18 45 C18 35, 42 35, 42 45" fill="white" opacity="0.9" />
    </svg>
);

const ProjectsIcon = ({ size = 60 }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="projectsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f093fb" />
                <stop offset="100%" stopColor="#f5576c" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" rx="13" fill="url(#projectsGrad)" />
        <rect x="15" y="20" width="30" height="24" rx="2" fill="white" opacity="0.9" />
        <rect x="15" y="16" width="30" height="4" rx="2" fill="white" opacity="0.7" />
    </svg>
);

const SkillsIcon = ({ size = 60 }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="skillsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4facfe" />
                <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" rx="13" fill="url(#skillsGrad)" />
        <path d="M30 15 L35 25 L45 25 L37 32 L40 42 L30 35 L20 42 L23 32 L15 25 L25 25 Z"
            fill="white" opacity="0.9" />
    </svg>
);

const ContactIcon = ({ size = 60 }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="contactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#43e97b" />
                <stop offset="100%" stopColor="#38f9d7" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" rx="13" fill="url(#contactGrad)" />
        <rect x="12" y="20" width="36" height="24" rx="2" fill="white" opacity="0.9" />
        <path d="M12 20 L30 32 L48 20" stroke="url(#contactGrad)" strokeWidth="2" fill="none" />
    </svg>
);

const SettingsIcon = ({ size = 60 }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="settingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a8edea" />
                <stop offset="100%" stopColor="#fed6e3" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" rx="13" fill="url(#settingsGrad)" />
        <circle cx="30" cy="30" r="8" fill="white" opacity="0.9" />
        <circle cx="30" cy="18" r="3" fill="white" opacity="0.7" />
        <circle cx="30" cy="42" r="3" fill="white" opacity="0.7" />
        <circle cx="18" cy="30" r="3" fill="white" opacity="0.7" />
        <circle cx="42" cy="30" r="3" fill="white" opacity="0.7" />
    </svg>
);

const FolderIcon = ({ size = 60, color1 = "#ffd89b", color2 = "#19547b" }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color1} />
                <stop offset="100%" stopColor={color2} />
            </linearGradient>
        </defs>
        <rect width="60" height="60" rx="13" fill="url(#folderGrad)" />
        <path d="M15 22 L25 22 L28 18 L45 18 L45 42 L15 42 Z" fill="white" opacity="0.9" />
    </svg>
);

export { AboutIcon, ProjectsIcon, SkillsIcon, ContactIcon, SettingsIcon, FolderIcon };
