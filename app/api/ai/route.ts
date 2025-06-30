import { NextResponse } from "next/server";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";

// ✅ Updated allowed models
const allowedModels = [
  "xai/grok-3",
  "openai/gpt-4.1",
  "deepseek/DeepSeek-R1",
  "meta/Llama-4-Scout-17B-16E-Instruct",
  "microsoft/Phi-4",
  "mistral-ai/mistral-medium-2505"
];

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid messages array" }, { status: 400 });
    }

    if (!model || !allowedModels.includes(model)) {
      return NextResponse.json({ success: false, message: "Invalid or missing model" }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json({ success: false, message: "Missing API token" }, { status: 500 });
    }

    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
      body: {
        model,
        messages,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 500
      },
    });

    const reply = response.body.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("No response content from model.");
    }

    return NextResponse.json({ success: true, answer: reply });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Server error" }, { status: 500 });
  }
}
