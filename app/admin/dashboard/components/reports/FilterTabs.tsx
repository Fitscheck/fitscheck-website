import React from 'react';
import { ReportStatus } from './types';

interface FilterTabsProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    counts?: {
        all?: number;
        pending?: number;
        reviewed?: number;
        resolved?: number;
        active?: number;
        inactive?: number;
    };
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange, counts = {} }) => {
    const filters = [
        { id: 'all', label: 'All', count: counts.all },
        { id: 'pending', label: 'Pending', count: counts.pending },
        { id: 'reviewed', label: 'Reviewed', count: counts.reviewed },
        { id: 'resolved', label: 'Resolved', count: counts.resolved },
        { id: 'active', label: 'Active', count: counts.active },
        { id: 'inactive', label: 'Inactive', count: counts.inactive },
    ].filter(f => f.count !== undefined);

    return (
        <div className="flex gap-3 flex-wrap">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === filter.id
                            ? 'bg-[#003366] text-white'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#003366] hover:text-[#003366]'
                        }`}
                >
                    {filter.label}
                    {filter.count !== undefined && ` (${filter.count})`}
                </button>
            ))}
        </div>
    );
};

export default FilterTabs;
