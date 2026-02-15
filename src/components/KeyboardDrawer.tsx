import { Component, For, Show } from "solid-js";
import { ChevronDown } from "lucide-solid";
import { isKeyboardOpen, setIsKeyboardOpen, insertAtCursor, keyboardVars } from "../lib/keyboard";

export default function KeyboardDrawer() {
    return (
        <div
            class={`fixed bottom-0 left-0 right-0 bg-base-200 border-t border-base-300 z-50 transform transition-transform duration-300 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] ${isKeyboardOpen() ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div class="flex justify-between items-center px-2 py-1 bg-base-300 border-b border-base-100">
                <span class="text-xs text-gray-400 px-2 font-mono">Expression Helper</span>
                <button onClick={() => setIsKeyboardOpen(false)} class="btn btn-ghost btn-xs text-gray-400 hover:text-white">
                    <ChevronDown class="w-4 h-4" />
                </button>
            </div>
            <div class="p-2 overflow-x-auto">
                {/* Functions */}
                <div class="flex gap-1 mb-2 overflow-x-auto pb-1 scrollbar-hide">
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor(' + ')}>+</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor(' - ')}>-</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor(' * ')}>*</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor(' / ')}>/</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('(')}>(</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor(')')}>)</button>

                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor(' > ')}>&gt;</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor(' < ')}>&lt;</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor(' === ')}>===</button>

                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('PI')}>PI</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('E')}>E</button>

                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('min()', 1)}>min</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('max()', 1)}>max</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('floor()', 1)}>floor</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('ceil()', 1)}>ceil</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('round()', 1)}>round</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('pow()', 1)}>pow</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('sqrt()', 1)}>sqrt</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('abs()', 1)}>abs</button>

                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('sin()', 1)}>sin</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('cos()', 1)}>cos</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('tan()', 1)}>tan</button>
                    <button class="btn btn-sm btn-neutral font-mono" onClick={() => insertAtCursor('log()', 1)}>log</button>

                    <button class="btn btn-sm btn-warning btn-outline font-mono" onClick={() => insertAtCursor('addPercent()', 1)}>+ %</button>
                    <button class="btn btn-sm btn-warning btn-outline font-mono" onClick={() => insertAtCursor('subtractPercent()', 1)}>- %</button>
                    <button class="btn btn-sm btn-warning btn-outline font-mono" onClick={() => insertAtCursor('percentOf()', 1)}>% Of</button>
                </div>

                {/* Variables */}
                <div id="kb-variables" class="flex gap-1 flex-wrap">
                    <For each={keyboardVars()}>
                        {(v) => (
                            <button class="btn btn-sm btn-accent btn-outline font-mono" onClick={() => insertAtCursor(v)}>
                                {v}
                            </button>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
}