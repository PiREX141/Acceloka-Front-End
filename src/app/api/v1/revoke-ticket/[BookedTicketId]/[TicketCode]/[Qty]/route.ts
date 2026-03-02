// app/api/v1/revoke-ticket/[BookedTicketId]/[TicketCode]/[Qty]/route.ts

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { BookedTicketId: string; TicketCode: string; Qty: string };
  },
) {
  try {
    const { BookedTicketId, TicketCode, Qty } = params;

    const res = await fetch(
      `${process.env.API_URL}/revoke-ticket/${BookedTicketId}/${TicketCode}/${Qty}`,
      {
        method: "DELETE",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ error: "Failed to revoke ticket" }));
      return Response.json(errorData, { status: res.status });
    }

    const data = await res.json();

    return await Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error revoking ticket:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
