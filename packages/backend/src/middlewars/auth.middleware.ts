import passportService from '@/services/passport/passport.service';

export const localAuth = passportService.authenticate('local', {
	session: false,
});

export const jwtAuth = passportService.authenticate('jwt', {
	session: false,
});
