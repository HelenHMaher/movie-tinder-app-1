import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../Redux/resetSlice';
import { useDispatch } from 'react-redux';

export const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="resetPassword">
      <input
        type="text"
        value={password}
        onChange={(x) => setPassword(e.target.value)}
      ></input>
      <button onClick={(x) => dispatch(resetPassword(password, token))}>
        Submit
      </button>
    </div>
  );
};
