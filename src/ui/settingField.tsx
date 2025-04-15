import { memo } from "react";
import { formatTime } from "../utils/formatTime";

interface SettingFieldProps {
  setting: {
    name: string;
    value: number;
    max: number;
    step: number;
    setter: (value: number) => void;
  };
  isRunning: boolean;
}

export const SettingField = memo(({ setting, isRunning }: SettingFieldProps) => {
  const id = setting.name.split(" ").join("").toLowerCase();
  const displayValue = setting.name === "Rounds" ? setting.value : formatTime(setting.value);

  return (
    <div className="flex flex-col items-center justify-center p-4 border-b-1 border-gray-500 space-y-4">
      <label htmlFor={id} className="text-sm font-semibold">
        {setting.name}
      </label>
      <input
        className="accent-cyan-500 w-full h-1"
        id={id}
        type="range"
        value={setting.value}
        step={setting.step}
        max={setting.max}
        disabled={isRunning}
        onChange={(e) => setting.setter(Number(e.target.value))}
      />
      <p className="text-xl">{displayValue}</p>
    </div>
  );
});