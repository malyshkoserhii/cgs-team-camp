import * as Yup from 'yup';

export const resetSchema = Yup.object().shape({
  password: Yup.string().min(4).max(20).required('Required')
});
