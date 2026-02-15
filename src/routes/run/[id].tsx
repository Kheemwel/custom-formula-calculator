import { Component, createEffect, onMount, For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useParams, A } from "@solidjs/router";
import { formulaStore } from "../../lib/store";
import { evaluateFormula } from "../../lib/math";
import Header from "../../components/Header";
import { Formula } from "../../types";

const RunFormula: Component = () => {
  const params = useParams();
  const formula = () => formulaStore.formulas.find((f) => f.id === params.id);

  const [inputs, setInputs] = createStore<Record<string, number>>({});
  const [results, setResults] = createSignal<
    { name: string; value: number | string; error?: string }[]
  >([]);

  onMount(() => {
    console.log("RunFormula mounted for id:", params.id, "formula:", formula());
  });

  // Initialize inputs when formula loads
  createEffect(() => {
    const f = formula();
    if (f) {
      const initialInputs: Record<string, number> = {};
      f.inputs.forEach((i) => {
        initialInputs[i.name] = i.val;
      });
      setInputs(initialInputs);
    }
  });

  // Calc effect
  createEffect(() => {
    const f = formula();
    if (f) {
      // Ensure we read each input property so Solid tracks reactivity for dynamic keys
      // (reading them in a short loop creates the dependency on those store keys)
      const context: Record<string, number> = {};
      f.inputs.forEach((i) => {
        // access the store value to create tracking
        const val = inputs[i.name];
        context[i.name] = val;
      });
      f.constants.forEach((c) => (context[c.name] = c.val));

      const res = evaluateFormula(f, context);
      console.debug("evaluateFormula context:", context, "result:", res);
      try {
        console.debug("evaluateFormula outputs (json):", JSON.stringify(res.outputs));
      } catch (e) {
        console.debug("evaluateFormula outputs (json stringify failed)");
      }
      // Replace the results array with the new outputs
      setResults(res.outputs as any);
    }
  });

  // Debug: log results signal when it changes
  createEffect(() => {
    const r = results();
    try {
      console.debug("results signal (json):", JSON.stringify(r));
    } catch (e) {
      console.debug("results signal:", r);
    }
  });

  return (
    <div class="h-screen flex flex-col bg-base-100 font-mono">
      <Header showBack={true} title={formula()?.title || "Loading..."} />

      <main class="flex-1 overflow-y-auto p-4 pb-10 max-w-5xl mx-auto w-full">
        <div class="text-center mb-6">
          <p class="text-base-content/60 text-sm">{formula()?.desc}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Col: Inputs */}
          <div class="space-y-6">
            <div class="card bg-base-200 shadow-sm border border-base-300">
              <div class="card-body p-5">
                <h3 class="text-xs uppercase tracking-wider text-base-content/50 font-bold mb-4 border-b border-base-300 pb-2">
                  Inputs
                </h3>
                <div class="space-y-4">
                  <For each={formula()?.inputs}>
                    {(inp) => (
                      <div>
                        <label class="label py-1">
                          <span class="label-text text-sm">
                            {inp.display
                              ? `${inp.display} (${inp.name})`
                              : inp.name}
                          </span>
                        </label>
                        <div class="flex items-center gap-2">
                          <input
                            type="number"
                            step="any"
                            class="input input-bordered w-full font-mono  font-bold"
                            value={inputs[inp.name] || 0}
                            onInput={(e) =>
                              {
                                const v = parseFloat(e.currentTarget.value) || 0;
                                console.debug("input change", inp.name, v);
                                setInputs(inp.name, v);
                              }
                            }
                          />
                          <div class="text-xs text-base-content/50 min-w-7.5">
                            {inp.unit || ""}
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>

            {/* Constants (ReadOnly) */}
            <div
              class={`card bg-base-200 shadow-sm border border-base-300 ${!formula()?.constants.length ? "hidden" : ""}`}
            >
              <div class="card-body p-5">
                <h3 class="text-xs uppercase tracking-wider text-base-content/50 font-bold mb-4 border-b border-base-300 pb-2">
                  Constants
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <For each={formula()?.constants}>
                    {(c) => (
                      <div class="bg-base-100 p-2 rounded border border-base-300">
                        <div class="text-[10px] text-base-content/50">
                          {c.display || c.name}
                        </div>
                        <div class="font-mono text-secondary font-bold">
                          {c.val}{" "}
                          <span class="text-xs text-base-content/50 font-normal">
                            {c.unit}
                          </span>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Results */}
          <div class="card bg-base-200 shadow-md border border-success/20">
            <div class="card-body p-5">
              <h3 class="text-xs uppercase tracking-wider text-success font-bold mb-4 border-b border-base-300 pb-2">
                Outputs
              </h3>
              <div class="space-y-4">
                <For each={formula()?.outputs}>
                  {(o, i) => {
                    // Match result by index since order matches
                    // Use an accessor function so Solid tracks reads of the `results` signal
                    const getRes = () => results()[i()];
                    return (
                      <div class="bg-base-100 p-3 rounded border border-base-300 flex flex-col gap-2">
                        <div>
                          <div class="text-xs text-base-content/60">
                            {o.name}
                          </div>
                          <div
                            class="text-[10px] text-base-content/40 font-mono truncate w-full"
                            title={o.expr}
                          >
                            Expr: {o.expr}
                          </div>
                        </div>
                        <div class="flex items-baseline justify-end gap-2 mt-1 border-t border-base-300 pt-2">
                          <span
                            class={`text-3xl font-mono font-bold tracking-tight ${getRes()?.error ? "text-error text-sm" : "text-success"}`}
                          >
                            {getRes()?.error ? getRes().error : (getRes()?.value ?? "---")}
                          </span>
                          <span class="text-sm text-base-content/50">
                            {o.unit}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RunFormula;
