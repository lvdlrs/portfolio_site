import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

const token = process.env.SANITY_API_REVALIDATE_SECRET;

export const POST = async (request: NextRequest) => {
  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const { isValidSignature } = await parseBody(
    request,
    process.env.SANITY_API_REVALIDATE_SECRET,
    true,
  );
  if (!isValidSignature) return new Response("Invalid secret", { status: 400 });

  revalidateTag("sanity");

  return new Response("ok", { status: 200 });
};
