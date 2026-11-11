import {useQuery} from "@tanstack/react-query";
import {getCurrentWeather} from "../services/OWMAPI";
import type {CurrentWeatherData} from "../services/OWMAPI.types";

export const useCurrentWeather = (city: string) => {
	return useQuery<CurrentWeatherData>({
		queryKey: ["current-weather", city],
		queryFn: () => getCurrentWeather(city),
	});
};