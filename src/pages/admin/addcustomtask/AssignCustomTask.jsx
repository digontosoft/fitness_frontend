import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import PaginationComp from "@/components/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { Edit, Loader, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EditCustomTask from "./EditCustomTask";
import TaskModal from "./TaskModal";

export default function AssignCustomTask({userId}) {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
   const [open, setOpen] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
 const [taskToDeleteId, setTaskToDeleteId] = useState(null);
 const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${base_url}/get-user-task-templates/${userId}?page=${page}&&limit=10&&search=${search}`
      );
      setTasks(res?.data?.data);
      setTotalPages(res?.data?.pagination?.pages);
      setPage(res?.data?.pagination?.page);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, search, userId]);


  // ✅ Column order: Title (first), Description (middle), Actions (last)
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          שם המשימה 
        </Button>
      ),
      // Text stays RTL, but column order stays LTR
      cell: ({ row }) => (
        <div>
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          כותרת המשימה
        </Button>
      ),
      // Text stays RTL, but column order stays LTR
      cell: ({ row }) => (
        <div>
          {row.getValue("title")}
        </div>
      ),
    },
    {
    header: "תוכן המשימה",
    accessorFn: (row) => row.description,
    cell: ({ row }) => {
      const desc = row.original.description || "";
      const shown = desc.length > 50 ? desc.slice(0, 50) + "..." : desc;
      return (
        <div>
          {shown}
        </div>
      );
    },
  },
    {
      id: "actions",
      header: "פעולות ",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => {setSelectedTask(row.original); setEditTaskModal(true);}}>
            <Edit className="h-4 w-4" />
          </Button>
        <Button size="sm" variant="destructive" onClick={() => { setTaskToDeleteId(row.original._id); setShowDeleteAlert(true); }}>
 <Trash className="h-4 w-4" />
 </Button>
        </div>
      ),
    },
  ];

 const handleDeleteTask = async () => {
try {
 setDeleteLoading(true);
const response = await axios.delete(`${base_url}/delete-task-template/${taskToDeleteId}`);
 if (response.status === 200) {
  toast.success("Task deleted successfully!");
  setDeleteLoading(false);
 fetchData();
 }
} catch (err) {
 console.error("Error deleting task", err);
 } finally {
 setShowDeleteAlert(false);
 }
 };

  const table = useReactTable({
    data: tasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });


  if(loading){
    return <Loading />
  }

  return (
    // Page/UI RTL
    <div className="w-full p-6 space-y-4" dir="ltr">
      <div dir="rtl">
         <Button onClick={() => setOpen(true)} className="bg-customBg hover:bg-customBg-dark">שייך משימה מותאמת אישית</Button>
      </div>
      {/* 🔧 Table itself LTR so columns render in the array order */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
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

          <TableBody >
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
                <TableRow key={row.id} >
                  {row?.getVisibleCells()?.map((cell) => (
                    <TableCell key={cell.id} >
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center pt-4 justify-end" dir="ltr">
        <PaginationComp
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
     <TaskModal open={open} setOpen={setOpen} userId={userId} fetchData={fetchData}/>
     <EditCustomTask open={editTaskModal} setOpen={setEditTaskModal} userId={userId} task={selectedTask} fetchData={fetchData} />
     <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
 <AlertDialogContent>
 <AlertDialogHeader>
  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
  <AlertDialogDescription>
  This action cannot be undone. This will permanently delete the task.
  </AlertDialogDescription>
 </AlertDialogHeader>
 <AlertDialogFooter>
  <AlertDialogCancel>Cancel</AlertDialogCancel>
  <AlertDialogAction onClick={handleDeleteTask} className="bg-customBg hover:bg-customBg-dark">{deleteLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin" />Deleting</> : "Continue"}</AlertDialogAction>
 </AlertDialogFooter>
 </AlertDialogContent>
 </AlertDialog>
    </div>
  );
}
