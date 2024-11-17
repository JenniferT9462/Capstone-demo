//Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown, faMeh } from '@fortawesome/free-solid-svg-icons';


export default function MoodIcon({ mood }) {
    switch (mood) {
        case 'happy':
            return <FontAwesomeIcon icon={faSmile} className="text-yellow-500 text-2xl" />;
        case 'sad':
            return <FontAwesomeIcon icon={faFrown} className="text-blue-500 text-2xl" />;
        case 'neutral':
            return <FontAwesomeIcon icon={faMeh} className="text-gray-500 text-2xl" />;
        default:
            return null;
    }
}