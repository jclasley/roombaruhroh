import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useBets, useTodayBets, useRoombaDay} from './hooks/useBets';
const axios = require('axios');

const Bet = ({user}) => {
  const userBets = useBets(user);
  const [todayBets, setTodayBets] = useState([]);
  const [betSuccess, setBetSuccess] = useState(null);
  const [betDuration, setBetDuration] = useState('');
  const betAvail = useRoombaDay();

  const getBets = () => {
    axios.get('/bets/today')
      .then(({data}) => setTodayBets(data));
  }

  useEffect(()=> {
    getBets();
  }, []);
  useEffect(() => {
    getBets();
  }, [betSuccess])

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/bets', {username: user, duration: betDuration})
      .then(() => setBetSuccess(true))
  }

  return (
    <>
      <div className="home">
        <div className="greeting">
          Welcome {user}!
        </div>

        {betAvail 
          ? 
          (<div className="create-bet">
            The roomba kicks off at 10 AM today
            <hr/>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Duration</Form.Label>
                <Form.Control type="text"
                  disabled={todayBets.filter(bet => bet.username === user).length}
                  value={betDuration} onChange={e => setBetDuration(e.target.value)}
                  isValid={betDuration && /^.*?:[0-5].$/.test(betDuration)}></Form.Control>
              </Form.Group>
              <Button type="primary" onClick={handleSubmit}>Place bet</Button>
            </Form>
            {todayBets.filter(bet => bet.username === user).length && <div>You've already bet today!</div>}
            <hr />
          </div>)
          :
          (<div className="not-today"> No bets can be placed.</div>)}
          <div className="standing-bets">
            {todayBets && todayBets.map(bet => (
              <div className="bet">
                {bet.username}
                <ul>
                  <li>Duration: {bet.duration}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
    </>
  )

}

export default Bet;