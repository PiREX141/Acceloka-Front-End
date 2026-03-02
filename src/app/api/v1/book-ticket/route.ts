// app/api/v1/book-ticket/route.ts

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(`${process.env.API_URL}/book-ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ error: "Failed to book ticket" }));
      return Response.json(errorData, { status: res.status });
    }

    const data = await res.json();

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error booking ticket:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
