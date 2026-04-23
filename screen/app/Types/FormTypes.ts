import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type FormFieldType = 
  | "text" 
  | "textarea" 
  | "email" 
  | "number" 
  | "date"
  | "select"
  | "image"
  | "tags";

export interface FormFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  colSpan?: 1 | 2 | "full";
  validation?: RegisterOptions<T, Path<T>>;
  options?: { value: string; label: string }[]; // for select fields
  rows?: number; // for textarea
  helperText?: string;
  disabled?: boolean;
  hidden?: boolean;
}

export interface FormSection<T extends FieldValues> {
  title: string;
  description?: string;
  fields: FormFieldConfig<T>[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface FormConfig<T extends FieldValues> {
  sections: FormSection<T>[];
  defaultValues?: Partial<T>;
  submitLabel?: string;
  cancelLabel?: string;
}

export interface ResourceConfig<T extends FieldValues> {
  name: string;
  apiEndpoints: {
    list?: () => Promise<T[]>;
    create: (data: Partial<T>) => Promise<T>;
    update: (id: string | number, data: Partial<T>) => Promise<T>;
    delete: (id: string | number) => Promise<void>;
  };
  formConfig: FormConfig<T>;
  tableConfig?: TableConfig<T>;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  defaultSort?: { key: keyof T; direction: "asc" | "desc" };
}

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (item: T) => void;
  variant?: "primary" | "danger" | "success" | "ghost";
  disabled?: (item: T) => boolean;
  hidden?: (item: T) => boolean;
}