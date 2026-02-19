import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Trash } from "lucide-react";
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
import { Link, useParams } from "react-router-dom";
import { deleteExercise, deleteNutritionGuide } from "@/api/deleteData";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoSearch } from "react-icons/go";
import Loading from "@/components/common/Loading";

export function NutritionList() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [nutritionGuide, setNutritionGuide] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNutrition, setSelectedNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  if (!id) {
    localStorage.removeItem("selectedUserId");
  }

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם תפריט תזונה
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          תיאור תפריט תזונה
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
        const nutritionId = row.original._id;
        return (
          <div className="flex space-x-2">
            <Link to={`/dashboard/nutrition-details/${nutritionId}`}>
              {" "}
              <Button className="bg-[#7994CB]" size="sm">
                <Eye />
              </Button>
            </Link>
            <Link to={`/dashboard/edit-nutrition/${nutritionId}`}>
              <Button className="bg-black" size="sm">
                <Edit />
              </Button>
            </Link>
            <Button
              className="bg-[#7994CB]"
              size="sm"
              onClick={() => handleOpenDeleteModal(nutritionId)}
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
    setSelectedNutrition(exercise);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedNutrition) return;
    try {
      await deleteNutritionGuide(selectedNutrition);
      setNutritionGuide((prevNutrition) =>
        prevNutrition.filter((e) => e._id !== selectedNutrition)
      );
      setDeleteModalOpen(false);
      setSelectedNutrition(null);
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };
  const userId = localStorage.getItem("selectedUserId");
  const user_id = JSON.parse(userId);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = userId
        ? `${base_url}/nutritionGuide/user/${user_id}`
        : `${base_url}/nutritionGuide`;

      const response = await axios.get(url);
      setNutritionGuide(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const table = useReactTable({
    data: nutritionGuide,
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
                value={table.getColumn("title")?.getFilterValue() || ""}
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="border border-gray-200 bg-white py-3 px-2 rounded-xl text-sm min-w-[310px] h-12"
              />
              <div className="absolute bg-[#7994CB] w-8 h-8 rounded-full flex justify-center items-center left-2">
                <GoSearch className="text-white" />
              </div>
            </div>
            {user.userType === "supperadmin" && (
              <Link
                to={
                  user_id
                    ? `/dashboard/add-nutrition-menu/${user_id}`
                    : `/dashboard/add-nutrition-guide`
                }
              >
                <Button className="bg-[#7994CB] uppercase font-medium" size="sm">
                  {user_id ? "הוסף תפריט תזונה" : " הוסף מדריך תזונה"}
                </Button>
              </Link>
            )}
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
                      לא הוקצה תפריט תזונה
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
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this nutrition guide?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#7994CB] text-white" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          הקודם
        </Button>
        <div className="flex items-center space-x-2">
          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <Button
              key={index}
              className={`${
                table.getState().pagination.pageIndex === index
                  ? "bg-[#7994CB]"
                  : "bg-white text-black border hover:text-white"
              }`}
              size="sm"
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          הבא
        </Button>
      </div>
    </div>
  );
}
