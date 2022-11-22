interface Airport {
  name: string;
  iata: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
}

export interface AirportResponse {
  pages: number;
  page: number;
  total: number;
  records: Airport[];
}

export default Airport;
