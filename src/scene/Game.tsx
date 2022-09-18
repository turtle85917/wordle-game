import { Component } from "react";

import getWord from "../utils/get-word";
import createBoard from "../utils/create-board";

import Keyboard from "../components/Keyboard";

interface P {
  end: (correct: string, status: "wasted" | "clear") => void;
}

interface S {
  answer: string;
  board: string[][];
  boardIdx: number;
}

export default class Game extends Component<P, S> {
  constructor(props: P) {
    super(props);

    this.state = {
      answer: "",
      board: [],
      boardIdx: 0
    };
  }

  async componentDidMount() {
    const answer = await getWord();

    this.setState({
      answer,
      board: createBoard(answer)
    });

    window.addEventListener("input-answer", (event) => {
      const { detail: { input } } = event as CustomEvent<{ input: string }>;
      this.inputKey(input);
    });
  }

  inputKey(key: string) {
    const inputIdx = this.state.board[this.state.boardIdx].findIndex(tile => !tile);
    this.setState({
      board: this.state.board.map((tiles, $idx) => {
        return tiles.map((tile, idx) => {
          if ($idx === this.state.boardIdx) {
            if (key.length === 1 && idx === inputIdx) {
              const keyboard = document.querySelector(`div.item#${key.toUpperCase()}`);
              if (!keyboard?.className.includes("disabled")) tile = key.toUpperCase();
            }
  
            if (key === "backspace" && idx === inputIdx - 1) {
              tile = '';
            }
          }

          return tile;
        });
      })
    }, () => {
      if (this.state.board[this.state.boardIdx].findIndex(tile => !tile) === -1) {
        const tile = document.querySelector(`div#tile-${this.state.boardIdx}`) || document.createElement("div");
        for (const $children of tile.children) {
          const idx = +$children.id;
          const currentTile = this.state.board[this.state.boardIdx];

          const input = currentTile[idx].toLowerCase();
          const answer = this.state.answer[idx].toLowerCase();

          if (input === answer) $children.classList.add("correct");
          else if (this.state.answer.includes(input)) $children.classList.add("too-bad");
          else {
            $children.classList.add("wrong");

            const key = document.querySelector(`div.item#${input.toUpperCase()}`);
            key?.classList.add("disabled");
          }
        }
      }

      this.setState({
        boardIdx: this.state.board.findIndex(tiles => tiles.findIndex(tile => !tile) !== -1)
      }, () => {
        const boardIdx = this.state.boardIdx < 0 ? this.state.board.length - 1 : this.state.boardIdx - 1;

        const checkAnswer = this.state.board[boardIdx]?.join("");
        const condition = checkAnswer?.toUpperCase() === this.state.answer.toUpperCase();

        if (condition || this.state.boardIdx === -1) {
          document.querySelector("div.game")?.classList.add("end");
          this.props.end(this.state.answer, condition ? "clear" : "wasted");
        }
      });
    });
  }

  render() {    
    return (
      <>
        <div className="board">
          {this.state.board.map((tiles, idx) => (
            <div id={`tile-${idx}`} className={["line", idx === this.state.boardIdx ? "active" : undefined].join(" ").trim()} key={idx}>
              {tiles.map(($val, $idx) => (
                <div id={$idx.toString()} className="text" key={$idx}>{$val}</div>
              ))}
            </div>
          ))}
        </div>
        <Keyboard
          onClick={(key) => {
            this.inputKey(key);
          }} />
      </>
    )
  }
}