// import { base_url } from "@/api/baseUrl";
// import PaginationComp from "@/components/pagination";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import ScrollTop from "@/shared/ScrollTop";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import axios from "axios";
// import { ArrowUpDown, Eye, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import AssignTraineeToAdmin from "./AssignTraineeToAdmin";
// import DeleteModal from "./DeleteModal";
// import EditAdmin from "./EditAdmin";
// import ViewAdmin from "./ViewAdmin";
// // import DeleteModal from "./DeleteModal";

// export default function AdminTable() {
//   const [admins, setAdmins] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState("");
//   const [isViewAdmin, setViewAdmin] = useState(null);
//   const [openView, setIsOpenView] = useState(false);
//   const [EditModal, setIsEditModal] = useState(null);
//   const [openEdit, setIsEdit] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [deleteAdmin, setDeleteAdmin] = useState(null);

//   ScrollTop();

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(
//         `${base_url}/getAdminUser?limit=1000&page=1&search=${search}`
//       );

//       // শুধু admin ইউজারগুলো নেব
//       const onlyAdmins = res.data.data.filter(
//         (user) => user.userType === "admin"
//       );

//       // যদি email search করতে চাও
//       const filteredAdmins = onlyAdmins.filter((user) =>
//         user.email?.toLowerCase().includes(search.toLowerCase())
//       );

//       // Pagination handle
//       const itemsPerPage = 10;
//       const startIndex = (page - 1) * itemsPerPage;
//       const paginatedAdmins = filteredAdmins.slice(
//         startIndex,
//         startIndex + itemsPerPage
//       );

//       // name format
//       const formattedAdmins = paginatedAdmins.map((user) => ({
//         ...user,
//         name: user.full_name
//           ? user.full_name
//           : `${user.firstName || ""} ${user.lastName || ""}`,
//       }));

//       setAdmins(formattedAdmins);
//       setTotalPages(Math.ceil(filteredAdmins.length / itemsPerPage));
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load users");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, search]);

//   const handleDeleteClick = (admin) => {
//     setDeleteAdmin(admin);
//     setDeleteModalOpen(true);
//   };
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${base_url}/deleteUser/${deleteAdmin._id}`);
//       toast.success("המנהל נמחק בהצלחה");
//       setAdmins((prev) => prev.filter((u) => u._id !== deleteAdmin._id));
//     } catch (err) {
//       toast.error(UI_TEXT.deleteFailed);
//     } finally {
//       setDeleteModalOpen(false);
//       setDeleteAdmin(null);
//     }
//   };

//   const handleUpdate = (admin) => {
//     setIsEditModal(admin), setIsEdit(true);
//   };

//   const handleSave = async (formData) => {
//     try {
//       const res = await axios.post(`${base_url}/updateUserInfo`, {
//         user_id: EditModal._id,
//         gender: formData.gender,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         full_name: formData.full_name,
//         userType: formData.userType,
//       });
//       if (res.status === 200) {
//         toast.success("המנהל עודכן בהצלחה!");
//         setIsEdit(false);
//         setIsEditModal(null);
//         fetchUsers(page);
//       }
//     } catch (err) {
//       toast.error(UI_TEXT.updateFailed);
//     }
//     // console.log("payload", formData);
//   };

//   const handleView = (admins) => {
//     setViewAdmin(admins);
//     setIsOpenView(true);
//   };

//   const columns = [
//     {
//       accessorKey: "name",
//       header: ({ column }) => (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           שם
//           <ArrowUpDown />
//         </Button>
//       ),
//       cell: ({ row }) => row.getValue("name"),
//     },
//     {
//       accessorKey: "email",
//       header: ({ column }) => (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           דואר אלקטרוני
//           <ArrowUpDown />
//         </Button>
//       ),
//       cell: ({ row }) => row.getValue("email"),
//     },
//     {
//       id: "actions",
//       header: "פעולות",
//       cell: ({ row }) => {
//         const id = row.original._id;
//         return (
//           <div className="flex gap-2">
//             <Button
//               className="bg-[#7994CB] text-white"
//               size="sm"
//               onClick={() => handleView(row.original)}
//             >
//               <Eye />
//             </Button>
//             <Button
//               variant="destructive"
//               size="sm"
//               onClick={() => handleDeleteClick(row.original)}
//             >
//               <Trash />
//             </Button>
//              <Button
//               className="bg-green-100 hover:bg-green-200 text-green-500 font-bold uppercase"
//               size="sm"             
//             >
//             Admin
//             </Button>

//             <Button
//               className="bg-[#7994CB] font-bold"
//               size="sm"
//               onClick={() =>
//                 updateStatus(
                
//                   id
//                 )
//               }
             
//             >
            
//               הפוך למתאמן
            
//             </Button>
//             <AssignTraineeToAdmin adminId={id} />
//           </div>
//         );
//       },
//     },
//   ];

//   const updateStatus = async ( userId) => {
//     try {
//       const response = await axios.post(`${base_url}/updateUserInfo`, {
//         user_id: userId,
//         userType:"trainee",
//       });

//       if (response.status === 200) {
//         toast.success("סוג המשתמש עודכן בהצלחה");
//         fetchUsers(page);
//       }
//     } catch (error) {
//       toast.error("עדכון סוג המשתמש נכשל");
//       console.log("error:", error);
//     }
//   };

//   const table = useReactTable({
//     data: admins,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   return (
//     <div className="max-w-6xl mx-auto min-h-screen px-4 sm:px-0" dir="ltr">
//       <div className="flex justify-between py-4">
//         <input
//           type="search"
//           placeholder="חפש מנהל..."
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-3 py-2 rounded-md"
//         />
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="text-center">
//                   לא נמצאו מנהלים
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex justify-end py-4">
//         <PaginationComp
//           currentPage={page}
//           totalPages={totalPages}
//           onPageChange={setPage}
//         />
//       </div>
//       {openView && isViewAdmin && (
//         <ViewAdmin admin={isViewAdmin} onClose={() => setIsOpenView(false)} />
//       )}
//       ;
//       {openEdit && EditModal && (
//         <EditAdmin
//           onClose={() => setIsEdit(false)}
//           onSave={handleSave}
//           admin={EditModal}
//         />
//       )}
//       {deleteModalOpen && deleteAdmin && (
//         <DeleteModal
//           isOpen={deleteModalOpen}
//           onClose={() => setDeleteModalOpen(false)}
//           onConfirm={handleDelete}
//           adminName={deleteAdmin?.name}
//         />
//       )}
//     </div>
//   );
// }



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
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AssignTraineeToAdmin from "./AssignTraineeToAdmin"; // Make sure to use the new component
import DeleteModal from "./DeleteModal";
import EditAdmin from "./EditAdmin";
import ViewAdmin from "./ViewAdmin";
import Loading from "@/components/common/Loading";
import { UI_TEXT } from "@/constants/hebrewText";
import { useDebounce } from "@/hooks/useDebounce";

export default function AdminTable() {
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const prevDebouncedSearch = useRef(debouncedSearch);
  const [isViewAdmin, setViewAdmin] = useState(null);
  const [openView, setIsOpenView] = useState(false);
  const [EditModal, setIsEditModal] = useState(null);
  const [openEdit, setIsEdit] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAdmin, setDeleteAdmin] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  
  // New state for the Assign Trainee modal
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);

  ScrollTop();

  const fetchUsers = async (requestPage) => {
    setFetchError("");
    setIsFetching(true);
    try {
      const params = new URLSearchParams({
        page: String(requestPage),
        limit: "10",
      });
      const trimmedSearch = debouncedSearch.trim();
      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      }

      const res = await axios.get(
        `${base_url}/getAdminUser?${params.toString()}`
      );
      const formattedAdmins = (res.data.data || []).map((user) => ({
        ...user,
        name: user.full_name
          ? user.full_name
          : `${user.firstName || ""} ${user.lastName || ""}`,
      }));
      setAdmins(formattedAdmins);
      setTotalPages(res.data.pagination?.pages ?? 1);
    } catch (err) {
      console.error(err);
      setFetchError(UI_TEXT.loadUsersFailed);
      toast.error(UI_TEXT.loadUsersFailed);
    } finally {
      setIsFetching(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    const searchChanged = prevDebouncedSearch.current !== debouncedSearch;
    prevDebouncedSearch.current = debouncedSearch;

    const requestPage = searchChanged ? 1 : page;
    if (searchChanged && page !== 1) {
      setPage(1);
    }

    fetchUsers(requestPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch]);

  const handleDeleteClick = (admin) => {
    setDeleteAdmin(admin);
    setDeleteModalOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/deleteUser/${deleteAdmin._id}`);
      toast.success("המנהל נמחק בהצלחה");
      setAdmins((prev) => prev.filter((u) => u._id !== deleteAdmin._id));
    } catch (err) {
      toast.error(UI_TEXT.deleteFailed);
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
        toast.success("המנהל עודכן בהצלחה!");
        setIsEdit(false);
        setIsEditModal(null);
        fetchUsers(page);
      }
    } catch (err) {
      toast.error(UI_TEXT.updateFailed);
    }
  };

  const handleView = (admins) => {
    setViewAdmin(admins);
    setIsOpenView(true);
  };

  const updateStatus = async (userId) => {
    try {
      const response = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: userId,
        userType: "trainee",
      });
      if (response.status === 200) {
        toast.success("סוג המשתמש עודכן בהצלחה");
        fetchUsers(page);
      }
    } catch (error) {
      toast.error("עדכון סוג המשתמש נכשל");
      // console.log("error:", error);
    }
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
            <Button
              className="bg-green-100 hover:bg-green-200 text-green-500 font-bold uppercase"
              size="sm"
            >
              {UI_TEXT.admin}
            </Button>
            <Button
              className="bg-[#7994CB] font-bold"
              size="sm"
              onClick={() => updateStatus(id)}
            >
              הפוך למתאמן
            </Button>
            {/* The new button to open the modal */}
            <Button
                variant="outline"
                className="bg-[#7994CB] text-white hover:text-white hover:bg-black"
                onClick={() => {
                    setSelectedAdminId(id);
                    setIsAssignModalOpen(true);
                }}
            >
                שייך מתאמנים
            </Button>
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

  if (isInitialLoading) {
    return (
      <div className="max-w-6xl mx-auto min-h-screen px-4 sm:px-0" dir="ltr">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4 sm:px-0" dir="ltr">
      <div className="flex justify-between items-center py-4">
        <input
          type="search"
          placeholder="חפש מנהל..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        {isFetching && (
          <span className="text-sm text-gray-500 font-medium">{UI_TEXT.loading}</span>
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
                  לא נמצאו מנהלים
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
      {/* Conditionally render the modal here */}
      {isAssignModalOpen && (
        <AssignTraineeToAdmin 
          adminId={selectedAdminId} 
          isOpen={isAssignModalOpen}
          onClose={() => {
            setIsAssignModalOpen(false);
            setSelectedAdminId(null);
            // Optionally re-fetch the admin list if needed
            // fetchUsers(); 
          }}
        />
      )}
    </div>
  );
}