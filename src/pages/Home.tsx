const Home = () => {
  return (
    <div className="h-full flex flex-col m-auto items-center justify-center gap-4 my-8">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Cześć!</h1>
        <p className="text-xl">Witaj w aplikacji sortowania spotkań SuperW</p>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mt-4">O aplikacji</h2>
        <div className="w-24 h-1 bg-slate-800 mb-2 rounded-md"></div>
        <div>
          <p className="text-lg text-center max-w-xl">
            Ta aplikacja pomaga w sortowaniu spotkań na podstawie statusu Kart
            Sukcesów wyeksportowanych z systemu Wiosny. Możesz załadować pliki
            CSV, filtrować spotkania według statusu i pobrać raport w formacie
            Excel.
          </p>
          <p className="text-lg text-center max-w-xl">
            Aplikacja działa lokalnie w Twojej przeglądarce, więc Twoje dane są
            bezpieczne i działa również offline.
          </p>
          <p className="text-lg text-center max-w-xl">
            Projekt jest open-source co zapewnia pełną przejrzystość i dostępny
            jest na GitHub pod linkiem{" "}
            <a
              href="https://github.com/KKocot/excel-reader"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              excel-reader
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mt-4">Jak zacząć?</h2>
        <div className="w-24 h-1 bg-slate-800 mb-2 rounded-md"></div>
        <p className="text-lg text-center max-w-xl">
          Aby rozpocząć, przejdź do zakładki "Spotkania" i załaduj pliki CSV
          wyeksportowane z Kwap1. Następnie możesz filtrować spotkania według
          statusu i pobrać raport Kart Sukcesów w formacie Excel.
        </p>
        <p className="text-lg text-center max-w-xl">
          Przykładowe pliki CSV znajdziesz{" "}
        </p>
        <a
          href="/sample/3_KS_w_szkolach1.csv"
          className="text-blue-500 hover:underline"
          title="files"
          download
        >
          Plik 1
        </a>
        <a
          href="/sample/3_KS_w_szkolach2.csv"
          className="text-blue-500 hover:underline"
          title="files"
          download
        >
          Plik 2
        </a>
        <a
          href="/sample/3_KS_w_szkolach3.csv"
          className="text-blue-500 hover:underline"
          title="files"
          download
        >
          Plik 3
        </a>
        <a
          href="/sample/3_KS_w_szkolach4.csv"
          className="text-blue-500 hover:underline"
          title="files"
          download
        >
          Plik 4
        </a>
      </div>

      <p className="text-lg text-center max-w-xl">
        Miłego korzystania z aplikacji!
      </p>
    </div>
  );
};

export default Home;
