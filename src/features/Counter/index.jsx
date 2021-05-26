import React from 'react';
import { decrement, increment, incrementByAmount } from './counterSlice';
import { useDispatch, useSelector } from 'react-redux';

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  console.log(count);

  const handleIncrementClick = () => {
    const action = increment();
    console.log(action);
    dispatch(increment());
  };

  const handleDecrementClick = () => {
    const action = decrement();
    console.log(action);
    dispatch(action);
  };

  const handleIncrementByAmountClick = () => {
    const action = incrementByAmount(10);
    console.log(action);
    dispatch(action);
  };

  return (
    <div>
      <p> Count {count}</p>

      <button onClick={handleIncrementClick}>Increse</button>
      <button onClick={handleDecrementClick}>Drese</button>
      <button onClick={handleIncrementByAmountClick}>Increse with amount</button>
    </div>
  );
}

export default CounterFeature;
