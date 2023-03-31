// Creates a keyframe CSS block from template literal and appends to <head>
export function keyframes(strings) {
  const style = document.createElement("style");
  style.textContent = `${strings}`;
  document.head.appendChild(style);
  return `${strings}`;
}
