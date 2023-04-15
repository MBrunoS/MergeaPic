export function useResponseBodyParser() {
  async function* parse(response: Response) {
    const contentType = response.headers.get("content-type");
    if (!contentType) {
      throw new Error("Missing content-type header in response");
    }

    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) {
      throw new Error("Missing boundary value in content-type header");
    }

    const boundary = boundaryMatch[1];

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let chunks = await reader.read();
    let payload = "";

    while (!chunks.done) {
      const chunkText = decoder.decode(chunks.value);
      const lines = chunkText.split(/\r\n\r\n/);

      for (const line of lines) {
        const boundaryIndex = line.indexOf("--" + boundary);

        if (boundaryIndex === 0) {
          if (payload.length > 0) {
            yield payload;
            payload = "";
          }
        } else if (boundaryIndex > 0) {
          payload += line.slice(0, boundaryIndex - 2);
          yield payload;
          payload = "";
        } else {
          payload += line;
        }
      }

      chunks = await reader.read();
    }
  }

  return { parse };
}
