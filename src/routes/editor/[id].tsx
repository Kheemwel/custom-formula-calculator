import { useParams } from "@solidjs/router";
import { Show } from "solid-js";
import FormulaEditorForm from "../../components/FormulaEditorForm";
import { formulaStore } from "../../lib/store";

export default function EditFormula() {
    const params = useParams();
    // find() is not reactive unless we access a signal. formulaStore.formulas is a getter for store.formulas.
    // access formulaStore.formulas inside the component body so it tracks.

    const formula = () => formulaStore.formulas.find(f => f.id === params.id);

    return (
        <Show when={formula()} fallback={<div>Formula not found</div>}>
            <FormulaEditorForm initialData={formula()} />
        </Show>
    );
}
