export interface TimerState {
  mode: 'work' | 'break' | 'longBreak';
  time: number; // time in seconds
  isRunning: boolean;
  round: number;
  totalTime: number;
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  roundsBeforeLongBreak: number;
};

export interface Setting {
  name: string;
  value: number;
  max: number;
  setter: (value: number) => void;
};
