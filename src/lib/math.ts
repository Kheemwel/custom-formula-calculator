import { Formula, FormulaInput, FormulaConstant, FormulaOutput } from "../types";

export const mathScope: any = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    sqrt: Math.sqrt, pow: Math.pow, abs: Math.abs,
    floor: Math.floor, ceil: Math.ceil, round: Math.round,
    min: Math.min, max: Math.max,
    log: Math.log, exp: Math.exp,
    PI: Math.PI, E: Math.E,
    // Percent Functions
    addPercent: (value: number, percent: number) => value * (1 + percent / 100),
    subtractPercent: (value: number, percent: number) => value * (1 - percent / 100),
    percentOf: (value: number, percent: number) => value * (percent / 100),
};

export function evaluateFormula(
    formula: Formula,
    inputs: Record<string, number>
): { outputs: { name: string; value: number | string; error?: string }[]; error?: string } {

    // 1. Gather variables (constants + inputs)
    const vars: Record<string, number> = {};

    formula.constants.forEach(c => {
        vars[c.name] = Number(c.val);
    });

    Object.entries(inputs).forEach(([key, val]) => {
        vars[key] = val;
    });

    // 2. Evaluate Outputs
    const report: { name: string; value: number | string; error?: string }[] = [];

    for (const out of formula.outputs) {
        try {
            const contextKeys = Object.keys(mathScope).concat(Object.keys(vars));
            const contextValues = Object.values(mathScope).concat(Object.values(vars));

            // CAUTION: 'new Function' is used here as in the original code. 
            // It is generally unsafe if running untrusted code, but this is a local calculator tool.
            const func = new Function(...contextKeys, `return ${out.expr};`);
            const result = func(...contextValues);

            if (typeof result === 'number') {
                if (!isFinite(result)) {
                    report.push({ name: out.name, value: result.toString() }); // Infinity
                } else {
                    // Round to reasonable precision if needed, but keeping raw for now
                    report.push({ name: out.name, value: result });
                }
            } else {
                report.push({ name: out.name, value: String(result) });
            }

        } catch (e: any) {
            report.push({ name: out.name, value: "Error", error: e.message });
        }
    }

    return { outputs: report };
}
