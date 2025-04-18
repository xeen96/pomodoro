import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimerState } from '../../definitions/definitions';


export const initialState: TimerState = {
  mode: 'work',
  time: 25 * 60, // 25min
  isRunning: false,
  round: 1,
  totalTime: 0,
  workTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  roundsBeforeLongBreak: 4,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers:  {
    startTimer(state) {
      state.isRunning = true;
    },
    pauseTimer(state) {
      state.isRunning = false;
    },
    resetTimer(state) {
      state.isRunning = false;
      switch (state.mode) {
        case 'work':
          state.time = state.workTime;
          break;
        case 'break':
          state.time = state.shortBreakTime;
          break;
        case 'longBreak':
          state.time = state.longBreakTime;
          break;
        default:
          state.time = state.workTime;
          break;
      }
    },
    resetTimerSettings(state) {
      Object.assign(state, initialState);
    },

    tick(state) {
      console.log('tick', state.time, state.mode, state.round, state.totalTime);
      if (state.isRunning && state.time > 0) {
        state.time -= 1;
        state.totalTime += 1; 
      }
      if (state.time === 0) {
        if (state.mode === 'work') {
          if (state.round % state.roundsBeforeLongBreak === 0) {
            state.mode = 'longBreak';
            state.time = state.longBreakTime;
          } else {
            state.mode = 'break';
            state.time = state.shortBreakTime;
          }
        } else if (state.mode === 'break') {
          state.mode = 'work';
          state.round += 1;
          state.time = state.workTime;
        }
        else {
          state.mode = 'work';
          state.round = 1;
          state.time = state.workTime;
        }
      }
  },
  setWorkTime(state, action: PayloadAction<number>) {
    state.workTime = action.payload;
    if (state.mode === 'work') {
      state.time = action.payload;
    }
  },
  setShortBreakTime(state, action: PayloadAction<number>) {
    state.shortBreakTime = action.payload;
    if (state.mode === 'break') {
      state.time = action.payload;
    }
  },
  setLongBreakTime(state, action: PayloadAction<number>) {
    state.longBreakTime = action.payload;
    if (state.mode === 'longBreak') {
      state.time = action.payload;
    }
  },
  setRoundsBeforeLongBreak(state, action: PayloadAction<number>) {
    if (state.round >= action.payload) {
      state.roundsBeforeLongBreak = state.round + 1;
    }else 
      state.roundsBeforeLongBreak = action.payload;
  },
  resetTotalTime(state) {
    state.totalTime = 0;
  },

  skipRound(state) {
    state.isRunning = false;
    if (state.mode === 'work') {
      if (state.round % state.roundsBeforeLongBreak === 0) {
        state.mode = 'longBreak';
        state.time = state.longBreakTime;
      } else {
        state.mode = 'break';
        state.time = state.shortBreakTime;
      }
    } else if (state.mode === 'break') {
      state.mode = 'work';
      state.round += 1;
      state.time = state.workTime;
    }
    else {
      state.mode = 'work';
      state.round = 1;
      state.time = state.workTime;
    }

  }
  
},
});

export const {
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
} = timerSlice.actions;

export default timerSlice.reducer;