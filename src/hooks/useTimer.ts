import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  tick,
  setWorkTime,
  setShortBreakTime,
  setLongBreakTime,
  setRoundsBeforeLongBreak,
  resetTotalTime,
  resetTimerSettings,
  skipRound,
} from '../redux/slices/timerSlice';

export function useTimer() {
  const dispatch: AppDispatch = useDispatch();
  const {
    mode,
    time,
    isRunning,
    totalTime,
    workTime,
    shortBreakTime,
    longBreakTime,
    roundsBeforeLongBreak,
    round,
  } = useSelector((state: RootState) => state.timer);

  return {
    mode,
    time,
    isRunning,
    round,
    totalTime,
    workTime,
    shortBreakTime,
    longBreakTime,
    roundsBeforeLongBreak,
    start: () => dispatch(startTimer()),
    pause: () => dispatch(pauseTimer()),
    reset: () => dispatch(resetTimer()),
    resetSettings: () => dispatch(resetTimerSettings()),
    setWorkTime: (seconds: number) => dispatch(setWorkTime(seconds)),
    setShortBreakTime: (seconds: number) => dispatch(setShortBreakTime(seconds)),
    setLongBreakTime: (seconds: number) => dispatch(setLongBreakTime(seconds)),
    setRoundsBeforeLongBreak: (round: number) => dispatch(setRoundsBeforeLongBreak(round)),
    resetTotalTime: () => dispatch(resetTotalTime()),
    skipRound: () => dispatch(skipRound()),
    tick: () => dispatch(tick()),
  };
}