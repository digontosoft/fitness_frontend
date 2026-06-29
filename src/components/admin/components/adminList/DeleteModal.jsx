import { UI_TEXT } from "@/constants/hebrewText";

const DeleteModal = ({ isOpen, onClose, onConfirm, adminName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-lg font-bold mb-4">{UI_TEXT.confirmDeletion}</h2>
        <p className="mb-4">
          {UI_TEXT.confirmDeletionAdmin(adminName)}
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            {UI_TEXT.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#7994CB] text-white rounded"
          >
            {UI_TEXT.delete}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
