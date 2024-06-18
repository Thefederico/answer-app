import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
});

async function bufferToBase64(buffer: Buffer): Promise<string> {
  return buffer.toString("base64");
}

export async function POST(req: Request) {
  const data = await req.formData();

  const file = data.get("file") as File;
  const prompt = data.get("prompt")?.toString();

  if (!prompt) {
    return new Response("Prompt is required", { status: 400 });
  }

  if (!file) {
    return new Response("File is required", { status: 400 });
  }

  try {
    const buffer = await file.arrayBuffer();
    const base64Image = await bufferToBase64(Buffer.from(buffer));

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: "low",
              },
            },
          ],
        },
      ],
    });

    return new Response(JSON.stringify(response.choices[0].message), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error converting file to base64", { status: 500 });
  }
}
