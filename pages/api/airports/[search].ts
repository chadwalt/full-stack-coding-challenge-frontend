import { NextApiRequest, NextApiResponse } from "next";

import { allAirports, searchAirports } from "../../../models/airport";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { search, page, limit } = req.query;

  if (search === "") {
    const all = await allAirports({ page: Number(page), limit: Number(limit) });

    res.status(200).json(all);
  }

  const response = await searchAirports(search.toString(), {
    page: Number(page),
    limit: Number(limit),
  });
  const airports = response !== undefined ? response : [];

  res.status(200).json(airports);
};
