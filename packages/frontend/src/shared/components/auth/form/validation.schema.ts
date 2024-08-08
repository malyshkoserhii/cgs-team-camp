import * as Yup from 'yup';

export const authSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('Required')
});
