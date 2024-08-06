import Service from './index.service';

export default class UserService extends Service {
	// 	async create(user: IUser): Promise<User> {
	// 		const newUser: User = await User.create(Object.assign(user)).save();
	// 		const activateToken = crypto.randomBytes(32).toString('hex');
	// 		const hash = await bcrypt.hash(activateToken, 10);
	// 		const token = await Token.findOneBy({ userId: newUser.id });
	// 		if (token) await token.remove();
	// 		await Token.create({
	// 			userId: newUser.id,
	// 			token: hash,
	// 		}).save();
	// 		const link = `${process.env.BACK_URL}/api/user/activate/?token=${activateToken}&id=${newUser.id}`;
	// 		sendEmail(
	// 			newUser.email,
	// 			'Account verification',
	// 			{
	// 				name: newUser.name,
	// 				link,
	// 			},
	// 			activateAccTemp,
	// 		);
	// 		return newUser;
	// 	}
	// 	async findOne(userEmail: string): Promise<User> {
	// 		const existUser = await User.findOneByOrFail({ email: userEmail });
	// 		return existUser;
	// 	}
	// 	async requestPasswordReset(userEmail: string) {
	// 		const user = await User.findOneByOrFail({ email: userEmail });
	// 		const token = await Token.findOneBy({ userId: user.id });
	// 		if (token) await token.remove();
	// 		const resetToken = crypto.randomBytes(32).toString('hex');
	// 		const hash = await bcrypt.hash(resetToken, 10);
	// 		await Token.create({
	// 			userId: user.id,
	// 			token: hash,
	// 		}).save();
	// 		const link = `${process.env.CLIENT_URL}/reset-password/?token=${resetToken}&id=${user.id}`;
	// 		sendEmail(
	// 			user.email,
	// 			'Password Reset Request',
	// 			{
	// 				name: user.name,
	// 				link,
	// 			},
	// 			reqPasswordTemp,
	// 		);
	// 		return link;
	// 	}
	// 	async passwordReset({ userId, token, password }: ResetPasswordData) {
	// 		const passwordResetToken = await Token.findOneBy({ userId });
	// 		if (
	// 			!passwordResetToken ||
	// 			passwordResetToken.createdAt > passwordResetToken.expiredAt
	// 		) {
	// 			throw new Error('TOKEN_EXPIRED');
	// 		}
	// 		const isValid = await bcrypt.compare(token, passwordResetToken.token);
	// 		if (!isValid) {
	// 			throw new Error('TOKEN_EXPIRED');
	// 		}
	// 		const newPass = await hashPassword(password);
	// 		await User.update({ id: userId }, { password: newPass });
	// 		await passwordResetToken.remove();
	// 	}
	// 	async activateAcc({ id, token }: ActivateAccData) {
	// 		await User.update({ id }, { active: true });
	// 		const activateToken = await Token.findOneBy({ id });
	// 		if (!activateToken) {
	// 			throw new Error('TOKEN_EXPIRED');
	// 		}
	// 		const isValid = await bcrypt.compare(token, activateToken.token);
	// 		if (!isValid) {
	// 			throw new Error('TOKEN_EXPIRED');
	// 		}
	// 		await activateToken.remove();
	// 	}
}
