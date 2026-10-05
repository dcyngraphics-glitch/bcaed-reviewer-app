import { fireEvent, type Screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Types into a controlled input.
 *
 * `userEvent.type` drops characters on React controlled inputs under happy-dom
 * — a ten-character name lands as "J", because each keystroke re-renders from
 * stale state. `fireEvent.change` sets the value in one shot and React's
 * onChange fires once with the whole string, which is what these tests need.
 *
 * Use `userEvent` for clicks and other interactions; use this for typing.
 */
export function typeInto(screen: Screen, label: RegExp | string, value: string): void {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

/** Clicks a button by accessible name, with real pointer event semantics. */
export async function clickButton(screen: Screen, name: RegExp | string): Promise<void> {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name }));
}

/**
 * Clicks an element directly.
 *
 * Native `element.click()` does NOT dispatch a React-synthesised event under
 * happy-dom, so an onClick handler never runs and nothing re-renders — with no
 * error at all. `fireEvent.click` goes through React's event system.
 */
export function clickElement(element: Element): void {
  fireEvent.click(element);
}
