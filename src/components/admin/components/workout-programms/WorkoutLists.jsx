import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteWorkout } from "@/api/deleteData";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WorkoutDetails from "./WorkoutDetails";
import PaginationComp from "@/components/pagination";
import { GoSearch } from "react-icons/go";
import Loading from "@/components/common/Loading";

export default function WorkoutLists() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [workout, setWorkout] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWorkout, setselectedWorkout] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם האימון
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          תיאור האימון
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const description = row.getValue("description") || "";
        const truncatedDescription =
          description.length > 100
            ? description.slice(0, 100) + "..."
            : description;
        return <div className="lowercase">{truncatedDescription}</div>;
      },
    },
    {
      id: "actions",
      header: "פעולות",
      cell: ({ row }) => {
        const workoutId = row.original._id;
        return (
          <div className="flex space-x-2">
            <WorkoutDetails workoutId={workoutId} />
            <Link to={`/dashboard/edit-workout/${row.original._id}`}>
              <Button className="bg-black" size="sm">
                <Edit />
              </Button>
            </Link>
            <Button
              className="bg-[#7994CB]"
              size="sm"
              onClick={() => handleOpenDeleteModal(workoutId)}
            >
              <Trash />
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const handleOpenDeleteModal = (exercise) => {
    setselectedWorkout(exercise);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    console.log(selectedWorkout);
    if (!selectedWorkout) return;
    try {
      await deleteWorkout(selectedWorkout);
      setWorkout((prevWorkout) =>
        prevWorkout.filter((e) => e._id !== selectedWorkout)
      );
      setDeleteModalOpen(false);
      setselectedWorkout(null);
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/workout?page=${page}&&limit=10`
        );
        console.log("response:", response);
        if (response.status === 200) {
          setTotalPages(response.data.pagination.totalPages);
          setPage(response.data.pagination.currentPage);
          setWorkout(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching workout:", error);
      }
    };
    fetchData();
  }, [page, totalPages]);

  const table = useReactTable({
    data: workout,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <div className="w-full" dir="ltr">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-3">
            <div
              className="flex justify-between items-center relative max-w-sm h-12"
              dir="rtl"
            >
              <input
                type="search"
                name=""
                id=""
                placeholder="שם מסנן...."
                value={table.getColumn("name")?.getFilterValue() || ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="border border-gray-200 bg-white py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
              />
              <div className="absolute bg-red-700 w-8 h-8 rounded-full flex justify-center items-center left-2">
                <GoSearch className="text-white" />
              </div>
            </div>
            <Link to="/dashboard/workout-programme">
              <Button className="bg-[#7994CB] uppercase font-medium" size="sm">
                הוסף אימון חדש
              </Button>
            </Link>
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
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
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
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>אשר מחיקה</DialogTitle>
          </DialogHeader>
          <p>האם אתה בטוח שברצונך למחוק אימון זה</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              בטל
            </Button>
            <Button className="bg-red-600 text-white" onClick={handleDelete}>
              מחק
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComp
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
