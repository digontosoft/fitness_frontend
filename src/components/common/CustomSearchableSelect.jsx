import { ChevronDown, Loader2, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Reusable searchable dropdown.
 * - Fully controlled by React state (no internal library caching issues
 *   like react-dropdown-select has with stale `options` while open).
 * - Debounces the search input internally and reports the debounced
 *   value to the parent via onSearchChange, so the parent can trigger a
 *   server-side fetch and simply pass the fresh `options` back in.
 */
const CustomSearchableSelect = ({
  options = [],
  valueField = "_id",
  labelField = "name",
  value = null,
  onChange,
  onSearchChange,
  placeholder = "בחר",
  loading = false,
  disabled = false,
  direction = "rtl",
  debounceMs = 500,
  emptyText = "אין תוצאות",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const containerRef = useRef(null);
  const debounceTimer = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Internal debounce -> report to parent
  useEffect(() => {
    if (!onSearchChange) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onSearchChange(searchText);
    }, debounceMs);
    return () => clearTimeout(debounceTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleSelect = (option) => {
    onChange?.(option);
    setIsOpen(false);
    setSearchText("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(null);
    setSearchText("");
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} dir={direction}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-12 flex items-center justify-between border border-gray-200 bg-white rounded-xl px-3 text-sm ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {value ? value[labelField] : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {value && !disabled && (
            <X
              className="size-4 text-gray-400 hover:text-gray-600"
              onClick={handleClear}
            />
          )}
          <ChevronDown
            className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
            <Search className="size-4 text-gray-400 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="חפש..."
              className="w-full text-sm outline-none"
            />
            {loading && (
              <Loader2 className="size-4 animate-spin text-gray-400 flex-shrink-0" />
            )}
          </div>

          <ul className="max-h-60 overflow-y-auto">
            {loading ? (
              // Never show the previous (stale) list while a new fetch is
              // in flight — this is what was causing "wrong data" to
              // appear until the dropdown was closed and reopened.
              <li className="px-3 py-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                <Loader2 className="size-4 animate-spin" />
                טוען תוצאות...
              </li>
            ) : options.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400 text-center">
                {emptyText}
              </li>
            ) : (
              options.map((option) => (
                <li
                  key={option[valueField]}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    value?.[valueField] === option[valueField]
                      ? "bg-[#7994CB]/10 text-[#7994CB]"
                      : ""
                  }`}
                >
                  {option[labelField]}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSearchableSelect;