import AppHeader from "./components/AppHeader";
import AppSearchForm from "./components/AppSearchForm";
import AppWeatherCard from "./components/AppWeatherCard";
import AppWeatherDetails from "./components/AppWeatherDetails";
import AppDailyForecast from "./components/AppDailyForecast";
import AppHourlyForecast from "./components/AppHourlyForecast";

function App() {
  return (
    <>
      <AppHeader />

      <main className="grid-template my-12 flex grid-cols-[800px_1fr] grid-rows-[0fr_0fr_286px_0fr_0fr] flex-col xl:my-[60px] xl:grid">
        <h1 className="grid-area-slogan font-bricolage-grotesque self-center text-[54px] leading-16 font-bold">
          How's the sky looking today?
        </h1>

        <AppSearchForm />

        <AppWeatherCard />

        <AppWeatherDetails />

        <AppDailyForecast />

        <AppHourlyForecast />
      </main>
    </>
  );
}

export default App;
