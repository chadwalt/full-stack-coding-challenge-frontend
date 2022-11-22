import { NextApiRequest, NextApiResponse } from "next";

import { allAirports } from "../../../models/airport";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit } = req.query;

  const airports = await allAirports({
    limit: Number(limit),
    page: Number(page),
  });

  res.status(200).json(airports);
};
