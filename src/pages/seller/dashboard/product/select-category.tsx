import React, { useState, useEffect, useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  FormattedCategoryDataRes,
  FormattedCategoryResponse,
} from "../../../../types/seller/create-product";
import { queryGetAllFormattedCategory } from "../../../../services/query/seller/product";

interface CategoryCascaderProps {
  onSelectCategory: (id: string) => void;
}

const SelectCategory: React.FC<CategoryCascaderProps> = ({
  onSelectCategory,
}) => {
  const { isLoading, data } = useQuery(queryGetAllFormattedCategory());

  const [tree, setTree] = useState<FormattedCategoryResponse>(
    {} as FormattedCategoryResponse,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPath, setSelectedPath] = useState<FormattedCategoryDataRes[]>(
    [],
  );
  const [visibleColumns, setVisibleColumns] = useState<
    FormattedCategoryDataRes[][]
  >([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tree?.data && tree?.data?.length > 0) {
      setVisibleColumns([tree.data]);
    }
  }, [tree]);

  useEffect(() => {
    if (data) {
      setTree(data);
    }
  }, [data]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleItemClick = (
    node: FormattedCategoryDataRes,
    colIndex: number,
  ) => {
    // Keep breadcrumb state valid up to current clicked column depth level
    const updatedPath = [...selectedPath.slice(0, colIndex), node];
    setSelectedPath(updatedPath);

    if (node.children && node?.children?.length > 0) {
      // Open its children in the next adjacent column layer
      const updatedColumns = [
        ...visibleColumns.slice(0, colIndex + 1),
        node.children,
      ];
      // setVisibleColumns(updatedColumns);
    } else {
      // Leaf node selected: update parent state, map value ID, close modal panel
      setIsOpen(false);
      onSelectCategory(node.value);
    }
  };

  // Build the "Mobiles & Accessories > Smartphones > iPhone" breadcrumb text
  const breadcrumbDisplay = selectedPath.map((item) => item.label).join(" > ");

  if (isLoading && tree?.data?.length === 0) {
    return (
      <div className="text-sm text-gray-500 animate-pulse">
        Loading Categories...
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
        Category <span className="text-red-500">*</span>
      </label>

      {/* Select input display bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
      >
        <span
          className={`text-sm ${breadcrumbDisplay ? "text-gray-900 font-medium" : "text-gray-400"}`}
        >
          {breadcrumbDisplay || "Select Category"}
        </span>
        <span className="text-xs text-gray-500 transition-transform duration-200">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Multi-column slide-out container */}
      {isOpen && visibleColumns?.length > 0 && (
        <div className="absolute left-0 mt-1.5 flex bg-white border border-gray-200 rounded-md shadow-lg z-[999] h-64 overflow-hidden">
          {visibleColumns.map((columnNodes, colIndex) => (
            <div
              key={colIndex}
              className="w-48 sm:w-56 border-r border-gray-100 last:border-r-0 py-1.5 overflow-y-auto scrollbar-thin bg-white"
            >
              {columnNodes.map((node) => {
                const isSelected = selectedPath[colIndex]?.value === node.value;
                const hasChildren = node.children && node?.children?.length > 0;

                return (
                  <div
                    key={node.value}
                    onClick={() => handleItemClick(node, colIndex)}
                    className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer select-none transition-colors duration-150
                      ${
                        isSelected
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span className="truncate pr-2">{node.label}</span>
                    {hasChildren && (
                      <span
                        className={`text-[10px] ${isSelected ? "text-indigo-500" : "text-gray-400"}`}
                      >
                        &#x276F;
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCategory;
