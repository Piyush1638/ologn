// lib/fetchWeatherInfo.ts
import axios from "axios";

export const fetchWeatherInfo = async (localityId: string) => {
  try {
    const response = await axios.get("/api/get_locality_weather_data", {
      params: { localityId: localityId },
    });
    return response.data.locality_weather_data;
  } catch (error) {
    throw new Error("Error fetching weather data: " + (error as Error).message);
  }
};
