import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
const axios = require('axios');

const Login = ({setLoginUser, setLoggedIn, changeView}) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/login', {username, password: pass})
      .then(() =>{
        setLoggedIn(true);
        setLoginUser(username);
      })
      .catch(() => setError(true));
  }

  return (
    <><Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={pass} onChange={e => setPass(e.target.value)}></Form.Control>
      </Form.Group>
      <div className="signup"><a onClick={() => changeView('signup')}>Don't have an account? Sign up!</a></div>
      <Button type="primary" onClick={handleSubmit}>Submit</Button>
    </Form>
    {error && <div className="error">Failed to log in with the given credentials</div>}</>
  )
}

export default Login;