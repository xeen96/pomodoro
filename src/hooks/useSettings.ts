import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Setting } from "../interfaces/interfaces";
import {
  setWorkTime,
  setShortBreakTime,
  setLongBreakTime,
  setRoundsBeforeLongBreak,
  resetTimerSettings,
} from "../redux/slices/timerSlice";
import { useMemo } from "react";



const SETTINGS_CONFIG: Omit<Setting, "value" | "setter">[] = [
  { name: "Work Time", key: "workTime", max: 180 * 60, step: 60 },
  { name: "Short Break", key: "shortBreakTime", max: 60 * 60, step: 60 },
  { name: "Long Break", key: "longBreakTime", max: 120 * 60, step: 60 },
  { name: "Rounds", key: "roundsBeforeLongBreak", max: 12, step: 1 },
];

export function useSettings() {
  const dispatch: AppDispatch = useDispatch();
  const timer = useSelector((state: RootState) => state.timer);

  const settings = useMemo(
    () =>
      SETTINGS_CONFIG.map((config) => ({
        ...config,
        value: timer[config.key],
        setter: (value: number) => {
          switch (config.key) {
            case "workTime":
              dispatch(setWorkTime(value));
              break;
            case "shortBreakTime":
              dispatch(setShortBreakTime(value));
              break;
            case "longBreakTime":
              dispatch(setLongBreakTime(value));
              break;
            case "roundsBeforeLongBreak":
              dispatch(setRoundsBeforeLongBreak(value));
              break;
          }
        },
      })),
    [dispatch, timer]
  );

  return {
    settings,
    resetSettings: () => dispatch(resetTimerSettings()),
  };
}