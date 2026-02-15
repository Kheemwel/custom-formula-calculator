import { createSignal } from "solid-js";

export const [isKeyboardOpen, setIsKeyboardOpen] = createSignal(false);
export const [activeInput, setActiveInput] = createSignal<HTMLInputElement | null>(null);
export const [keyboardVars, setKeyboardVars] = createSignal<string[]>([]);

export function insertAtCursor(text: string, cursorOffset = 0) {
    const input = activeInput();
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const val = input.value;

    // Insert text
    const newVal = val.substring(0, start) + text + val.substring(end);
    input.value = newVal;

    // Trigger input event manually so SolidJS or other listeners pick it up
    input.dispatchEvent(new Event('input', { bubbles: true }));

    // Position cursor
    const newPosition = start + text.length - cursorOffset;
    input.selectionStart = input.selectionEnd = newPosition;
    input.focus();
}

export function registerInput(el: HTMLInputElement, vars?: string[]) {
    // This could be used to set specific variables for specific inputs if we wanted context-aware keyboards
}
