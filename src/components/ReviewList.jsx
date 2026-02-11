import { Star, Edit, Trash2 } from 'lucide-react';

const ReviewList = ({ reviews, onEdit, onDelete, showActions = true }) => {
    return (
        <div className="grid gap-4">
            {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No reviews found
                </div>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="card hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                                <p className="text-sm text-gray-600 mt-2">{review.description}</p>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">{review.createdAt}</span>
                                </div>
                            </div>
                            {showActions && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(review)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(review.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewList;
