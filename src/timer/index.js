import {useValue} from 'react-tinis';
import React from 'react';
import timeFormat from 'hh-mm-ss';
import {Statuses, StatusState, SecondState} from './states';
import {Resume, Start, Pause, Reset} from './effects';

export default function () {
  const seconds = useValue(SecondState);
  const status = useValue(StatusState);
  return (
    <>
      <h1>Timer App</h1>
      <div>
        <button onClick={Start} disabled={status !== Statuses.Stopped}>
          Start
        </button>
        <button onClick={Reset} disabled={status === Statuses.Stopped}>
          Reset
        </button>
        <button onClick={Pause} disabled={status !== Statuses.Running}>
          Pause
        </button>
        <button onClick={Resume} disabled={status !== Statuses.Pausing}>
          Resume
        </button>
      </div>
      <h2>{timeFormat.fromS(seconds)}</h2>
    </>
  );
}
