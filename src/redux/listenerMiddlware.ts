import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  setWorkTime,
  setLongBreakTime,
  setShortBreakTime,
  setRoundsBeforeLongBreak,
  resetTimerSettings,
} from "./slices/timerSlice";
import type { RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(
    setWorkTime,
    setLongBreakTime,
    setShortBreakTime,
    setRoundsBeforeLongBreak,
    resetTimerSettings
  ),
  effect: (_, listenerApi) => {
        localStorage.setItem("workTime", JSON.stringify((listenerApi.getState() as RootState).timer.workTime));
        localStorage.setItem("longBreakTime", JSON.stringify((listenerApi.getState() as RootState).timer.longBreakTime));
        localStorage.setItem("shortBreakTime", JSON.stringify((listenerApi.getState() as RootState).timer.shortBreakTime));
        localStorage.setItem("roundsBeforeLongBreak", JSON.stringify((listenerApi.getState() as RootState).timer.roundsBeforeLongBreak));
    }
  });