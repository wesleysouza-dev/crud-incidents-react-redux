import {NotificationManager} from 'react-notifications';

export function notification(msg, type) {
    return NotificationManager[type](msg);
}
