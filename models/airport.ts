import airports from "../data/airports.json";
import Airport, { AirportResponse } from "../types/airport";

export const findAirportByIata = async (
  iata: string
): Promise<Airport | undefined> => {
  return airports.find((airport) => airport.iata === iata.toUpperCase());
};

export const allAirports = async ({
  limit = 50,
  page = 1,
}: {
  limit: number;
  page: number;
}): Promise<AirportResponse> => {
  const numberOfAirports = airports.length;
  const numberOfPages = numberOfAirports / limit;
  const offset = (page - 1) * limit;

  return {
    total: numberOfAirports,
    pages: Math.ceil(numberOfPages),
    page,
    records: airports.slice(offset, offset + limit),
  };
};

export const searchAirports = async (
  query: string,
  { limit = 50, page = 1 }: { limit: number; page: number }
): Promise<AirportResponse> => {
  const regex = new RegExp(query, "i");
  const records = airports.filter(
    (airport) =>
      regex.test(airport.iata) ||
      regex.test(airport.name) ||
      regex.test(airport.city) ||
      regex.test(airport.country)
  );
  const numberOfAirports = records.length;
  const numberOfPages = numberOfAirports / limit;
  const offset = (page - 1) * limit;

  return {
    total: numberOfAirports,
    pages: Math.ceil(numberOfPages),
    page,
    records: records.slice(offset, offset + limit),
  };
};
