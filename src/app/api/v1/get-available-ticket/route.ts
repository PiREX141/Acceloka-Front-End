// app/api/v1/get-available-ticket/route.ts

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const res = await fetch(
      `${process.env.API_URL}/get-available-ticket${queryString ? `?${queryString}` : ""}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ error: "Failed to fetch available tickets" }));
      return Response.json(errorData, { status: res.status });
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching available tickets:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
