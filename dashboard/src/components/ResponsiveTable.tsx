import type { ReactNode } from 'react';
import { useId } from 'react';

export interface TableColumn<T> {
  key: string;
  header: string;
  isRowHeader?: boolean;
  render: (row: T) => ReactNode;
}

interface ResponsiveTableProps<T> {
  caption: string;
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
}

export function ResponsiveTable<T>({
  caption,
  columns,
  rows,
  getRowKey,
  emptyMessage = 'Sin registros para los filtros seleccionados.',
}: ResponsiveTableProps<T>) {
  const captionId = useId();

  return (
    <div tabIndex={0} role="region" aria-labelledby={captionId} className="table-wrapper">
      <table className="data-table stack-mobile">
        <caption id={captionId}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((col) =>
                  col.isRowHeader ? (
                    <th key={col.key} scope="row">
                      {col.render(row)}
                    </th>
                  ) : (
                    <td key={col.key} data-label={col.header}>
                      {col.render(row)}
                    </td>
                  ),
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
