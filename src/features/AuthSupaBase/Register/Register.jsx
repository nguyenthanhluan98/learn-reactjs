import React from 'react';
import { supabase } from 'supabaseClient';
import RegisterForm from './../../AuthSupaBase/RegisterForm/index';

Register.propTypes = {};

function Register(props) {
  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;
      console.log({ email, password });
      const { error } = await supabase.auth.signUp({ email: email, password: password });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      console.log('Failed to');
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
