export default function click(
  this: { count: number },
  event: MouseEvent,
  _signal: AbortSignal,
) {
  console.log("click registered");

  if (event.target instanceof HTMLElement) {
    this.count++;
    event.target.textContent = `Clicked ${this.count}`;
  }
}
