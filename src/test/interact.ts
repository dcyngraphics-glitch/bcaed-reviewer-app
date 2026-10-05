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

/** Clicks with real event semantics (focus, pointer events) rather than .click(). */
export async function clickButton(screen: Screen, name: RegExp | string): Promise<void> {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name }));
}
