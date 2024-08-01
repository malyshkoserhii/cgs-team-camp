import { NotificationEnum } from './model/enums';
import { Notification } from './notification.service';

const notificationService = new Notification();

export { NotificationEnum, notificationService };
export {
	type NotificationPayload,
	type NotificationService,
} from './model/types';
