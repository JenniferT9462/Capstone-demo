//Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown, faMeh, faGrinStars, faAngry, faTired } from '@fortawesome/free-solid-svg-icons';


export default function MoodIcon({ mood }) {
    switch (mood) {
        case 'happy':
            return <FontAwesomeIcon icon={faSmile} className="text-yellow-500 text-2xl" />;
        case 'sad':
            return <FontAwesomeIcon icon={faFrown} className="text-blue-500 text-2xl" />;
        case 'neutral':
            return <FontAwesomeIcon icon={faMeh} className="text-gray-500 text-2xl" />;
        case 'excited':
            return <FontAwesomeIcon icon={faGrinStars} className="text-orange-500 text-2xl" />;
        case 'angry':
            return <FontAwesomeIcon icon={faAngry} className="text-red-500 text-2xl" />;
        case 'sleepy':
            return <FontAwesomeIcon icon={faTired} className="text-indigo-500 text-2xl" />;
        default:
            return null;
    }
}