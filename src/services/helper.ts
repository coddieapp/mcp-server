function parseApiKey(): string {
  const args = process.argv;
  const apiKeyIndex = args.indexOf('--api-key');

  if (apiKeyIndex === -1) {
    throw new Error('API key is required. Please provide --api-key argument.');
  }

  const apiKey = args[apiKeyIndex + 1];

  if (!apiKey || apiKey.startsWith('--')) {
    throw new Error('Invalid API key provided. Please provide a valid API key after --api-key flag.');
  }

  return apiKey;
}

export async function makeCoddieRequest<T>(
  endpoint: string,
  method: "GET",
  body?: any
): Promise<T> {
  const apiKey = parseApiKey();
  const baseUrl = 'https://app.coddie.dev/api/mcp';

  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "User-Agent": "coddie-mcp-server/1.0.0",
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error making Coddie API request:", error);
    throw error;
  }
}