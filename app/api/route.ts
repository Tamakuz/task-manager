import { connectToDataBase } from "@/configs/DBconnect";

export const GET = async () => {
  await connectToDataBase();
  return new Response("Hello, Next.js!");
}