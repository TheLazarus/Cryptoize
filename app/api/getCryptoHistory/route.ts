import { COMMON_HEADERS } from "../constants";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const requiredParams = ["currency", "interval"];

    requiredParams.forEach((param) => {
      if (!searchParams.get(param)) {
        throw new Error(`Are you missing the ${param} parameter?`);
      }
    });

    const currency = searchParams.get("currency");
    const interval = searchParams.get("interval");

    const apiEndpoint = process.env.COINCAP_API_ENDPOINT!;
    interval;
    const requestUri = `${apiEndpoint}/${currency}/history?apiKey=${process.env
      .COINCAP_API_KEY!}&interval=${interval}`;
    const response = await fetch(requestUri);
    const jsonParsedResponse = await response.json();

    return new Response(JSON.stringify(jsonParsedResponse), {
      status: 200,
      headers: { ...COMMON_HEADERS },
    });
  } catch (error) {
    const errorBody = JSON.stringify({
      errorMessage: (error as Error)?.message || "Something went wrong",
    });
    return new Response(errorBody, {
      status: 500,
      headers: { ...COMMON_HEADERS },
    });
  }
}
