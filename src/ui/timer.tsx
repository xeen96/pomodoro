import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../utils/formatTime";
import { PauseBtn, PlayBtn, ResetBtn, SkipBtn } from "./buttons";
import { TimerManager } from "./timerManager";

export default function Timer() {
  const {
    time,
    mode,
    isRunning,
    pause,
    start,
    round,
    roundsBeforeLongBreak,
    skipRound,
    totalTime,
    reset,
  } = useTimer();

  return (
    <>
      <TimerManager />
      <div className="w-full flex flex-col justify-between items-center">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-[60vmin] aspect-square rounded-full border-2 border-cyan-500 shadow-md flex justify-center flex-col text-amber-50 mb-12">
            <p className="text-[25vmin] place-self-center  font-playfair-display antialiased ">
              {formatTime(time)}
            </p>
            <p className=" place-self-center relative text-[4vmin] antialiased font-playfair-display">
              {mode === "longBreak" ? "LONG BREAK" : mode.toLocaleUpperCase()}
            </p>
          </div>
          <section className="flex flex-col w-[60vmin] items-center space-y-2 ">
            <button
              className="rounded-full transition duration-200 linear hover:bg-gray-5s00"
              onClick={isRunning ? pause : start}
              title={isRunning ? "Pause Timer" : "Start Timer"}
            >
              {isRunning ? <PauseBtn size="4rem" /> : <PlayBtn size="4rem" />}
            </button>
            <h2 className="text-cyan-500">Total: {formatTime(totalTime)}</h2>
          </section>
        </div>
        <section className="flex justify-around items-center w-full gap-5 bg-slate-800 h-12 space-y-1 p-2 text-cyan-500">
          <button onClick={reset} title="Reset Timer">
            <ResetBtn size="2rem" />
          </button>
          <p>
            {round}/{roundsBeforeLongBreak}
          </p>
          <button onClick={skipRound} title="Skip Current Mode">
            <SkipBtn size="2rem" />
          </button>
        </section>
      </div>
    </>
  );
}
