import { NextRequest } from "next/server";
import { COMMON_HEADERS } from "../constants";

export async function GET(request: NextRequest) {
  try {
    const apiEndpoint = process.env.COINCAP_API_ENDPOINT!;
    const requestUri = `${apiEndpoint}?apiKey=${process.env.COINCAP_API_KEY!}`;
    const response = await fetch(requestUri);
    const jsonParsedResponse = await response.json();

    return new Response(JSON.stringify(jsonParsedResponse), {
      status: 200,
      headers: { ...COMMON_HEADERS },
    });
  } catch (error) {
    const errorBody = JSON.stringify({
      errorMessage: (error as Error)?.message || "Something went wrong!",
    });
    return new Response(errorBody, {
      status: 500,
      headers: { ...COMMON_HEADERS },
    });
  }
}
