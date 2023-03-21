import { rest } from "msw";
import { DataType } from "../interfaces/interface";

import Data from "../store/data.json";

export const handlers = [
  rest.get(`/movies/:listNo`, (req, res, ctx) => {
    const { listNo } = req.params;

    return res(
      ctx.status(200),
      ctx.json(
        Data[Number.parseInt(Array.isArray(listNo) ? listNo[0] : listNo)]
      )
    );
  }),

  rest.post("/movies/:listNo", async (req, res, ctx) => {
    const { overId, details } = await req.json();
    const { listNo } = req.params;

    const index = Number.parseInt(Array.isArray(listNo) ? listNo[0] : listNo);
    let list: DataType[] = [];
    list = Data[index].reduce((prev, curr) => {
      if (curr.id === overId) {
        prev.push(details);
      }
      prev.push(curr);
      return prev;
    }, list);

    Data[index] = list;

    return res(ctx.status(200), ctx.json(Data[index]));
  }),

  rest.post("/movies/push/:listNo", async (req, res, ctx) => {
    const details = await req.json();
    const { listNo } = req.params;

    const index = Number.parseInt(Array.isArray(listNo) ? listNo[0] : listNo);

    Data[index] = [...Data[index], ...details];

    return res(ctx.status(200), ctx.json(Data[index]));
  }),

  rest.delete("/movies/:listNo", async (req, res, ctx) => {
    const details = await req.json();
    const { listNo } = req.params;
    const index = Number.parseInt(Array.isArray(listNo) ? listNo[0] : listNo);
    let list: DataType[] = [];

    list = Data[index].reduce((prev, curr) => {
      if (curr.id !== details.id) prev.push(curr);
      return prev;
    }, list);

    Data[index] = list;

    return res(ctx.status(200), ctx.json(Data[index]));
  }),

  rest.delete("/list/:listNo", (req, res, ctx) => {
    const { listNo } = req.params;
    const index = Number.parseInt(Array.isArray(listNo) ? listNo[0] : listNo);

    Data[index] = [];

    return res(ctx.status(200), ctx.json(Data[index]));
  }),
];
