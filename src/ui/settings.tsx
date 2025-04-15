import { useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../utils/formatTime";
import { MAX_VALUES } from "../constants/settings";
import { Setting } from "../interfaces/interfaces";
import { FiAlertTriangle } from "react-icons/fi";
import { useTimeout } from "../hooks/useTimeout";
import clsx from "clsx";

interface FieldProps {
  step: number;
  max: number;
  displayValue: string | number;
}

const getFieldProps = (setting: Setting): FieldProps => {
  const isRounds = setting.name === "Rounds";
  return {
    step: isRounds ? 1 : 60,
    max: isRounds ? setting.max : setting.max * 60,
    displayValue: isRounds ? setting.value : formatTime(setting.value),
  };
};

export default function Settings() {
  const {
    isRunning,
    workTime,
    shortBreakTime,
    longBreakTime,
    roundsBeforeLongBreak,
    setWorkTime,
    setShortBreakTime,
    setLongBreakTime,
    setRoundsBeforeLongBreak,
    resetSettings,
  } = useTimer();

  const [isWarningVisible, setIsWarningVisible] = useState<boolean>(false);  
  useTimeout(
    () => {
      if (isWarningVisible) {
        setIsWarningVisible(false);
      }
    },
    isWarningVisible ? 5000 : null
  );
  
  const handleResetClick = () => {
    if (!isWarningVisible) {
      setIsWarningVisible(true);
    } else {
      resetSettings();
      setIsWarningVisible(false);
    }
  };

  const settings = [
    {
      name: "Work Time",
      value: workTime,
      max: MAX_VALUES.WORK_TIME,
      setter: setWorkTime,
    },
    {
      name: "Short Break",
      value: shortBreakTime,
      max: MAX_VALUES.BREAK,
      setter: setShortBreakTime,
    },
    {
      name: "Long Break",
      value: longBreakTime,
      max: MAX_VALUES.LONG_BREAK,
      setter: setLongBreakTime,
    },
    {
      name: "Rounds",
      value: roundsBeforeLongBreak,
      max: MAX_VALUES.MAX_ROUNDS,
      setter: setRoundsBeforeLongBreak,
    },
  ];



  return (
    <section className="flex flex-col min-h-full justify-evenly">
      {settings.map((setting) => {
        const { step, max, displayValue } = getFieldProps(setting);
        return (
          <div
            key={setting.name}
            className="flex flex-col items-center justify-center p-4 border-b-1 border-gray-500 space-y-4"
          >
            <label
              htmlFor={setting.name.split(" ").join("").toLowerCase()}
              className="text-sm font-semibold"
            >
              {setting.name}
            </label>
            <input
              className="accent-cyan-500 w-full h-1"
              id={setting.name.split(" ").join("").toLowerCase()}
              type="range"
              value={setting.value}
              step={step}
              max={max}
              disabled={isRunning}
              onChange={(e) => setting.setter(parseInt(e.target.value))}
            />
            <p className="text-xl">{displayValue}</p>
          </div>
        );
      })}
      <section className="flex flex-col space-y-2 text-center items-center mb-2">
        <button
          className={clsx("text-gray-500 bg-slate-900 w-full h-12 rounded-sm transition-colors duration-200",
            {
             "bg-red-900 text-red-500": isWarningVisible 
            }
          )}
          onClick={handleResetClick}
          aria-label={
            isWarningVisible
              ? "Confirm reset to default settings"
              : "Reset timer to default state"
          }
        >
          {isWarningVisible ? "Confirm Reset" : "Reset to Default"}
        </button>
          <div className={clsx("flex flex-col items-center space-x-2 animate-pulse",
            {
              "hidden": !isWarningVisible,
            }
          )}>
            <FiAlertTriangle className="text-red-700" />
            <p className="text-red-700 text-sm font-bold">
            The current progress will be reset
            </p>
          </div>
      </section>
    </section>
  );
}