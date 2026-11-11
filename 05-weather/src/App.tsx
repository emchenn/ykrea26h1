import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import type { CurrentWeatherData } from "./services/OWMAPI.types";
import "./assets/scss/App.scss";
import LoadingWeather from "./components/LoadingWeather";
import { useCurrentWeather } from "./hooks/useCurrentWeather";


function App() {
	const { data: currentWeatherData, isLoading, isError } = useCurrentWeather("Stockholm");


	const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);


	const handleSearch = async (location: string) => {
		// Reset state
		setCurrentWeather(null);
		// Reset error
		// setError(null);
		//setIsLoading(true);

		try {
			// Call API and get current weather at `location`
			const data = await getCurrentWeather(location);

			// Update current weather state with the API-response
			setCurrentWeather(data);

		} catch (err) {
			if (err instanceof Error) {
				{isError && <Alert variant="danger">{isError}</Alert>}
				//setError(err.message);
			} else {
				//setError("An unknown error occurred");
				{isError && <Alert variant="danger">{isError}</Alert>}
				// setError("This should never happen...");
			}
		} finally {
			isLoading(false);
		}
	}

	return (
		<Container as="main" id="app">
			<header className="app-header">
				<h1>Weather</h1>
			</header>

			<SearchCity isLoading={isLoading} onSearch={handleSearch} />

			{isError && <Alert variant="danger">{isError}</Alert>}

			{isLoading && <LoadingWeather />}

			{!isLoading && !currentWeather && (
				<div className="weather-status">
					<p>Search for a city to see the current weather.</p>
				</div>
			)}

			<div aria-live="polite" aria-busy={isLoading}>
				{currentWeather && <CurrentWeather data={currentWeather} />}
			</div>
		</Container>
	);
}

export default App;
