import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import { Formula } from "../types";

const STORAGE_KEY = "formulas";

function loadFormulas(): Formula[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      console.warn("Stored data is not an array, clearing storage");
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    // Validate each formula against a minimal schema
    const validated = parsed
      .map((f: any) => {
        // More thorough validation
        if (
          !f ||
          typeof f.id !== "string" ||
          typeof f.title !== "string" ||
          !Array.isArray(f.inputs) ||
          !Array.isArray(f.constants) ||
          !Array.isArray(f.outputs)
        ) {
          console.warn("Invalid formula skipped:", f);
          return null;
        }
        return f as Formula;
      })
      .filter((f): f is Formula => f !== null && f !== undefined);
    
    console.log(`Loaded ${validated.length} valid formulas from storage`);
    return validated;
  } catch (e) {
    console.error("Error parsing stored formulas:", e);
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

// Start empty; we'll load from localStorage on client mount to avoid
// hydration mismatch between SSR and client-rendered localStorage data.
const [formulas, setFormulas] = createSignal<Formula[]>([]);

// Load formulas from localStorage after the app mounts (client-only).
export function initFormulas() {
  if (typeof window === "undefined") return;
  const loaded = loadFormulas();
  setFormulas(loaded);
}

export const formulaStore = {
  get formulas() {
    return formulas();
  },

  addFormula(formula: Formula) {
    console.log("Adding formula:", formula.id, formula.title);
    setFormulas((prev) => {
      const exists = prev.findIndex((f) => f.id === formula.id);
      const next =
        exists !== -1
          ? prev.map((f) => (f.id === formula.id ? formula : f))
          : [...prev, formula];

      console.log("Saving to localStorage:", next.length, "formulas");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  },

  deleteFormula(id: string) {
    console.log("Deleting formula:", id);
    setFormulas((prev) => {
      const next = prev.filter((f) => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  },

  duplicateFormula(id: string) {
    const original = formulas().find((f) => f.id === id);
    if (!original) {
      console.warn("Formula not found for duplication:", id);
      return;
    }

    const copy: Formula = {
      ...JSON.parse(JSON.stringify(original)),
      id: crypto.randomUUID(),
      title: `(Copy) ${original.title}`,
    };
    this.addFormula(copy);
  },

  importFormulas(imported: Formula[]) {
    console.log("Importing", imported.length, "formulas");
    setFormulas((prev) => {
      const next = [...prev, ...imported];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  },

  exportAll() {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formulas()));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "formulas.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  },
};
