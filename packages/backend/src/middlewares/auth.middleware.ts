import passportService from '@/services/passport.service';

export const localAuth = passportService.authenticate('local', {
	session: false,
});

export const jwtAuth = passportService.authenticate('jwt', {
	session: false,
});
