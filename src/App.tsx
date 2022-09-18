import { useState } from "react";
import Game from "./scene/Game";

function App() {
  const [answer, setAnswer] = useState<string | undefined>();
  const [status, setStatus] = useState<"wasted" | "clear">("wasted");
  const [end, setEnd] = useState<boolean>(false);

  return (
    <>
      <div className="game">
        <Game
          end={(correct, status) => {
            setAnswer(correct);
            setStatus(status);
            setEnd(true);
          }}
        />
      </div>
      {end && <div className="modal">
        <div className={["content", status === "wasted" ? "wrong" : "correct"].join(" ")}>
          <div>Game {status === "clear" ? "Clear" : "Over"}!</div>
          <span className="answer">정답은 {answer}!</span>
        </div>
        <div className="background" />
      </div>}
    </>
  )
}

export default App;