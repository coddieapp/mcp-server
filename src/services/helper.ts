let coddieApiKey: string;
export function setCoddieApiKey(apiKey: string) {
  coddieApiKey = apiKey;
}

export async function makeCoddieRequest<T>(
  endpoint: string,
  method: "GET",
  body?: any
): Promise<T> {
  if (!coddieApiKey) {
    throw new Error('API key not set. Please ensure the server was started with a valid API key.');
  }

  const baseUrl = 'https://app.coddie.dev/api/mcp';

  const headers = {
    "Authorization": `Bearer ${coddieApiKey}`,
    "Content-Type": "application/json",
    "User-Agent": "coddie-mcp-server/1.0.0",
  };

  try {
    const url = `${baseUrl}${endpoint}`;
    console.error(`Making request to: ${url}`);

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    console.error(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Response error: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    console.error(`Response data: ${JSON.stringify(data, null, 2)}`);
    return data;
  } catch (error) {
    console.error("Error making Coddie API request:", error);
    throw error;
  }
}