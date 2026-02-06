import { ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  /**
   * Handle demo mode - fetch sample file and navigate to /classes
   */
  const handle_demo = async () => {
    try {
      const response = await fetch("/sample/3_KS_w_szkolach1.csv");
      if (!response.ok) {
        throw new Error("Failed to fetch sample file");
      }
      const blob = await response.blob();
      const file = new File([blob], "demo.csv", { type: "text/csv" });
      navigate("/classes", { state: { uploaded_files: [file] } });
    } catch (error) {
      console.error("Error loading demo file:", error);
      alert("Nie udało się załadować pliku demonstracyjnego.");
    }
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
      <div className="flex flex-col items-center w-full max-w-5xl px-4">
        <h2 className="text-2xl font-semibold mt-4 text-foreground">
          Jak zacząć?
        </h2>
        <div className="w-24 h-1 bg-primary mb-6 rounded-md"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Card className="flex flex-col border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-xl">Prezentacja</CardTitle>
              <CardDescription>
                Zobacz aplikację w akcji z przykładowymi danymi
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-4">
              <p className="text-sm text-center text-muted-foreground">
                Kliknij i od razu załaduj przykładowe dane bez pobierania na dysk
              </p>
              <button
                onClick={handle_demo}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold w-full max-w-xs shadow-md"
              >
                Uruchom demo
              </button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Szybki test</CardTitle>
              <CardDescription>
                Wgraj plik CSV i od razu przejdź do analizy spotkań
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-4">
              <p className="text-sm text-center text-muted-foreground">
                Prześlij plik CSV wyeksportowany z systemu Kwap1/Wiosny
              </p>
              <button
                onClick={trigger_file_input}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold w-full max-w-xs"
              >
                Wgraj plik CSV
              </button>
              <input
                ref={file_input_ref}
                type="file"
                accept=".csv,.xlsx,.xls,.ods"
                multiple
                onChange={handle_file_upload}
                className="hidden"
              />
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Pobierz przykłady</CardTitle>
              <CardDescription>
                Pobierz pliki testowe na dysk, żeby przetestować aplikację
                później
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground mb-4">
                Dostępne pliki przykładowe:
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="/sample/3_KS_w_szkolach1.csv"
                    className="text-primary hover:text-primary/80 hover:underline transition-colors flex items-center gap-2"
                    title="Plik przykładowy 1"
                    download
                    onClick={handle_sample_download}
                  >
                    <span className="text-lg">•</span>
                    <span>Plik 1 - Karty Sukcesów (szkoły 1-4)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/sample/3_KS_w_szkolach2.csv"
                    className="text-primary hover:text-primary/80 hover:underline transition-colors flex items-center gap-2"
                    title="Plik przykładowy 2"
                    download
                    onClick={handle_sample_download}
                  >
                    <span className="text-lg">•</span>
                    <span>Plik 2 - Karty Sukcesów (szkoły 5-8)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/sample/3_KS_w_szkolach3.csv"
                    className="text-primary hover:text-primary/80 hover:underline transition-colors flex items-center gap-2"
                    title="Plik przykładowy 3"
                    download
                    onClick={handle_sample_download}
                  >
                    <span className="text-lg">•</span>
                    <span>Plik 3 - Karty Sukcesów (szkoły 9-12)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/sample/3_KS_w_szkolach4.csv"
                    className="text-primary hover:text-primary/80 hover:underline transition-colors flex items-center gap-2"
                    title="Plik przykładowy 4"
                    download
                    onClick={handle_sample_download}
                  >
                    <span className="text-lg">•</span>
                    <span>Plik 4 - Karty Sukcesów (szkoły 13-16)</span>
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <p className="text-lg text-center max-w-xl text-muted-foreground">
        Miłego korzystania z aplikacji!
      </p>
    </div>
  );
};

export default Home;
