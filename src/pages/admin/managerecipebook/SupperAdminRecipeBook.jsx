// import { base_url } from "@/api/baseUrl";
// import axios from "axios";
// import { useEffect, useState } from "react";
// const SupperAdminRecipeBook = () => {
//   const [recipeBook, setRecipeBook] = useState([]);
//   const user = JSON.parse(localStorage.getItem("userInfo"));
//   useEffect(() => {
//     const fetchRecipeBook = async () => {
//       try {
//         await axios.get(`${base_url}/recipeBook`).then((response) => {
//           if (response.status === 200) {
//             setRecipeBook(response.data.data);
//             console.log("pdf:", response?.data?.data);
//           }
//         });
//       } catch (error) {
//         console.error("Error fetching recipe book:", error);
//       }
//     };
//     fetchRecipeBook();
//   }, []);

//   return (
//     <div>
     
//     </div>
//   );
// };

// export default SupperAdminRecipeBook;



import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Edit, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SupperAdminRecipeBook = () => {
  const [recipeBook, setRecipeBook] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchRecipeBook = async () => {
      try {
        const response = await axios.get(`${base_url}/recipeBook`);
        if (response.status === 200) {
          setRecipeBook(response.data.data);
          console.log("pdf:", response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching recipe book:", error);
      }
    };
    fetchRecipeBook();
  }, []);

  return (
    <div className="max-w-6xl mx-auto min-h-screen py-20">
      <h2 className="text-xl font-semibold mb-4">📚 Recipe Books</h2>
    <div className="rounded-md border">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipeBook?.map((book) => (
            <TableRow key={book._id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell className="max-w-xs truncate">
                {book.description}
              </TableCell>
              <TableCell>{book.type}</TableCell>
              <TableCell className="flex gap-2 items-center">
               <Link to={"/dashboard/view-recipe-book"}>
                <Button
                  variant="outline"
                  size="sm"
                 
                >
                  <Eye />
                </Button>
               </Link>
               <Link to={`/dashboard/edit-recipe-book/${book._id}`}>
                <Button
                  variant="outline"
                  size="sm"
                 
                >
                  <Edit />
                </Button>
               </Link>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  );
};

export default SupperAdminRecipeBook;
