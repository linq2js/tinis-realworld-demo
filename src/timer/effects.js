import {effect, task} from 'tinis';
import {SecondState, StatusState, Statuses} from './states';

export const Start = effect(() => {
  StatusState.value = Statuses.Running;
});
export const Pause = effect(() => {
  StatusState.value = Statuses.Pausing;
});
export const Resume = effect(() => {
  StatusState.value = Statuses.Running;
});
export const Reset = effect(() => {
  StatusState.value = Statuses.Stopped;
  SecondState.value = 0;
});
export const Tick = effect(function* () {
  yield task.delay(200);
  SecondState.value++;
});

export const TimerEpic = effect(function* () {
  // wait until Start effect called
  while (yield Start) {
    while (true) {
      const isPausing = StatusState.value === Statuses.Pausing;
      // wait effect calls
      const {$target} = yield {
        PauseOrResume: isPausing ? Resume : Pause,
        Reset,
        // run tick effect, it will be cancelled if PauseOrResume/Reset effect called
        Tick: isPausing ? null : Tick(),
      };

      if ($target === Reset) {
        break;
      }
    }
  }
});

// run epic
TimerEpic();
