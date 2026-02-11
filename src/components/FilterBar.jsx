import { Search, Filter, FileText } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange, onFilter, onExport }) => {
    return (
        <div className="bg-primary-500 p-4 rounded-t-lg">
            <div className="flex items-center gap-3 flex-wrap">
                <input
                    type="text"
                    placeholder="Project ID"
                    value={filters.projectId}
                    onChange={(e) => onFilterChange('projectId', e.target.value)}
                    className="px-4 py-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-white w-40"
                />

                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                    className="px-4 py-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-white w-40"
                >
                    <option value="">Completed</option>
                    <option value="all">All Status</option>
                    <option value="security">Security</option>
                    <option value="directors">Directors</option>
                    <option value="active">Active</option>
                    <option value="terminated">Terminated</option>
                </select>

                <input
                    type="date"
                    placeholder="Start Date"
                    value={filters.startDate}
                    onChange={(e) => onFilterChange('startDate', e.target.value)}
                    className="px-4 py-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
                />

                <input
                    type="date"
                    placeholder="End Date"
                    value={filters.endDate}
                    onChange={(e) => onFilterChange('endDate', e.target.value)}
                    className="px-4 py-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-white"
                />

                <input
                    type="text"
                    placeholder="UID"
                    value={filters.uid}
                    onChange={(e) => onFilterChange('uid', e.target.value)}
                    className="px-4 py-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-white w-40"
                />

                <button
                    onClick={onFilter}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-2 font-medium"
                >
                    <Search size={18} />
                    Filter
                </button>

                <button
                    onClick={onExport}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors flex items-center gap-2 font-medium"
                >
                    <FileText size={18} />
                    REPORT
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
