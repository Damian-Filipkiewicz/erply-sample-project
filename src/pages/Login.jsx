import * as React from 'react'
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export const Login = () => {
  const [loginCredentials, setLoginCredentials] = React.useState({ login: '', password: '' })

  const handleInput = (value, input_name) => {
    console.warn(value, input_name);
    setLoginCredentials({ ...loginCredentials, [input_name]: value })
  }

  const handleSubmit = () => {
    console.warn('submit');
  }

  return (
    <div>
      <div>
        <p>Login</p>
        <div>
          <TextInput label="E-mail" value={loginCredentials.login} onInput={handleInput} inputName="login"/>
          <TextInput label="Password" value={loginCredentials.password} type="password" onInput={handleInput} inputName="password"/>
          <Button onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  )
}
