import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    // Extract the localityId from the query parameters
    const { searchParams } = new URL(request.url);
    const localityId = searchParams.get("localityId");

    if (!localityId) {
      return NextResponse.json(
        { error: "Missing localityId parameter" },
        { status: 400 }
      );
    }

    const options = {
      method: "GET",
      url: "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
      params: { locality_id: localityId },
      headers: { "X-Zomato-Api-Key": `${process.env.API_KEY}` },
    };

    const { data } = await axios.request(options);

    if (data.status === "200") {
      return NextResponse.json(
        { locality_weather_data: data.locality_weather_data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: data.message || "Error fetching weather data" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
