export async function POST(req: Request) {
  const body = await req.json();
  // console.log("req", body);
  const res = await fetch(process.env.SD_MODEL_HOST!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  return new Response(text);
}
