import * as React from 'react';
import { callApi } from '../api';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export const Login = () => {
  const [loginCredentials, setLoginCredentials] = React.useState({ username: '', password: '' });

  const handleInput = (value, input_name) => {
    setLoginCredentials({ ...loginCredentials, [input_name]: value });
  };

  const handleSubmit = async () => {
    await callApi('', {
      clientCode: 372,
      username: loginCredentials.username,
      password: loginCredentials.password,
      request: 'verifyUser',
      sendContentType: 1,
    });
  };


  return (
    <div className="login__wrapper">
      <div className="login__box">
        <p className="login__title">Sign in</p>
        <TextInput label="Username" value={loginCredentials.username} onInput={handleInput} inputName="username"/>
        <TextInput
          label="Password" value={loginCredentials.password} type="password" onInput={handleInput} inputName="password"
        />
        <Button onClick={handleSubmit} label="Login"/>
      </div>
    </div>
  );
};
