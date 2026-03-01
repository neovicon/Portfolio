// Basic folder structure for /api/folders
// In a real scenario, this might read from the filesystem or DB.
// Based on typical portfolio needs, we'll provide a structured response.

export const getFolders = async (req, res) => {
    try {
        const folders = [
            {
                name: "Projects",
                type: "folder",
                children: [
                    { name: "Web Apps", type: "folder" },
                    { name: "Mobile Apps", type: "folder" },
                    { name: "APIs", type: "folder" }
                ]
            },
            {
                name: "Skills",
                type: "folder",
                children: [
                    { name: "Frontend", type: "folder" },
                    { name: "Backend", type: "folder" },
                    { name: "DevOps", type: "folder" }
                ]
            },
            {
                name: "About",
                type: "file",
                extension: "pdf"
            }
        ];
        res.json(folders);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch folders',
            message: error.message
        });
    }
};
