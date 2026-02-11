const ReviewList = ({ reviews, onEdit, onDelete, showActions = true }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(reviews.length / itemsPerPage);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-4">
            {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                    No reviews found
                </div>
            ) : (
                <>
                    <div className="grid gap-4">
                        {currentReviews.map((review, index) => (
                            <div key={review.id} className="card hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-xs font-bold text-gray-400">#{indexOfFirstItem + index + 1}</span>
                                            <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">{review.description}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <span className="block w-1 h-1 rounded-full bg-gray-300"></span>
                                                {formatDate(review.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    {showActions && (
                                        <div className="flex gap-1">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(review)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Review"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onDelete(review.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Review"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-2 pt-2">
                            <span className="text-sm text-gray-500">
                                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, reviews.length)} of {reviews.length}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <span className="text-sm font-medium text-gray-700">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ReviewList;
