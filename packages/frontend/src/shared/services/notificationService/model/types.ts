import { type NotificationEnum } from './enums.js';

type NotificationService = {
	[K in ValueOf<typeof NotificationEnum>]: (message?: string) => void;
};

type NotificationPayload = {
	type: ValueOf<typeof NotificationEnum>;
	message: string;
};

export { type NotificationPayload, type NotificationService };
