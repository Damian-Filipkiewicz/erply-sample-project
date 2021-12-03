import * as React from 'react';
import { callApi } from '../api';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate()
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
    }).then(response => response.status === 200 && navigate('/product-list'));
  };


  return (
    <div className="login__wrapper">
      <div className="login__box">
        <p className="login__title">Sign in</p>
        <TextInput placeholder="Username" value={loginCredentials.username} onInput={handleInput} inputName="username"/>
        <TextInput
          placeholder="Password" value={loginCredentials.password} type="password" onInput={handleInput} inputName="password"
        />
        <Button onClick={handleSubmit} label="Login"/>
      </div>
    </div>
  );
};
