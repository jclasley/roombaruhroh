import {useState, useEffect} from 'react';
const axios = require('axios');

export const useBets = (user) => {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    axios.get(`/bets/${user}`)
      .then(({data}) => setBets(data))
  }, []);

  return bets;
}

export const useTodayBets = (betSet) => {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    axios.get('/bets/today')
      .then(({data}) => setBets(data))
  }, [betSet]);
  return bets;
}

export const useRoombaDay = () => {
  const now = new Date(Date.now());
  const rightDay = now.getDay() % 2 !== 0;
  const beforeTime = now.toLocaleTimeString('en-US', {hour12: false, timeZone: 'MST'}).slice(0, 2) < 10;
  return rightDay && beforeTime;
}