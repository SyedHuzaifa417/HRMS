export interface TableColumn<T> {
  key: keyof T;
  header: string;
  className?: string;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  searchable?: boolean;
}

export interface TableFilter {
  key: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  filters?: {filters:TableFilter[],enabled:boolean};
  searchConfig?: {
    enabled: boolean;
    columns: (keyof T)[];
    placeholder?: string;
  };
  pagination?: {
    enabled: boolean;
    pageSize?: number;
    showPageInfo?: boolean;
  };
  className?: string;
  rowClassName?: string;
  onRowClick?: (row: T, index: number) => void;
  scrollAreaHeight?: string;
}
