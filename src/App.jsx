import React, {useState} from 'react';
import Login from './Login';
import Signup from './Signup';
import Bet from './Bet';

const App = () => { 
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setLoginUser] = useState('');
  const [view, changeView] = useState('login');
  if (loggedIn) {
    return <Bet user={username} />
  }
  if (view === 'login') {
    return <Login setLoggedIn={setLoggedIn} setLoginUser={setLoginUser} changeView={changeView} />
  }

  if (view === 'signup') {
    return <Signup setLoggedIn={setLoggedIn} setLoginUser={setLoginUser} />
  }
  return (
    <>
      <Login setLoggedIn={setLoggedIn} />
      {loggedIn && <div>Logged in!</div>}
    </>
  )
 };

export default App;
