import { useEffect, useState } from 'react';
import moment from 'moment';
import Body from './Body';

function Requests() {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD')); 

  function sendRequest() {
    console.log(date)
    return (
      <div>
        <Body date={date} />
      </div>
    );
  }

  return (
    <div>
      <input 
        type="date" 
        value={date} 
        onChange={(event) => setDate(event.target.value)} 
      />
      {sendRequest()}
    </div>
  );
}

export default Requests;
