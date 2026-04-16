import { base_url } from "@/api/baseUrl";
import PaginationComp from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScrollTop from "@/shared/ScrollTop";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Eye, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";
import DeleteModal from "../adminList/DeleteModal";
import ViewUser from "./ViewUser";

export default function RecipeBookUserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isViewUser, setViewUser] = useState(null);
  const [openView, setIsOpenView] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  ScrollTop();

  const fetchUsers = async () => {
    setFetchError("");
    setIsFetching(true);
    try {
      const res = await axios.get(
        `${base_url}/getUsers?limit=1000&page=1&search=${search}`
      );
      
      // Filter only users with userType "recipe"
      const recipeBookUsers = res.data.data.filter(
        (user) => user.userType === "recipe"
      );
      
      // Additional search filter
      const filteredUsers = recipeBookUsers.filter((user) =>
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(search.toLowerCase())
      );
      
      // Pagination
      const itemsPerPage = 10;
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedUsers = filteredUsers.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      
      // Format users with name
      const formattedUsers = paginatedUsers.map((user) => ({
        ...user,
        name: user.full_name
          ? user.full_name
          : `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      }));
      
      setUsers(formattedUsers);
      setTotalPages(Math.ceil(filteredUsers.length / itemsPerPage));
    } catch (err) {
      console.error(err);
      setFetchError("Failed to load users");
      toast.error("Failed to load users");
    } finally {
      setIsFetching(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleDeleteClick = (user) => {
    setDeleteUser(user);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${base_url}/deleteUser/${deleteUser._id}`);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u._id !== deleteUser._id));
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setDeleteUser(null);
    }
  };

  const handleView = (user) => {
    setViewUser(user);
    setIsOpenView(true);
  };

  const handleCloseView = () => {
    setIsOpenView(false);
    // Small delay to ensure modal unmounts before clearing user data
    setTimeout(() => {
      setViewUser(null);
    }, 200);
  };

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => row.getValue("name") || "N/A",
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          דואר אלקטרוני
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "userType",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          סוג משתמש
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const userType = row.getValue("userType");
        return (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
            {userType === "recipe" ? "חבר קהילה" : userType}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "פעולות",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              className="bg-[#7994CB] text-white"
              size="sm"
              onClick={() => handleView(row.original)}
            >
              <Eye />
            </Button>
            <Button
              className="bg-[#7994CB] text-white hover:text-white hover:bg-[#6a84b8]"
              size="sm"
              onClick={() => handleDeleteClick(row.original)}
            >
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isInitialLoading) {
    return (
      <div className="max-w-6xl mx-auto min-h-screen px-4 sm:px-2" dir="ltr">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4 sm:px-2" dir="ltr">
      {/* Title Section */}
      <div className="py-4 sm:py-6 flex justify-center items-center mt-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">רשימת חברי קהילה</h1>
        
      </div>
      
      {/* Search Section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-4">
        <input
          type="search"
          placeholder="חפש משתמש (שם או אימייל)..."
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full max-w-xs"
        />
        {isFetching && (
          <span className="text-sm text-gray-500 font-medium">Loading...</span>
        )}
      </div>
      
      {/* Table Section */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {fetchError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {fetchError}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end py-4">
        <PaginationComp
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      {openView && isViewUser && (
        <ViewUser user={isViewUser} onClose={handleCloseView} />
      )}
      {deleteModalOpen && deleteUser && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          adminName={deleteUser?.name}
        />
      )}
    </div>
  );
}

