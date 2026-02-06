import { useState, ChangeEvent, useEffect } from "react";
import { useLocation } from "react-router";
import Papa from "papaparse";
import { getWeek } from "date-fns";
import { getSchool } from "@/lib/utils";
import { raportGenarator } from "@/lib/raport-genarator";
import DownloadClassesRaport from "@/components/download-classes-raport";
import ClassesUpload from "@/components/classes/ClassesUpload";
import ClassesFilters from "@/components/classes/ClassesFilters";
import ClassesList from "@/components/classes/ClassesList";
import { useClassesFilter } from "@/hooks/use_classes_filter";
import { ClassesGroupProps } from "@/types";

/**
 * Main Classes page component
 * Handles CSV upload, parsing, filtering and report generation
 * Can receive files from Home page via location.state
 */
const Classes = () => {
  const [json_result, set_json_result] = useState<ClassesGroupProps[][]>([]);
  const { sort, show_dates, toggle_color, toggle_show_all } = useClassesFilter();
  const location = useLocation();

  const current_week = getWeek(new Date());

  /**
   * Parse and load files
   */
  const parse_files = (files: File[]) => {
    files.forEach((file) => {
      Papa.parse<ClassesGroupProps>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          set_json_result((prev) => [...prev, result.data]);
        },
      });
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
          on_toggle_green={() => toggle_color("green")}
          on_toggle_yellow={() => toggle_color("yellow")}
          on_toggle_red={() => toggle_color("red")}
          on_toggle_show_dates={toggle_show_all}
        />
      </div>

      <ClassesList raport={raport} sort={sort} show_dates={show_dates} />

      {raport && raport.length > 0 && (
        <DownloadClassesRaport raport={raport} />
      )}
    </div>
  );
};

export default Classes;
