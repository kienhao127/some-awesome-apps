// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { App, Response } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<App[]>>
) {

  if (req.method === "GET") {
    const Apps: App[] = [
      {
        id: "1",
        name: 'replacement_app',
        description: 'replacement_app_description',
        path: "/replacement-app",
      },
      {
        id: "2",
        name: 'px2rem_converter',
        description: 'px2rem_converter_description',
        path: "/px-to-rem-converter",
      }
    ];

    res.status(200).json({ code: 1, message: "success", data: Apps });
  }
}
