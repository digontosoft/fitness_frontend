import { base_url } from "@/api/baseUrl";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewAdmin = ({ admin, onClose }) => {
  const [adminDetails, setAdminDetails] = useState([]);
  useEffect(() => {
      const fetchAdminTraineeLists = async () => {
    try {
      const response = await axios.get(`${base_url}/traineelistforadmin?adminId=${admin?._id}`);
      setAdminDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching email:", error);
      throw error;
    }
  };
  fetchAdminTraineeLists();
  }, [admin?._id]);
  return (


    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 relative animate-fadeIn">
    {/* Close Button */}
    <button
      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
      onClick={onClose}
    >
      ✖
    </button>

    {/* Trainee Table */}
    <h3 className="text-lg font-semibold mb-3 text-gray-700">👥 מתאמנים משוייכים</h3>
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">שם המתאמן</TableHead>
            <TableHead className="min-w-[200px]">אימייל</TableHead>
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
