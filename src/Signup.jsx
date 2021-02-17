import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
const axios = require('axios');

const Signup = ({setLoginUser, setLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [passTwo, setPassTwo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/signup', { username, password: pass })
      .then(() => {
        setLoginUser(username);
        setLoggedIn(true);
      })
      .catch(() => setLoggedIn(false));
  }

  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={pass} onChange={e => setPass(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" isValid={passTwo && pass === passTwo}
          isInvalid={passTwo && pass !== passTwo}
          value={passTwo} onChange={e => setPassTwo(e.target.value)}></Form.Control>
      </Form.Group>
      <Button type="primary" onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

export default Signup;