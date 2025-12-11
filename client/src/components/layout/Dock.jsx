import AppIcon from '../ui/AppIcon';
import '../../styles/Dock.css';

const Dock = ({ apps, onAppClick }) => {
    return (
        <div className="dock-container">
            <div className="dock glass">
                {apps.map(app => (
                    <AppIcon
                        key={app.id}
                        type={app.id}
                        label={app.name}
                        onClick={() => onAppClick(app.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dock;
