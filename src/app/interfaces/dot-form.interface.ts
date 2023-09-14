export interface DotForm {
  row: DotRow;
}

export interface DotRow {
  id: string;
  columns: Column[];
}

interface Column {
  id: string;
  fields: DotField[];
}

export interface DotField {
  type: string;
  label: string;
  required: boolean;
  regexCheck?: string;
  hint?: string;
}
