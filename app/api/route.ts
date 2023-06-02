import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST" || !req.body) {
    return;
  }

  const { code } = await req.json();

  const options = {
    method: "POST",
    url: process.env.X_Url_Post_Submission,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
    data: {
      language_id: 63,
      source_code: btoa(code),
      stdin: "SnVkZ2Uw",
    },
  };

  try {
    const response = await axios.request(options);
    const token = response.data.token;
    const result = await checkResult(token);

    if (result.data.status_id === 1 || result.data.status_id === 2) {
      setTimeout(() => checkResult(token), 2000);
    } else {
      return NextResponse.json({ data: result.data });
    }
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}

async function checkResult(token: string) {
  const options = {
    method: "GET",
    url: `${process.env.X_Url_Post_Submission}/${token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  };

  return axios.request(options);
}
