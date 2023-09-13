export interface DotForm {
  row: Row;
}

interface Row {
  divider: Divider;
  columns: Column[];
}

interface Column {
  columnDivider: Divider;
  fields: Field[];
}

interface Field {
  clazz: string;
  contentTypeId: string;
  dataType: string;
  fieldType: string;
  fieldTypeLabel: string;
  fieldVariables: any[];
  fixed: boolean;
  forceIncludeInApi: boolean;
  iDate: number;
  id: string;
  indexed: boolean;
  listed: boolean;
  modDate: number;
  name: string;
  readOnly: boolean;
  regexCheck?: string;
  required: boolean;
  searchable: boolean;
  sortOrder: number;
  unique: boolean;
  variable: string;
  hint?: string;
}

interface Divider {
  clazz: string;
  contentTypeId: string;
  dataType: string;
  fieldContentTypeProperties: any[];
  fieldType: string;
  fieldTypeLabel: string;
  fieldVariables: any[];
  fixed: boolean;
  forceIncludeInApi: boolean;
  iDate: number;
  id: string;
  indexed: boolean;
  listed: boolean;
  modDate: number;
  name: string;
  readOnly: boolean;
  required: boolean;
  searchable: boolean;
  sortOrder: number;
  unique: boolean;
  variable: string;
}
