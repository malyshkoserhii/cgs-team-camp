import passportService from 'passport';
import { useJwtStrategy } from './strategy/jwtAuth';
import { useLocalStrategy } from './strategy/localAuth';

useLocalStrategy(passportService);
useJwtStrategy(passportService);

export default passportService;
