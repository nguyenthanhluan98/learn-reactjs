import supabase from '../../../supabaseClient';
import user from './../user';

export const createUser = async (user) => {
  const { userWithUserName } = await supabase.from('users').select('*').eq('username', user.username);

  if (userWithUserName) {
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (error) {
    return;
  }

  return data;
};
