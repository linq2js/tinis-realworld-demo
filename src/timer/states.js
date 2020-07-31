import {state} from 'tinis';

export const Statuses = {
  Stopped: 1,
  Running: 2,
  Pausing: 3,
};

export const StatusState = state(Statuses.Stopped);
export const SecondState = state(0);
