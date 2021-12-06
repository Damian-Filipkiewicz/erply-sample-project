import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../api';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { clientCode } from '../config';

export const Login = () => {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = React.useState({ username: '', password: '' });
  const [errorLogin, setErrorLogin] = React.useState(false);
  const handleInput = (value, input_name) => {
    setLoginCredentials({ ...loginCredentials, [input_name]: value });
    setErrorLogin(false);
  };

  const handleSubmit = async () => {
    await verifyUser('', {
      clientCode: clientCode,
      username: loginCredentials.username,
      password: loginCredentials.password,
      request: 'verifyUser',
      sessionLength: 28800,
      sendContentType: 1,
    }).then(response => {
      if (response.status && response.status === 200) {
        navigate('/product-list');
      } else {
        setErrorLogin(true);
      }
    })
      .catch(e => console.error(e));
  };


  return (
    <div className="login__wrapper">
      <div className="login__box">
        <p className="login__title">Sign in</p>
        <TextInput placeholder="Username" value={loginCredentials.username} onInput={handleInput} inputName="username"/>
        <TextInput
          placeholder="Password" value={loginCredentials.password} type="password" onInput={handleInput}
          inputName="password"
        />
        {errorLogin && <p className="login__error">Your login and password are wrong</p>}
        <Button onClick={handleSubmit} label="Login"/>
      </div>
    </div>
  );
};
