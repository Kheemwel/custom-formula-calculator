export interface FormulaInput {
    name: string;
    display?: string;
    val: number;
    unit?: string;
}

export interface FormulaConstant {
    name: string;
    display?: string;
    val: number;
    unit?: string;
}

export interface FormulaOutput {
    name: string;
    expr: string;
    unit?: string;
}

export interface Formula {
    id: string;
    title: string;
    desc?: string;
    inputs: FormulaInput[];
    constants: FormulaConstant[];
    outputs: FormulaOutput[];
}
