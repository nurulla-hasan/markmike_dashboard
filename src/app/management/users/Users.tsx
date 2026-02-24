
import PageLayout from "@/components/common/page-layout";
import { usersColumns } from "@/components/management/users/users-columns";
import { UsersFilter } from "@/components/management/users/users-filter";
import { DataTable } from "@/components/ui/custom/data-table";
import PageHeader from "@/components/ui/custom/page-header";
import type { TUser } from "@/types/user.type";
// import useSmartFetchHook from "@/hooks/useSmartFetchHook";
// import { useGetAllUsersQuery } from "@/redux/feature/user/userApis";

const mockUsers: TUser[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    email: "john.doe@example.com",
    contact: "+1234567890",
    status: "active",
    isOtpVerified: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60",
    location: "New York, USA",
    gender: "Male",
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    contact: "+1987654321",
    status: "inactive",
    isOtpVerified: true,
    createdAt: "2023-02-20T14:30:00Z",
    updatedAt: "2023-02-20T14:30:00Z",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60",
    location: "London, UK",
    gender: "Female",
  },
  {
    _id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    fullName: "Michael Johnson",
    email: "michael.j@example.com",
    contact: "+1122334455",
    status: "active",
    isOtpVerified: false,
    createdAt: "2023-03-10T09:15:00Z",
    updatedAt: "2023-03-10T09:15:00Z",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
    location: "Sydney, Australia",
    gender: "Male",
  },
  {
    _id: "4",
    firstName: "Emily",
    lastName: "Davis",
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    contact: "+1555666777",
    status: "blocked",
    isOtpVerified: true,
    createdAt: "2023-04-05T16:45:00Z",
    updatedAt: "2023-04-05T16:45:00Z",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60",
    location: "Toronto, Canada",
    gender: "Female",
  },
  {
    _id: "5",
    firstName: "David",
    lastName: "Wilson",
    fullName: "David Wilson",
    email: "david.wilson@example.com",
    contact: "+1999888777",
    status: "active",
    isOtpVerified: true,
    createdAt: "2023-05-12T11:20:00Z",
    updatedAt: "2023-05-12T11:20:00Z",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60",
    location: "Berlin, Germany",
    gender: "Male",
  },
];

const Users = () => {
  // Integration Logic Commented Out
  /*
  const {
    data,
    meta,
    isLoading,
    isError,
    filter,
    setFilter,
    setPage,
  } = useSmartFetchHook<{ page: number; limit: number; search: string }, TUser>(useGetAllUsersQuery);
  */

  // Mock State

  const data = mockUsers;
  const meta = {
    page: 1,
    limit: 10,
    total: mockUsers.length,
    totalPage: 1,
  };
  const isLoading = false;
  const isError = false;

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="User Management"
          description="User all Platform Users"
          length={meta?.total || 0}
        />

        <UsersFilter />
      </div>

      <DataTable
        columns={usersColumns}
        data={data || []}
        meta={meta}
        // onPageChange={setPage} 
        isLoading={isLoading}
        isError={isError}
      />
    </PageLayout>
  );
};

export default Users;
