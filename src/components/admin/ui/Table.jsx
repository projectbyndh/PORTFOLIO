import React, { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { IconButton } from './Button';
import { EmptyState, LoadingSpinner } from './Cards';

/**
 * DataTable - Standardized table component for list pages
 */
export const DataTable = ({
  columns,
  data,
  loading = false,
  emptyState,
  sortable = true,
  selectable = false,
  selectedRows = [],
  onSelectRows,
  onSort,
  currentSort,
  actions,
  rowActions,
  onRowClick,
  getRowId = (row) => row._id || row.id,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectRows?.(data.map(getRowId));
    } else {
      onSelectRows?.([]);
    }
  };

  const handleSelectRow = (rowId, checked) => {
    if (checked) {
      onSelectRows?.([...selectedRows, rowId]);
    } else {
      onSelectRows?.(selectedRows.filter((id) => id !== rowId));
    }
  };

  const handleSort = (columnKey) => {
    if (!sortable || !onSort) return;
    
    const direction =
      currentSort?.key === columnKey && currentSort?.direction === 'asc'
        ? 'desc'
        : 'asc';
    
    onSort({ key: columnKey, direction });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return emptyState || (
      <EmptyState
        title="No data found"
        description="There are no items to display."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  className={`
                    px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider
                    ${column.sortable !== false && sortable ? 'cursor-pointer hover:text-[#0D1641] select-none' : ''}
                    ${column.className || ''}
                  `}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-1.5">
                    {column.header}
                    {column.sortable !== false && sortable && currentSort?.key === column.key && (
                      currentSort.direction === 'asc' 
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
              {rowActions && (
                <th className="w-20 px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => {
              const rowId = getRowId(row);
              const isSelected = selectedRows.includes(rowId);
              const isHovered = hoveredRow === rowId;

              return (
                <tr
                  key={rowId}
                  onMouseEnter={() => setHoveredRow(rowId)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    transition-colors
                    ${isSelected ? 'bg-blue-50' : isHovered ? 'bg-slate-50' : 'bg-white'}
                    ${onRowClick ? 'cursor-pointer' : ''}
                  `}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectRow(rowId, e.target.checked);
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 text-sm text-slate-700 ${column.cellClassName || ''}`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3 text-right">
                      <div 
                        className="flex items-center justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {rowActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * TableFilters - Filter bar for data tables
 */
export const TableFilters = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="
            w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
            border border-slate-200 bg-white
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all
          "
        />
      </div>

      {/* Custom Filters */}
      {filters && <div className="flex items-center gap-2">{filters}</div>}

      {/* Actions */}
      {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
    </div>
  );
};

/**
 * Pagination - Table pagination controls
 */
export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
      {/* Items Info */}
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">{startItem}</span> to{' '}
        <span className="font-medium text-slate-700">{endItem}</span> of{' '}
        <span className="font-medium text-slate-700">{totalItems}</span> results
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            p-2 rounded-lg border border-slate-200 bg-white
            hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          "
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`
                  w-9 h-9 rounded-lg text-sm font-medium transition-colors
                  ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }
                `}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            p-2 rounded-lg border border-slate-200 bg-white
            hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          "
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
};

/**
 * TableRowActions - Common row action buttons
 */
export const TableRowActions = ({ onView, onEdit, onDelete }) => {
  return (
    <>
      {onView && (
        <IconButton
          icon={<Eye className="w-4 h-4" />}
          onClick={onView}
          tooltip="View"
          variant="ghost"
        />
      )}
      {onEdit && (
        <IconButton
          icon={<Edit className="w-4 h-4" />}
          onClick={onEdit}
          tooltip="Edit"
          variant="primary"
        />
      )}
      {onDelete && (
        <IconButton
          icon={<Trash2 className="w-4 h-4" />}
          onClick={onDelete}
          tooltip="Delete"
          variant="danger"
        />
      )}
    </>
  );
};
