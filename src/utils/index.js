import {NotificationManager} from 'react-notifications';

export function notification(msg, type) {
    return NotificationManager[type](msg);
}

export function defineIconStatus(text) {
    let classIcon;
    switch (text) {
        case 'baixa':
            classIcon = 'arrow-down text-info';
            break;

        case 'média':
            classIcon = 'arrow-right text-warning';
            break;

        case 'alta':
            classIcon = 'arrow-up text-danger';
            break;
    
        default:
            classIcon = 'arrow-right text-success';
            break;
    }
    return classIcon;
}

export function limitCharacter(string = '', limit = 0) {  
    const textCrop = string.substring(0, limit);
    if (string.length > textCrop.length) 
        return `${textCrop}[...]`;
    return textCrop;
}