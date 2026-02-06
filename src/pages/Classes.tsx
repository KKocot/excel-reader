import { useState, ChangeEvent, useEffect } from "react";
import { useLocation } from "react-router";
import Papa from "papaparse";
import * as XLSX from "xlsx-js-style";
import { getWeek } from "date-fns";
import { getSchool } from "@/lib/utils";
import { raportGenarator } from "@/lib/raport-genarator";
import DownloadClassesRaport from "@/components/download-classes-raport";
import ClassesUpload from "@/components/classes/ClassesUpload";
import ClassesFilters from "@/components/classes/ClassesFilters";
import ClassesList from "@/components/classes/ClassesList";
import RawTable from "@/components/classes/RawTable";
import { useClassesFilter } from "@/hooks/use_classes_filter";
import { ClassesGroupProps, RawCellValue, RawTableData } from "@/types";

/**
 * Main Classes page component
 * Handles CSV upload, parsing, filtering and report generation
 * Can receive files from Home page via location.state
 */
const Classes = () => {
  const [json_result, set_json_result] = useState<ClassesGroupProps[][]>([]);
  const [raw_data, set_raw_data] = useState<RawTableData[]>([]);
  const {
    sort,
    show_dates,
    week_from,
    week_to,
    toggle_color,
    toggle_show_all,
    set_week_from_filter,
    set_week_to_filter,
  } = useClassesFilter();
  const location = useLocation();

  const current_week = getWeek(new Date());

  /**
   * Check if parsed data matches Kwap/Wiosna format
   */
  const is_kwap_format = (data: unknown[]): data is ClassesGroupProps[] => {
    if (!Array.isArray(data) || data.length === 0) return false;
    const first = data[0];
    if (typeof first !== "object" || first === null) return false;
    return "Textbox5" in first;
  };

  /**
   * Parse and load files (CSV or Excel)
   */
  const parse_files = (files: File[]) => {
    files.forEach((file) => {
      const file_extension = file.name.split(".").pop()?.toLowerCase();

      if (file_extension === "csv") {
        // Parse CSV using PapaParse
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsed_data = result.data as unknown[];
            if (is_kwap_format(parsed_data)) {
              set_json_result((prev) => [...prev, parsed_data]);
            } else {
              // Not Kwap format - treat as raw table
              // Convert to array of arrays
              const raw_rows = parsed_data.map((row) =>
                Object.values(row as Record<string, unknown>).map(
                  (cell) => cell as RawCellValue
                )
              );
              const headers = ((result.meta.fields as string[]) || []).map(
                (h) => h as RawCellValue
              );
              set_raw_data((prev) => [...prev, [headers, ...raw_rows]]);
            }
          },
          error: (error) => {
            console.error("CSV parsing error:", error.message);
          },
        });
      } else if (
        file_extension === "xlsx" ||
        file_extension === "xls" ||
        file_extension === "ods"
      ) {
        // Parse Excel using xlsx-js-style
        const reader = new FileReader();
        reader.onload = (e) => {
          const buffer = e.target?.result;
          if (buffer) {
            try {
              const workbook = XLSX.read(buffer, { type: "array" });
              // Take first sheet
              const first_sheet_name = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[first_sheet_name];
              // Convert to array of arrays (raw data)
              const sheet_data_raw = XLSX.utils.sheet_to_json<unknown[]>(
                worksheet,
                {
                  header: 1,
                }
              );
              // Cast to RawTableData
              const sheet_data: RawTableData = sheet_data_raw.map((row) =>
                (row as unknown[]).map((cell) => cell as RawCellValue)
              );

              // Try to convert to Kwap format
              // First row = headers, rest = data
              if (sheet_data.length > 1) {
                const headers = sheet_data[0] as string[];
                const rows = sheet_data.slice(1);

                // Convert to objects
                const objects = rows.map((row_array) => {
                  const row_obj: Record<string, unknown> = {};
                  headers.forEach((header, idx) => {
                    row_obj[header] = (row_array as unknown[])[idx];
                  });
                  return row_obj;
                });

                if (is_kwap_format(objects)) {
                  set_json_result((prev) => [...prev, objects]);
                } else {
                  // Not Kwap format - treat as raw table
                  set_raw_data((prev) => [...prev, sheet_data]);
                }
              } else {
                // Only one row or empty - treat as raw
                set_raw_data((prev) => [...prev, sheet_data]);
              }
            } catch (error) {
              console.error("Excel parsing error:", error);
            }
          }
        };
        reader.onerror = () => {
          console.error("File reading error:", reader.error?.message);
        };
        reader.readAsArrayBuffer(file);
      }
    });
  };

  /**
   * Load files from location.state if available (from Home page upload)
   */
  useEffect(() => {
    const state = location.state as { uploaded_files?: File[] } | null;
    if (state?.uploaded_files && state.uploaded_files.length > 0) {
      parse_files(state.uploaded_files);
    }
  }, [location.state]);

  const handle_file_upload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files ? event.target.files : null;
    if (file) {
      parse_files(Array.from(file));
    }
  };

  const raport = raportGenarator(getSchool(json_result));

  return (
    <div className="p-4 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">Zajecia</h1>

      <div className="justify-center w-full items-center gap-8 grid-cols-2 grid">
        <ClassesUpload
          current_week={current_week}
          on_file_change={handle_file_upload}
        />

        <ClassesFilters
          sort={sort}
          show_dates={show_dates}
          week_from={week_from}
          week_to={week_to}
          on_toggle_green={() => toggle_color("green")}
          on_toggle_yellow={() => toggle_color("yellow")}
          on_toggle_red={() => toggle_color("red")}
          on_toggle_show_dates={toggle_show_all}
          on_week_from_change={set_week_from_filter}
          on_week_to_change={set_week_to_filter}
        />
      </div>

      {raw_data.length > 0 ? (
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-semibold mb-4">
            Wykryto niestandardowy format - surowe dane
          </h2>
          <RawTable data={raw_data} />
        </div>
      ) : (
        <>
          <ClassesList
            raport={raport}
            sort={sort}
            show_dates={show_dates}
            week_from={week_from}
            week_to={week_to}
          />

          {raport && raport.length > 0 && (
            <DownloadClassesRaport raport={raport} />
          )}
        </>
      )}
    </div>
  );
};

export default Classes;
