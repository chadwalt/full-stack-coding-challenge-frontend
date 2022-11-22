import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

import Layout from "../components/layout";
import useApiData from "../hooks/use-api-data";
import Airport, { AirportResponse } from "../types/airport";

const Page: NextPage = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const airports = useApiData<AirportResponse>(
    `/api/airports/${query}?page=${page}&limit=${20}`,
    { page, pages: 1, total: 1, records: [] },
    [query, page]
  );

  const handlePreviousPage = () => {
    setPage((currentPage) => {
      if (currentPage <= 1) return 1;

      return currentPage - 1;
    });
  };

  const handleNextPage = () => {
    setPage((currentPage) => {
      if (currentPage >= airports.pages) return airports.pages;

      return currentPage + 1;
    });
  };

  const handlePageChange = (event: any) => {
    if (event.target.value >= airports.pages || event.target.value <= 1) {
      setPage(1);
      return;
    }

    setPage(Number(event.target.value));
  };

  const handleSearch = (event: any) => {
    setQuery(event.target.value)
    setPage(1)
  }

  return (
    <Layout>
      <h1 className="text-2xl mt-5 font-bold text-center">
        Code Challenge: Airports
      </h1>

      <div className="flex justify-center items-center mt-5 relative shadow-sm">
        <h2 className="text-xl mr-5 font-semibold">All Airports</h2>
        <input
          type="text"
          name="query"
          id="query"
          className="focus:ring-blue-600 focus:border-blue-600 block w-80 sm:text-sm border-gray-300 text-gray-800 rounded bg-gray-50 p-3"
          placeholder="Search by name, IATA, city, or country"
          onChange={handleSearch}
        />
      </div>
      <table className="table-fixed mx-auto mt-10 w-[60vw]">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {airports.records.map((airport) => (
            <tr>
              <td>
                <Link
                  className="text-blue-400 hover:text-blue-600 hover:underline"
                  href={`/airports/${airport.iata.toLowerCase()}`}
                  key={airport.iata}
                >
                  {airport.name}
                </Link>
              </td>
              <td>{airport.city}</td>
              <td>{airport.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex justify-center">
        <button
          className="outline outline-offset-0 w-8 rounded"
          onClick={handlePreviousPage}
        >
          &laquo;
        </button>
        <input
          type="number"
          name="query"
          id="query"
          className="border-blue-600 block w-[70px] mx-2 sm:text-sm text-gray-800 rounded bg-gray-50 p-3"
          value={page}
          onChange={handlePageChange}
        />
        <span className="flex items-center mr-1">/ {airports.pages}</span>
        <button
          className="outline outline-offset-0 w-8 rounded"
          onClick={handleNextPage}
        >
          &raquo;
        </button>
      </div>
    </Layout>
  );
};

export default Page;
