"use client";

import { trpcServer } from "@/app/_trpc/caller";
import { trpcClient } from "@/app/_trpc/client";
import { RequestDataTable } from "./routes/requests/requests-data-table";
import { requestColumns } from "./routes/requests/requests-table-columns";

export default function TestHandler({
  initialReq,
}: {
  initialReq: Awaited<
    ReturnType<(typeof trpcServer)["requests"]["getRequestTableData"]>
  >;
}) {
  const getData = trpcClient.requests.getRequestTableData.useQuery(undefined, {
    initialData: initialReq,
  });

  return (
    <RequestDataTable
      columns={requestColumns}
      data={getData.data.requestTableData}
    />
  );
}
