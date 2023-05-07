// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { App, Response } from "@/models";
import { getTrans } from "@/utils/helper";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<App[]>>
) {
  const locale = req.headers['accept-language'];
  const trans = getTrans(locale as string);

  if (req.method === "GET") {
    const Apps: App[] = [
      {
        id: "1",
        name: trans["replacement_app"],
        description: trans["replacement_app_description"],
        path: "/replacement-app",
      },
    ];

    res.status(200).json({ code: 1, message: "success", data: Apps });
  }
}
