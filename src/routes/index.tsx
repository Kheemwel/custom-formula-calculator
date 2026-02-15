import { Show, For, Suspense } from "solid-js";
import { A } from "@solidjs/router";
import { FileUp, FileDown, Calculator, Plus } from "lucide-solid";
import { formulaStore } from "../lib/store";
import Header from "../components/Header";
import FormulaCard from "../components/FormulaCard";

export default function Home() {
  let fileInput: HTMLInputElement | undefined;

  // src/routes/index.tsx

  const handleImport = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;

    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (
          !Array.isArray(imported) ||
          !imported.every((f) => f?.id && f.title)
        ) {
          alert("Invalid file format - missing formula fields");
          return;
        }

        formulaStore.importFormulas(imported);
        target.value = "";
      } catch (err) {
        console.error(err);
        alert("Error parsing file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div class="h-screen flex flex-col overflow-hidden bg-base-100 text-base-content font-mono">
      <Header
        actions={
          <>
            <button
              class="btn btn-sm btn-ghost border border-base-300"
              onClick={() => fileInput?.click()}
              title="Import JSON"
            >
              <FileUp class="w-6 h-6 md:mr-2" />
              <span class="hidden md:inline">Import JSON</span>
            </button>
            <button
              class="btn btn-sm btn-ghost border border-base-300"
              onClick={() => {
                console.log("Exporting formulas:", formulaStore.formulas);
                formulaStore.exportAll();
              }}
              title="Export All"
            >
              <FileDown class="w-6 h-6 md:mr-2" />
              <span class="hidden md:inline">Export All</span>
            </button>
          </>
        }
      />

      <main class="flex-1 overflow-y-auto relative p-4 pb-20 max-w-5xl mx-auto w-full">
        <Suspense fallback={<div class="text-base-content/50">Loading formulas...</div>}>
          <div
            id="formula-list-container"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <For each={formulaStore.formulas}>
              {(formula) => {
                console.log("Rendering formula:", formula?.id, formula?.title);
                return <FormulaCard formula={formula} />;
              }}
            </For>
          </div>

          <Show when={formulaStore.formulas.length === 0}>
            <div class="flex flex-col items-center justify-center mt-20 text-base-content/50">
              <Calculator class="w-24 h-24 mb-4 opacity-50" />
              <p>No formulas yet. Create one!</p>
            </div>
          </Show>
        </Suspense>
      </main>

      <A
        href="/editor"
        class="fixed bottom-6 right-6 btn btn-circle btn-primary btn-lg shadow-lg z-10 transition-transform hover:scale-105"
      >
        <Plus class="w-6 h-6" />
      </A>

      <input
        type="file"
        ref={fileInput}
        class="hidden"
        accept=".json"
        onChange={handleImport}
      />
    </div>
  );
}
