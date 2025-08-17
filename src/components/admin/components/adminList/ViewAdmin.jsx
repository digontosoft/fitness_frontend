import React from "react";

const ViewAdmin = ({ admin, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Admin Details</h2>
        <p>
          <strong>Name:</strong> {admin.name}
        </p>
        <p>
          <strong>Email:</strong> {admin.email}
        </p>
        <p>
          <strong>Role:</strong> {admin.userType}
        </p>
        <p>
          <strong>Gender:</strong> {admin.gender}
        </p>
        <p>
          <strong>Status:</strong> {admin.userStatus}
        </p>
      </div>
    </div>
  );
};

export default ViewAdmin;
