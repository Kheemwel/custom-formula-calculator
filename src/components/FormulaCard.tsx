import { Component } from "solid-js";
import { Formula } from "../types";
import { A } from "@solidjs/router";
import { Edit, Copy, Trash2, Download } from "lucide-solid";
import { formulaStore } from "../lib/store";

interface FormulaCardProps {
  formula: Formula;
}

export default function FormulaCard(props: FormulaCardProps) {
  // Debug logging
  console.log("FormulaCard rendered with:", props.formula?.id, props.formula?.title);
  
  if (!props.formula) {
    console.warn("FormulaCard: formula is undefined");
    return <></>;
  }

  if (typeof props.formula !== "object") {
    console.warn("FormulaCard: formula is not an object:", typeof props.formula, props.formula);
    return <></>;
  }

  if (!props.formula.id || !props.formula.title) {
    console.warn("FormulaCard: missing required formula properties:", props.formula);
    return <></>;
  }

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Since we cannot use window.confirm easily in some environments, we'll just delete (per original code's "Fix")
    // Or we could use a nice UI dialog, but adhering to the original logic:
    formulaStore.deleteFormula(props.formula.id);
  };

  const handleDuplicate = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    formulaStore.duplicateFormula(props.formula.id);
  };

  const handleExport = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Simple export of single formula
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify([props.formula]));
    const node = document.createElement("a");
    node.setAttribute("href", dataStr);
    node.setAttribute(
      "download",
      `${props.formula.title.replace(/\s+/g, "_")}.json`,
    );
    document.body.appendChild(node);
    node.click();
    node.remove();
  };

  return (
    <A
      href={`/run/${props.formula.id}`}
      class="card bg-base-200 shadow-md hover:shadow-lg hover:border-primary border border-transparent transition-all cursor-pointer group"
    >
      <div class="card-body p-4">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h3 class="card-title  font-mono text-lg">
              {props.formula.title}
            </h3>
            <p class="text-sm text-base-content/70 mt-1 lines-2">
              {props.formula.desc || "No description"}
            </p>
          </div>
          <div class="flex gap-1 ml-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
            <A
              href={`/editor/${props.formula.id}`}
              class="btn btn-ghost btn-xs btn-square text-info"
              title="Edit"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit class="w-4 h-4" />
            </A>
            <button
              class="btn btn-ghost btn-xs btn-square text-success"
              title="Duplicate"
              onClick={handleDuplicate}
            >
              <Copy class="w-4 h-4" />
            </button>
            <button
              class="btn btn-ghost btn-xs btn-square text-error"
              title="Delete"
              onClick={handleDelete}
            >
              <Trash2 class="w-4 h-4" />
            </button>
            <button
              class="btn btn-ghost btn-xs btn-square text-warning"
              title="Export"
              onClick={handleExport}
            >
              <Download class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </A>
  );
}
