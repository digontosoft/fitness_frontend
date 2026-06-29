import { useEffect, useState } from "react";
import { UI_TEXT } from "@/constants/hebrewText";

const EditAdmin = ({ admin, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    full_name: "",
    email: "",
    userType: "",
    gender: "",
  });
  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        full_name:
          admin.full_name || `${admin.firstName || ""} ${admin.lastName || ""}`,
        email: admin.email || "",
        userType: admin.userType || "",
        gender: admin.gender || "",
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-[#7994CB]"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">{UI_TEXT.editAdmin}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium">{UI_TEXT.firstName}</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium">{UI_TEXT.lastName}</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">{UI_TEXT.fullName}</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">{UI_TEXT.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium">{UI_TEXT.role}</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="admin">{UI_TEXT.admin}</option>
              <option value="supperadmin">{UI_TEXT.superAdmin}</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium">{UI_TEXT.gender}</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">{UI_TEXT.selectGender}</option>
              <option value="male">{UI_TEXT.male}</option>
              <option value="female">{UI_TEXT.female}</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              {UI_TEXT.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7994CB] text-white rounded"
            >
              {UI_TEXT.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdmin;
