// const ViewAdmin = ({ admin, onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//           onClick={onClose}
//         >
//           ✖
//         </button>
//         <h2 className="text-xl font-bold mb-4">Admin Details</h2>
//         <p>
//           <strong>Name:</strong> {admin.name}
//         </p>
//         <p>
//           <strong>Email:</strong> {admin.email}
//         </p>
//         <p>
//           <strong>Role:</strong> {admin.userType}
//         </p>
//         <p>
//           <strong>Gender:</strong> {admin.gender}
//         </p>
//         <p>
//           <strong>Status:</strong> {admin.userStatus}
//         </p>
//       </div>
//     </div>
//   );
// };

import { base_url } from "@/api/baseUrl";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

// export default ViewAdmin;



const ViewAdmin = ({ admin, onClose }) => {
  const [adminDetails, setAdminDetails] = useState([]);
  useEffect(() => {
      const fetchAdminTraineeLists = async () => {
    try {
      const response = await axios.get(`${base_url}/traineelistforadmin?adminId=${admin?._id}`);
      console.log("adminTraineeLists:", response.data.data);
      setAdminDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching email:", error);
      throw error;
    }
  };
  fetchAdminTraineeLists();
  }, [admin?._id]);
  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    //   <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fadeIn">
    //     {/* Close Button */}
    //     <button
    //       className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
    //       onClick={onClose}
    //     >
    //       ✖
    //     </button>

    //     {/* Header */}
    //     <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
    //       👤 Admin Details
    //     </h2>

    //     {/* Info Section */}
    //     <div className="space-y-4">
    //       <div className="flex justify-between border-b pb-2">
    //         <span className="font-medium text-gray-600">Name:</span>
    //         <span className="text-gray-800">{admin.name}</span>
    //       </div>
    //       <div className="flex justify-between border-b pb-2">
    //         <span className="font-medium text-gray-600">Email:</span>
    //         <span className="text-gray-800">{admin.email}</span>
    //       </div>
    //       <div className="flex justify-between border-b pb-2">
    //         <span className="font-medium text-gray-600">Role:</span>
    //         <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-sm">
    //           {admin.userType}
    //         </span>
    //       </div>
    //       <div className="flex justify-between border-b pb-2">
    //         <span className="font-medium text-gray-600">Gender:</span>
    //         <span className="text-gray-800">{admin.gender}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <span className="font-medium text-gray-600">Status:</span>
    //         <span
    //           className={`px-2 py-0.5 rounded-full text-sm ${
    //             admin.userStatus === "Active"
    //               ? "bg-green-100 text-green-700"
    //               : "bg-red-100 text-red-700"
    //           }`}
    //         >
    //           {admin.userStatus}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 relative animate-fadeIn">
    {/* Close Button */}
    <button
      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
      onClick={onClose}
    >
      ✖
    </button>

    {/* Header */}
    {/* <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
      👤 Admin Details
    </h2> */}

    {/* Admin Info */}
    {/* <div className="space-y-4 mb-6">
      <div className="flex justify-between border-b pb-2 text-sm sm:text-base">
        <span className="font-medium text-gray-600">Name:</span>
        <span className="text-gray-800">
          {admin.firstName} {admin.lastName}
        </span>
      </div>
      <div className="flex justify-between border-b pb-2 text-sm sm:text-base">
        <span className="font-medium text-gray-600">Email:</span>
        <span className="text-gray-800 break-all">{admin.email}</span>
      </div>
      <div className="flex justify-between border-b pb-2 text-sm sm:text-base">
        <span className="font-medium text-gray-600">Role:</span>
        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm">
          {admin.userType}
        </span>
      </div>
    </div> */}

    {/* Trainee Table */}
    <h3 className="text-lg font-semibold mb-3 text-gray-700">👥 מתאמנים משוייכים</h3>
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">שם המתאמן</TableHead>
            <TableHead className="min-w-[200px]">אימייל</TableHead>
            {/* <TableHead className="min-w-[100px]">Gender</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminDetails.length > 0 ? (
            adminDetails.map((trainee) => (
              <TableRow key={trainee._id}>
                <TableCell>
                  {trainee.firstName} {trainee.lastName}
                </TableCell>
                <TableCell className="break-all">{trainee.email}</TableCell>
                {/* <TableCell className="capitalize">{trainee.gender}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      trainee.userStatus === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trainee.userStatus}
                  </span>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No trainees assigned
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
</div>

  );
};

export default ViewAdmin;
