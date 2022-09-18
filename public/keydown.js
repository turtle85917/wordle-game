window.addEventListener("keydown", (event) => {
  const { key } = event;
  console.log(key);

  if (key.match(/[a-zA-Z]/) && (key === "Backspace" || key.length === 1)) {
    window.dispatchEvent(new CustomEvent("input-answer", {
      detail: {
        input: key.toLowerCase()
      },
      bubbles: true,
      cancelable: true
    }));
  }
});