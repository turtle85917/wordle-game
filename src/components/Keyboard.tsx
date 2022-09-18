import { Component } from "react";

import keyboard from "../utils/res/keyboard";

interface P {
  onClick: (key: string) => void;
}

export default class Keyboard extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className="keyboard">
        {keyboard.map(($data, idx) => (
          <div className="column" key={idx}>
            {$data.map(($key, $idx) => (
              <div
                id={$key.key}
                className="item"
                onClick={() => {
                  this.props.onClick($key.key);
                }}
                key={$idx}>{$key.key}</div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}