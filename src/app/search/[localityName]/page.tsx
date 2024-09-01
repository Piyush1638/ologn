"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { places } from "@/lib/localityNames";
import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import { fetchWeatherInfo } from "@/lib/helpers/fetchWeatherInfo";

const Page = () => {
  const pathname = usePathname();
  const [location, setLocation] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const locationName = decodeURIComponent(pathname.split("/search/")[1]);
    if (locationName) {
      setLocation(locationName);

      const foundPlace = places.find(
        (place) =>
          place.localityName.toLowerCase() === locationName.toLowerCase()
      );

      if (foundPlace) {
        fetchWeatherInfo(foundPlace.localityId)
          .then((data) => setWeatherData(data))
          .catch((err) => setError(err.message));
      } else {
        setError("No matching locality found");
      }
    }
  }, [pathname]);

  // Determine if it is day or night
  const currentTime = new Date().getHours();
  const isDayTime = currentTime >= 6 && currentTime < 18;
  const imageSrc = isDayTime ? "/search/sun.png" : "/search/moon.png";

  return (
    <main className="relative flex min-h-screen w-full items-center md:justify-evenly justify-center flex-col md:py-20 md:px-10 px-4 md:gap-4 gap-28 bg-[#3e669f] overflow-hidden">
      <div className="absolute -top-4 -left-12 h-[32rem] w-[32rem] rounded-full blur-[120px] bg-slate-200" />
      <SearchForm />
      <div className="w-full flex md:flex-row flex-col items-center justify-evenly z-10">
        <Image
          src={imageSrc}
          alt="Sun or Moon"
          height={300}
          width={300}
          className="md:h-[300px] md:w-[300px] h-56 w-56"
        />

        {weatherData ? (
          <div className="weather-data flex flex-col gap-6 items-center justify-center">
            <h3 className="lg:text-[120px] md:text-[100px] text-6xl text-white font-petit-formal-script">
              {weatherData.temperature}°C
            </h3>
            <p className="text-white text-lg font-poppins">{location}</p>
            <div className="flex items-center justify-between gap-10">
              <WeatherInfo
                iconSrc={"/search/humidity.png"}
                value={`${weatherData.humidity} %`}
                label="Humidity"
              />
              <WeatherInfo
                iconSrc={"/search/wind-speed.png"}
                value={`${weatherData.wind_speed} m/s`}
                label="Wind Speed"
              />
            </div>
          </div>
        ) : (
          <p>{error || "Loading weather data..."}</p>
        )}
      </div>
    </main>
  );
};

export default Page;

interface WeatherInfoProps {
  iconSrc: string;
  value: string;
  label: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ iconSrc, value, label }) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={iconSrc}
        alt={label}
        height={80}
        width={100}
        className="md:w-20 md:h-20 w-20 h-20"
      />
      <div className="flex flex-col">
        <span className="text-white font-poppins">{value}</span>
        <p className="text-sm text-white font-poppins">{label}</p>
      </div>
    </div>
  );
};
