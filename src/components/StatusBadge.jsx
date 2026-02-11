const StatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status.toLowerCase()) {
            case 'security':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'active':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'directors':
                return 'bg-red-100 text-red-700 border-red-300';
            case 'terminated':
                return 'bg-red-100 text-red-700 border-red-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase border ${getStatusStyles()}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
