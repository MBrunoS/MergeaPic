import { useResponseBodyParser } from "./useResponseBodyParser";

describe("parse", () => {
  const parser = useResponseBodyParser();

  it("parses a multipart response", async () => {
    const boundary = "test-boundary";
    const response = new Response(
      `--${boundary}\r\nContent-Type: image/jpeg\r\n\r\ndGVzdC1pbWFnZQ==\r\n--${boundary}--\r\n`,
      {
        headers: {
          "content-type": `multipart/mixed; boundary=${boundary}`,
        },
      }
    );

    const result = [];
    for await (const chunk of parser.parse(response)) {
      result.push(chunk);
    }

    expect(result).toEqual(["dGVzdC1pbWFnZQ=="]);
  });

  it("throws an error if content-type header is missing", async () => {
    const response = new Response("Hello, world!");

    try {
      parser.parse(response);
    } catch (error) {
      expect((error as any).message).toBe(
        "Missing content-type header in response"
      );
    }
  });

  it("throws an error if boundary value is missing", async () => {
    const response = new Response("Hello, world!", {
      headers: {
        "content-type": "multipart/mixed",
      },
    });

    try {
      parser.parse(response);
    } catch (error) {
      expect((error as any).message).toBe(
        "Missing boundary value in content-type header"
      );
    }
  });
});
