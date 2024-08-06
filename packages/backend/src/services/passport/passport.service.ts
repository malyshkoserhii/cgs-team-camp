import { useJwtStrategy } from './strategy/jwt.strategy';
import { useLocalStrategy } from './strategy/local.strategy';
import passportService from 'passport';

useLocalStrategy(passportService);
useJwtStrategy(passportService);

export default passportService;
