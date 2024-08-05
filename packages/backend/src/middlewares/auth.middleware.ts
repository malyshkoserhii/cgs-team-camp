import passportService from '@/services/passport.service';

export const localAuth = passportService.authenticate('local', {
	session: false,
});
