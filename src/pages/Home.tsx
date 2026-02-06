import { ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router";

/**
 * Home page component
 * Displays app description, sample file downloads and file upload functionality
 */
const Home = () => {
  const navigate = useNavigate();
  const file_input_ref = useRef<HTMLInputElement>(null);

  /**
   * Handle sample file download with confirmation dialog
   */
  const handle_sample_download = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const confirmed = window.confirm(
      "Czy na pewno chcesz pobrać plik przykładowy?"
    );
    if (!confirmed) {
      event.preventDefault();
    }
  };

  /**
   * Handle file upload and navigate to /classes page with files
   */
  const handle_file_upload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      navigate("/classes", { state: { uploaded_files: Array.from(files) } });
    }
  };

  /**
   * Trigger file input click
   */
  const trigger_file_input = () => {
    file_input_ref.current?.click();
  };

  return (
    <div className="h-full flex flex-col m-auto items-center justify-center gap-4 my-8">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-foreground">Cześć!</h1>
        <p className="text-xl text-muted-foreground">
          Witaj w aplikacji sortowania spotkań SuperW
        </p>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mt-4 text-foreground">
          O aplikacji
        </h2>
        <div className="w-24 h-1 bg-primary mb-2 rounded-md"></div>
        <div>
          <p className="text-lg text-center max-w-xl text-foreground">
            Ta aplikacja pomaga w sortowaniu spotkań na podstawie statusu Kart
            Sukcesów wyeksportowanych z systemu Wiosny. Możesz załadować pliki
            CSV, filtrować spotkania według statusu i pobrać raport w formacie
            Excel.
          </p>
          <p className="text-lg text-center max-w-xl text-foreground">
            Aplikacja działa lokalnie w Twojej przeglądarce, więc Twoje dane są
            bezpieczne i działa również offline.
          </p>
          <p className="text-lg text-center max-w-xl text-foreground">
            Projekt jest open-source co zapewnia pełną przejrzystość i dostępny
            jest na GitHub pod linkiem{" "}
            <a
              href="https://github.com/KKocot/excel-reader"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary hover:text-primary/80"
            >
              excel-reader
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mt-4 text-foreground">
          Jak zacząć?
        </h2>
        <div className="w-24 h-1 bg-primary mb-2 rounded-md"></div>
        <p className="text-lg text-center max-w-xl text-foreground">
          Wybierz jedną z opcji poniżej:
        </p>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">
              Opcja 1: Wgraj własny plik
            </h3>
            <button
              onClick={trigger_file_input}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold"
            >
              Wgraj plik CSV
            </button>
            <input
              ref={file_input_ref}
              type="file"
              accept=".csv"
              multiple
              onChange={handle_file_upload}
              className="hidden"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">
              Opcja 2: Pobierz pliki przykładowe
            </h3>
            <div className="flex flex-col gap-1">
              <a
                href="/sample/3_KS_w_szkolach1.csv"
                className="underline text-primary hover:text-primary/80"
                title="Plik przykładowy 1"
                download
                onClick={handle_sample_download}
              >
                Plik 1
              </a>
              <a
                href="/sample/3_KS_w_szkolach2.csv"
                className="underline text-primary hover:text-primary/80"
                title="Plik przykładowy 2"
                download
                onClick={handle_sample_download}
              >
                Plik 2
              </a>
              <a
                href="/sample/3_KS_w_szkolach3.csv"
                className="underline text-primary hover:text-primary/80"
                title="Plik przykładowy 3"
                download
                onClick={handle_sample_download}
              >
                Plik 3
              </a>
              <a
                href="/sample/3_KS_w_szkolach4.csv"
                className="underline text-primary hover:text-primary/80"
                title="Plik przykładowy 4"
                download
                onClick={handle_sample_download}
              >
                Plik 4
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg text-center max-w-xl text-muted-foreground">
        Miłego korzystania z aplikacji!
      </p>
    </div>
  );
};

export default Home;
