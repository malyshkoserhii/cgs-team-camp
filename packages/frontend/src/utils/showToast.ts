import { Toaster, Position, Intent } from '@blueprintjs/core';

const AppToaster = Toaster.create({ position: Position.TOP });

export const showToast = (message: string, intent: Intent = Intent.SUCCESS) => {
	AppToaster.show({ message, intent });
};
