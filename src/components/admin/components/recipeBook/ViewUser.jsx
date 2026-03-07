import { useEffect } from "react";
import { createPortal } from "react-dom";

const ViewUser = ({ user, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!user) return null;

  const displayName = user.full_name
    ? user.full_name
    : `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-[#7994CB] transition-colors text-2xl"
          onClick={onClose}
          type="button"
        >
          ✖
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">פרטי משתמש</h2>

        {/* User Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                שם מלא
              </label>
              <p className="text-gray-800">{displayName || "N/A"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                אימייל
              </label>
              <p className="text-gray-800 break-all">{user.email || "N/A"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                שם פרטי
              </label>
              <p className="text-gray-800">{user.firstName || "N/A"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                שם משפחה
              </label>
              <p className="text-gray-800">{user.lastName || "N/A"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                סוג משתמש
              </label>
              <span className="inline-block px-3 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-700">
                {user.userType === "recipe" ? "חבר קהילה" : user.userType || "N/A"}
              </span>
            </div>

            {user.gender && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-semibold text-gray-600 block mb-1">
                  מגדר
                </label>
                <p className="text-gray-800">{user.gender}</p>
              </div>
            )}

            {user.phone && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-semibold text-gray-600 block mb-1">
                  טלפון
                </label>
                <p className="text-gray-800">{user.phone}</p>
              </div>
            )}

            {user.userStatus && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-semibold text-gray-600 block mb-1">
                  סטטוס
                </label>
                <span
                  className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    user.userStatus === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.userStatus}
                </span>
              </div>
            )}
          </div>

          {user.createdAt && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                תאריך יצירה
              </label>
              <p className="text-gray-800">
                {new Date(user.createdAt).toLocaleDateString("he-IL")}
              </p>
            </div>
          )}
        </div>

        {/* Close Button at Bottom */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#7994CB] text-white rounded-lg hover:bg-[#6a84b8] transition-colors"
            type="button"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ViewUser;

