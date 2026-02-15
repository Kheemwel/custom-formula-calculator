import { Component, For, createEffect, onMount, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import { LogIn, X, Lock, Calculator } from "lucide-solid";
import { Formula, FormulaInput, FormulaConstant, FormulaOutput } from "../types";
import { formulaStore } from "../lib/store";
import { setActiveInput, setKeyboardVars, setIsKeyboardOpen } from "../lib/keyboard";
import Header from "./Header";

interface FormulaEditorFormProps {
    initialData?: Formula;
}

export default function FormulaEditorForm(props: FormulaEditorFormProps) {
    const navigate = useNavigate();

    // Form State
    const [form, setForm] = createStore<Formula>({
        id: crypto.randomUUID(),
        title: "",
        desc: "",
        inputs: [],
        constants: [],
        outputs: []
    });

    onMount(() => {
        if (props.initialData) {
            setForm(JSON.parse(JSON.stringify(props.initialData)));
        }
    });

    // Update keyboard vars whenever inputs/constants change
    createEffect(() => {
        const vars: string[] = [];
        form.inputs.forEach(i => i.name && vars.push(i.name));
        form.constants.forEach(c => c.name && vars.push(c.name));
        setKeyboardVars(vars);
    });

    const handleFocus = (e: FocusEvent) => {
        const target = e.target as HTMLInputElement;
        // If it's an expression input or variable name input, we might want keyboard
        // Original only showed for 'expression-input' (outputs)?
        // Let's Check original: classList.contains('expression-input').
        // Run view: inputs used keyboard? No only editor logic.
        // Editor view: outputs expression used keybaord.
        // Also Names? No.

        // I will enable it for Output Expression inputs.
        // Maybe also for Input Names if user wants to type fancy chars? No, mostly for variables.

        if (target.dataset.type === 'expression') {
            setActiveInput(target);
            setIsKeyboardOpen(true);
        }
    };

    const handleSave = () => {
        if (!form.title.trim()) {
            alert("Please enter a title");
            return;
        }
        formulaStore.addFormula(JSON.parse(JSON.stringify(form)));
        setIsKeyboardOpen(false);
        navigate("/");
    };

    // Helper to add items
    const addInput = () => setForm("inputs", ((prev) => [...prev, { name: "", val: 0, unit: "", display: "" }]));
    const addConstant = () => setForm("constants", ((prev) => [...prev, { name: "", val: 0, unit: "", display: "" }]));
    const addOutput = () => setForm("outputs", ((prev) => [...prev, { name: "", expr: "", unit: "" }]));

    // Helper to remove items
    const removeInput = (idx: number) => setForm("inputs", (prev) => prev.filter((_, i) => i !== idx));
    const removeConstant = (idx: number) => setForm("constants", (prev) => prev.filter((_, i) => i !== idx));
    const removeOutput = (idx: number) => setForm("outputs", (prev) => prev.filter((_, i) => i !== idx));

    // Move items (optional polish)

    return (
        <div class="h-screen flex flex-col bg-base-100 font-mono">
            <Header
                title={props.initialData ? "Edit Formula" : "New Formula"}
                showBack={true}
            />

            <main class="flex-1 overflow-y-auto p-4 pb-64 w-full space-y-6">

                {/* Meta Data */}
                <div class="card bg-base-200 shadow border border-base-300">
                    <div class="card-body p-4">
                        <h2 class="card-title text-base-content/70 text-sm border-b border-base-300 pb-2 mb-2">Meta Data</h2>
                        <div class="grid gap-4">
                            <div class="form-control w-full">
                                <label class="label"><span class="label-text text-xs uppercase text-gray-400">Formula Title</span></label>
                                <input type="text" class="input input-bordered w-full" placeholder="e.g. Cylinder Volume"
                                    value={form.title} onInput={(e) => setForm("title", e.currentTarget.value)} />
                            </div>
                            <div class="form-control w-full">
                                <label class="label"><span class="label-text text-xs uppercase text-gray-400">Description</span></label>
                                <input type="text" class="input input-bordered w-full" placeholder="Description..."
                                    value={form.desc || ""} onInput={(e) => setForm("desc", e.currentTarget.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inputs */}
                <div class="collapse collapse-arrow bg-base-200 border border-base-300">
                    <input type="checkbox" checked />
                    <div class="collapse-title  font-bold flex items-center gap-2">
                        <LogIn class="w-4 h-4" /> Inputs
                    </div>
                    <div class="collapse-content space-y-3">
                        <For each={form.inputs}>
                            {(item, i) => (
                                <div class="flex items-start gap-2 bg-base-100 p-2 rounded border border-base-300">
                                    <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                                        <div>
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Var Name</span></label>
                                            <input type="text" class="input input-sm input-bordered w-full font-mono " placeholder="var"
                                                value={item.name} onInput={(e) => setForm("inputs", i(), "name", e.currentTarget.value.trim())} />
                                        </div>
                                        <div>
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Display</span></label>
                                            <input type="text" class="input input-sm input-bordered w-full" placeholder="Label"
                                                value={item.display || ""} onInput={(e) => setForm("inputs", i(), "display", e.currentTarget.value)} />
                                        </div>
                                        <div>
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Default</span></label>
                                            <input type="number" step="any" class="input input-sm input-bordered w-full" placeholder="0"
                                                value={item.val} onInput={(e) => setForm("inputs", i(), "val", parseFloat(e.currentTarget.value) || 0)} />
                                        </div>
                                        <div>
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Unit</span></label>
                                            <input type="text" class="input input-sm input-bordered w-full" placeholder="m, kg"
                                                value={item.unit || ""} onInput={(e) => setForm("inputs", i(), "unit", e.currentTarget.value)} />
                                        </div>
                                    </div>
                                    <button class="btn btn-ghost btn-xs text-error mt-6" onClick={() => removeInput(i())}><X class="w-4 h-4" /></button>
                                </div>
                            )}
                        </For>
                        <button class="btn btn-outline btn-block btn-sm border-dashed text-gray-400 hover:text-white" onClick={addInput}>+ Add Input Parameter</button>
                    </div>
                </div>

                {/* Constants */}
                <div class="collapse collapse-arrow bg-base-200 border border-base-300">
                    <input type="checkbox" />
                    <div class="collapse-title text-info font-bold flex items-center gap-2">
                        <Lock class="w-4 h-4" /> Constants
                    </div>
                    <div class="collapse-content space-y-3">
                        <For each={form.constants}>
                            {(item, i) => (
                                <div class="flex items-start gap-2 bg-base-100 p-2 rounded border border-base-300">
                                    <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                                        <div>
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Const Name</span></label>
                                            <input type="text" class="input input-sm input-bordered w-full font-mono text-secondary" placeholder="PI_2"
                                                value={item.name} onInput={(e) => setForm("constants", i(), "name", e.currentTarget.value.trim())} />
                                        </div>
                                        <div>
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Display</span></label>
                                            <input type="text" class="input input-sm input-bordered w-full" placeholder="Label"
                                                value={item.display || ""} onInput={(e) => setForm("constants", i(), "display", e.currentTarget.value)} />
                                        </div>
                                        <div>
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Value</span></label>
                                            <input type="number" step="any" class="input input-sm input-bordered w-full"
                                                value={item.val} onInput={(e) => setForm("constants", i(), "val", parseFloat(e.currentTarget.value) || 0)} />
                                        </div>
                                        <div>
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Unit</span></label>
                                            <input type="text" class="input input-sm input-bordered w-full" placeholder="unit"
                                                value={item.unit || ""} onInput={(e) => setForm("constants", i(), "unit", e.currentTarget.value)} />
                                        </div>
                                    </div>
                                    <button class="btn btn-ghost btn-xs text-error mt-6" onClick={() => removeConstant(i())}><X class="w-4 h-4" /></button>
                                </div>
                            )}
                        </For>
                        <button class="btn btn-outline btn-block btn-sm border-dashed text-gray-400 hover:text-white" onClick={addConstant}>+ Add Constant</button>
                    </div>
                </div>

                {/* Outputs */}
                <div class="collapse collapse-arrow bg-base-200 border border-base-300">
                    <input type="checkbox" checked />
                    <div class="collapse-title text-success font-bold flex items-center gap-2">
                        <Calculator class="w-4 h-4" /> Outputs
                    </div>
                    <div class="collapse-content space-y-3">
                        <For each={form.outputs}>
                            {(item, i) => (
                                <div class="flex items-start gap-2 bg-base-100 p-2 rounded border border-base-300">
                                    <div class="flex-1 grid grid-cols-1 md:grid-cols-6 gap-2">
                                        <div class="md:col-span-1">
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Output Name</span></label>
                                            <input type="text" class="input input-sm input-bordered w-full" placeholder="Result"
                                                value={item.name} onInput={(e) => setForm("outputs", i(), "name", e.currentTarget.value)} />
                                        </div>
                                        <div class="md:col-span-4">
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Expression</span></label>
                                            <input
                                                type="text"
                                                data-type="expression"
                                                class="input input-sm input-bordered w-full font-mono "
                                                placeholder="a + b"
                                                value={item.expr}
                                                onInput={(e) => setForm("outputs", i(), "expr", e.currentTarget.value)}
                                                onFocus={handleFocus}
                                            />
                                        </div>
                                        <div class="md:col-span-1">
                                            <label class="label py-0"><span class="label-text-alt text-xs text-gray-500 uppercase">Unit</span></label>
                                            <input type="text" class="input input-sm input-bordered w-full" placeholder="unit"
                                                value={item.unit || ""} onInput={(e) => setForm("outputs", i(), "unit", e.currentTarget.value)} />
                                        </div>
                                    </div>
                                    <button class="btn btn-ghost btn-xs text-error mt-6" onClick={() => removeOutput(i())}><X class="w-4 h-4" /></button>
                                </div>
                            )}
                        </For>
                        <button class="btn btn-outline btn-block btn-sm border-dashed text-gray-400 hover:text-white" onClick={addOutput}>+ Add Output Formula</button>
                    </div>
                </div>

                <div class="pt-4 flex gap-4">
                    <button class="btn btn-primary flex-1" onClick={handleSave}>Save Formula</button>
                    <button class="btn btn-outline btn-error" onClick={() => navigate("/")}>Cancel</button>
                </div>

            </main>
        </div>
    );
};
