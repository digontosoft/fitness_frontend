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

export function NutritionList() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [nutritionGuide, setNutritionGuide] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNutrition, setSelectedNutrition] = useState(null);
  const { id } = useParams();
  if (!id) {
    localStorage.removeItem("selectedUserId");
  }

  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם התרגיל
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
          הוראות לתרגיל
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
              <Button className="bg-customBg" size="sm">
                <Eye />
              </Button>
            </Link>
            <Link to={`/dashboard/edit-nutrition/${nutritionId}`}>
              <Button className="bg-black" size="sm">
                <Edit />
              </Button>
            </Link>
            <Button
              className="bg-customBg"
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
    try {
      const url = userId
        ? `${base_url}/nutritionGuide/user/${user_id}`
        : `${base_url}/nutritionGuide`;

      const response = await axios.get(url);

      setNutritionGuide(response.data.data);
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
      <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-3">
        <Input
          placeholder="שם מסנן...."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link
          to={
            user_id
              ? `/dashboard/add-nutrition-menu/${user_id}`
              : `/dashboard/add-nutrition-guide`
          }
        >
          <Button className="bg-customBg uppercase font-medium" size="sm">
            {user_id ? "Add Nutrition Menu" : "Add Nutrition Guide"}
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
            <Button className="bg-red-600 text-white" onClick={handleDelete}>
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
          Previous
        </Button>
        <div className="flex items-center space-x-2">
          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <Button
              key={index}
              className={`${
                table.getState().pagination.pageIndex === index
                  ? "bg-customBg"
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
          Next
        </Button>
      </div>
    </div>
  );
}
