/* eslint-disable */
import { api } from "~/trpc/server";

import { getServerAuthSession } from "~/server/auth";

import { NextRequest } from "next/server";

import { OpenAIStream, StreamingTextResponse } from "ai";
import { openai } from "~/lib/openai";
import { SendMessageValidator } from "~/lib/SendMessageValidator";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const session = await getServerAuthSession();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const { id: userId } = session.user;

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { message } = SendMessageValidator.parse(body);

  await api.message.createMessage.mutate({
    text: message,
    isUserMessage: true,
  });

  const prevMessages = await api.message.getMessages.query();

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? ("user" as const) : ("assistant" as const),
    content: msg.text,
  }));

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
      },
      {
        role: "user",
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
        
  \n----------------\n
  
  PREVIOUS CONVERSATION:
  ${formattedPrevMessages.map((message) => {
    if (message.role === "user") return `User: ${message.content}\n`;
    return `Assistant: ${message.content}\n`;
  })}
  
  \n----------------\n
  
  USER INPUT: ${message}`,
      },
    ],
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await api.message.createMessage.mutate({
        text: completion,
        isUserMessage: false,
      });
    },
  });

  return new StreamingTextResponse(stream);
};
