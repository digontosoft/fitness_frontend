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
import AssignTraineeToAdmin from "./AssignTraineeToAdmin";
import DeleteModal from "./DeleteModal";
import EditAdmin from "./EditAdmin";
import ViewAdmin from "./ViewAdmin";
// import DeleteModal from "./DeleteModal";

export default function AdminTable() {
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isViewAdmin, setViewAdmin] = useState(null);
  const [openView, setIsOpenView] = useState(false);
  const [EditModal, setIsEditModal] = useState(null);
  const [openEdit, setIsEdit] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAdmin, setDeleteAdmin] = useState(null);

  ScrollTop();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${base_url}/getAdminUser?limit=1000&page=1&search=${search}`
      );

      // শুধু admin ইউজারগুলো নেব
      const onlyAdmins = res.data.data.filter(
        (user) => user.userType === "admin"
      );

      // যদি email search করতে চাও
      const filteredAdmins = onlyAdmins.filter((user) =>
        user.email?.toLowerCase().includes(search.toLowerCase())
      );

      // Pagination handle
      const itemsPerPage = 10;
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedAdmins = filteredAdmins.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      // name format
      const formattedAdmins = paginatedAdmins.map((user) => ({
        ...user,
        name: user.full_name
          ? user.full_name
          : `${user.firstName || ""} ${user.lastName || ""}`,
      }));

      setAdmins(formattedAdmins);
      setTotalPages(Math.ceil(filteredAdmins.length / itemsPerPage));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleDeleteClick = (admin) => {
    setDeleteAdmin(admin);
    setDeleteModalOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/deleteUser/${deleteAdmin._id}`);
      toast.success("Admin deleted successfully");
      setAdmins((prev) => prev.filter((u) => u._id !== deleteAdmin._id));
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setDeleteAdmin(null);
    }
  };

  const handleUpdate = (admin) => {
    setIsEditModal(admin), setIsEdit(true);
  };

  const handleSave = async (formData) => {
    try {
      const res = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: EditModal._id,
        gender: formData.gender,
        firstName: formData.firstName,
        lastName: formData.lastName,
        full_name: formData.full_name,
        userType: formData.userType,
      });
      if (res.status === 200) {
        toast.success("Admin updated successfully!");
        setIsEdit(false);
        setIsEditModal(null);
        fetchUsers();
      }
    } catch (err) {
      toast.error("Update failed!");
    }
    // console.log("payload", formData);
  };

  const handleView = (admins) => {
    setViewAdmin(admins);
    setIsOpenView(true);
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
      cell: ({ row }) => row.getValue("name"),
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
      id: "actions",
      header: "פעולות",
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <div className="flex gap-2">
            <Button
              className="bg-red-500 text-white"
              size="sm"
              onClick={() => handleView(row.original)}
            >
              <Eye />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteClick(row.original)}
            >
              <Trash />
            </Button>
            <AssignTraineeToAdmin adminId={id} />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: admins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4 sm:px-0" dir="ltr">
      <div className="flex justify-between py-4">
        <input
          type="search"
          placeholder="חפש מנהל..."
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <div className="rounded-md border">
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
            {table.getRowModel().rows.length ? (
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
                  No admins found
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
      {openView && isViewAdmin && (
        <ViewAdmin admin={isViewAdmin} onClose={() => setIsOpenView(false)} />
      )}
      ;
      {openEdit && EditModal && (
        <EditAdmin
          onClose={() => setIsEdit(false)}
          onSave={handleSave}
          admin={EditModal}
        />
      )}
      {deleteModalOpen && deleteAdmin && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          adminName={deleteAdmin?.name}
        />
      )}
    </div>
  );
}
