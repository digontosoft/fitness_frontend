// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// export function AssignTraineeToAdmin({ adminId }) {
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${base_url}/getUsers`);
//       const trainees = response.data.data.filter(
//       (user) => user?.userType === "trainee"
//     );
//     setUsers(trainees);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Toggle checkbox
//   const handleSelect = (userId) => {
//     setSelectedUsers((prev) =>
//       prev.includes(userId)
//         ? prev.filter((id) => id !== userId)
//         : [...prev, userId]
//     );
//   };

//   // Handle Select All
//   const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     if (checked) {
//       setSelectedUsers(users.map((user) => user._id));
//     } else {
//       setSelectedUsers([]);
//     }
//   };

//   const handleAssign = () => {
//     setIsLoading(true);
//     const payload ={
//   user_ids: selectedUsers,
//   adminId 
// }
//    try {
//       axios.post(`${base_url}/updateAdminId`, payload).then((res) => {
//         if (res.status === 200) {
//           toast.success("Trainees assigned to admin successfully");
//           setIsLoading(false);
//         }
//       });
//     } catch (error) {
//       console.error("Error assigning trainees:", error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           className="bg-customBg text-white hover:text-white"
//         >
//           Assign Trainee
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Assign Trainees to Admin</DialogTitle>
//           <DialogDescription>
//             Select one or more trainees from the list below and assign them to
//             an admin.
//           </DialogDescription>
//         </DialogHeader>

//         {/* Responsive & Scrollable Table */}
//         <div className="border rounded-md overflow-x-auto max-h-[300px] overflow-y-auto">
//           <Table className="min-w-[400px]">
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[50px]">
//                   <Checkbox
//                     checked={selectAll}
//                     onCheckedChange={(checked) =>
//                       handleSelectAll(checked)
//                     }
//                   />
//                 </TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Admin</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user._id}>
//                   <TableCell>
//                     <Checkbox
//                       checked={selectedUsers.includes(user._id)}
//                       onCheckedChange={() => handleSelect(user._id)}
//                     />
//                   </TableCell>
//                   <TableCell className="truncate max-w-[250px]">
//                     {user.email}
//                   </TableCell>
//                 </TableRow>
//               ))}

//             </TableBody>
//           </Table>
//         </div>

//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogClose>
//           <Button type="button" onClick={handleAssign} disabled={selectedUsers.length === 0 || isLoading}>
//             Assign Selected
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }



import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AssignTraineeToAdmin = ({ adminId })=> {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
 
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${base_url}/getUsers`);
      const trainees = response.data.data.filter(
        (user) => user?.userType === "trainee"
      );
      setUsers(trainees);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    
    fetchUsers();
  }, []);



  // Toggle checkbox
  const handleSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle Select All
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedUsers(users.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleAssign = () => {
    setIsLoading(true);
    const payload = {
      user_ids: selectedUsers,
      adminId,
    };

    try {
      axios.post(`${base_url}/updateAdminId`, payload).then((res) => {
        if (res.status === 200) {
          toast.success("Trainees assigned to admin successfully");
          setIsLoading(false);
          setIsOpen(false);
          setSelectedUsers([]);
          setSelectAll(false);
          fetchUsers();
        }
      });
    } catch (error) {
      console.error("Error assigning trainees:", error);
      setIsLoading(false);
    }
  };

  // Filter trainees by email
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user?.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-customBg text-white hover:text-white"
        >
          Assign Trainee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>שייך מתאמנים למאמן</DialogTitle>
          <DialogDescription>
בחר מתאמנים מהרשימה מטה ושייך למאמן המתאים 
          </DialogDescription>
        </DialogHeader>

        {/* Search Field */}
        <div className="mb-3">
          <Input
            placeholder="
...חפש לפי מייל או שם מלא"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Responsive & Scrollable Table */}
        <div className="border rounded-md overflow-x-auto max-h-[300px] overflow-y-auto">
          <Table className="min-w-[400px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  />
                </TableHead>
                <TableHead>אימייל</TableHead>
                <TableHead>שם המאמן</TableHead>
                <TableHead>מאמן משוייך</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user?._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user?._id)}
                        onCheckedChange={() => handleSelect(user?._id)}
                      />
                    </TableCell>
                    <TableCell className="truncate max-w-[250px]">
                      {user?.email}
                    </TableCell>
                    <TableCell className="truncate max-w-[250px]">
                      {user?.firstName} {user?.lastName}
                    </TableCell>
                    <TableCell className="truncate max-w-[250px]">
                      {user?.admin_id?.email}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-gray-500">
                    No trainees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">בטל</Button>
          </DialogClose>
          <Button
          className="mb-2 sm:mt-0 bg-customBg text-white hover:text-white"
            type="button"
            onClick={handleAssign}
            disabled={selectedUsers.length === 0 || isLoading}
          >
            {isLoading ? "שייך למאמן.." : "שייך למאמן"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AssignTraineeToAdmin
