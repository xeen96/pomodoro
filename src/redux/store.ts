import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./slices/timerSlice";
import { listenerMiddleware } from "./listenerMiddlware";
import { initialState } from "./slices/timerSlice";

// idk how to better impliment this, but this is the only way i found to get the initial state from localStorage
const loadFromLocalStorage = () => {
  const workTime = JSON.parse(localStorage.getItem("workTime") || "null");
  const longBreakTime = JSON.parse(localStorage.getItem("longBreakTime") || "null");
  const shortBreakTime = JSON.parse(localStorage.getItem("shortBreakTime") || "null");
  const roundsBeforeLongBreak = JSON.parse(localStorage.getItem("roundsBeforeLongBreak") || "null");

  return {
    timer: {
      ...initialState,
      workTime: workTime || initialState.workTime,
      longBreakTime: longBreakTime || initialState.longBreakTime,
      shortBreakTime: shortBreakTime || initialState.shortBreakTime,
      roundsBeforeLongBreak: roundsBeforeLongBreak || initialState.roundsBeforeLongBreak,
      time: workTime || initialState.workTime,
    }
  };
};

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),

  preloadedState: loadFromLocalStorage(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;