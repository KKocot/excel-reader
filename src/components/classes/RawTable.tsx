import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RawCellValue, RawTableData } from "@/types";

interface RawTableProps {
  data: RawTableData[];
}

/**
 * Display raw table data for files that don't match Kwap/Wiosna format
 * Removes empty rows and empty columns automatically
 */
const RawTable = ({ data }: RawTableProps) => {
  if (!data || data.length === 0) return null;

  // Flatten all tables into one (if multiple files uploaded)
  const merged_data = data.flat();

  // Filter out empty rows (all cells empty)
  const non_empty_rows = merged_data.filter((row) =>
    row.some((cell) => cell !== null && cell !== undefined && cell !== "")
  );

  if (non_empty_rows.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>Brak danych do wyświetlenia.</p>
      </div>
    );
  }

  // Find max column count
  const max_cols = Math.max(...non_empty_rows.map((row) => row.length));

  // Check which columns are empty (all cells empty in that column)
  const non_empty_col_indices: number[] = [];
  for (let col_idx = 0; col_idx < max_cols; col_idx++) {
    const has_value = non_empty_rows.some((row) => {
      const cell = row[col_idx];
      return cell !== null && cell !== undefined && cell !== "";
    });
    if (has_value) {
      non_empty_col_indices.push(col_idx);
    }
  }

  // First row as header (or generate generic headers if first row is empty)
  const first_row = non_empty_rows[0] || [];
  const header_cells = non_empty_col_indices.map((col_idx) => {
    const value: RawCellValue = first_row[col_idx];
    return value !== null && value !== undefined && value !== ""
      ? String(value)
      : `Kolumna ${col_idx + 1}`;
  });

  // Data rows (skip first row if it's used as header)
  const body_rows = non_empty_rows.slice(1);

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {header_cells.map((header, idx) => (
              <TableHead key={idx} className="font-semibold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body_rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={header_cells.length}
                className="text-center text-muted-foreground"
              >
                Brak wierszy danych.
              </TableCell>
            </TableRow>
          ) : (
            body_rows.map((row, row_idx) => (
              <TableRow key={row_idx}>
                {non_empty_col_indices.map((col_idx, cell_idx) => {
                  const cell: RawCellValue = row[col_idx];
                  return (
                    <TableCell key={cell_idx}>
                      {cell !== null && cell !== undefined && cell !== ""
                        ? String(cell)
                        : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RawTable;
