/* eslint-disable @typescript-eslint/no-explicit-any */
import PageLayout from "@/components/common/page-layout";
import { usersColumns } from "@/components/management/users/users-columns";
import { UsersFilter } from "@/components/management/users/users-filter";
import { DataTable } from "@/components/ui/custom/data-table";
import PageHeader from "@/components/ui/custom/page-header";
// import useSmartFetchHook from "@/hooks/useSmartFetchHook";
// import { useGetAllUsersQuery } from "@/redux/feature/user/userApis";
import type { TUser } from "@/types/user.type";
import { useMemo, useState } from "react";

interface UserRoleListProps {
  role: string;
  title: string;
  description: string;
}

const FAKE_USERS: TUser[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-02-24",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-23",
  },
  {
    _id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    status: "blocked",
    createdAt: "2024-02-22",
  },
] as any;

export const UserRoleList = ({ title, description }: UserRoleListProps) => {
  /*
  const {
    data,
    meta,
    isLoading,
    isError,
    filter,
    setFilter,
    setPage,
  } = useSmartFetchHook<{ page: number; limit: number; search: string; role: string }, TUser>(
    useGetAllUsersQuery,
    { role }
  );
  */

  const [page, setPage] = useState(1);

  const isLoading = false;
  const isError = false;
  const meta = { total: FAKE_USERS.length, page, limit: 10, totalPage: 1 };

  // Filter out the actions column
  const columns = useMemo(() => {
    return usersColumns.filter((col) => col.id !== "actions");
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title={title}
          description={description}
          length={meta?.total || 0}
        />

        <UsersFilter />
      </div>

      <DataTable
        columns={columns}
        data={FAKE_USERS || []}
        meta={meta}
        onPageChange={setPage}
        isLoading={isLoading}
        isError={isError}
      />
    </PageLayout>
  );
};
