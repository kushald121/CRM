import { useState, useEffect } from 'react';
import { Plus, Edit, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProjectTable from '../components/ProjectTable';
import ReviewList from '../components/ReviewList';
import { useAuth } from '../context/AuthContext';
import {
    getProjectsByUserId,
    getReviewsByUserId,
    addProject,
    updateProject,
    deleteProject,
    addReview,
    updateReview,
    deleteReview,
} from '../utils/dataManager';

const UserDashboard = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editingReview, setEditingReview] = useState(null);

    const [projectForm, setProjectForm] = useState({
        projectId: '',
        username: '',
        status: 'active',
        ipAddress: '',
        country: '',
    });

    const [reviewForm, setReviewForm] = useState({
        title: '',
        description: '',
        rating: 5,
    });

    useEffect(() => {
        loadData();
    }, [user]);

    const loadData = async () => {
        if (user) {
            try {
                const userProjects = await getProjectsByUserId(user.id);
                const userReviews = await getReviewsByUserId(user.id);
                setProjects(userProjects);
                setReviews(userReviews);
            } catch (err) {
                toast.error('Failed to load data');
            }
        }
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingProject) {
                await updateProject(editingProject.id, projectForm);
                toast.success('Project updated successfully');
                setEditingProject(null);
            } else {
                await addProject({ ...projectForm, userId: user.id });
                toast.success('Project created successfully');
            }

            setProjectForm({ projectId: '', username: '', status: 'active', ipAddress: '', country: '' });
            setShowProjectForm(false);
            await loadData();
        } catch (err) {
            toast.error('Failed to save project');
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setProjectForm({
            projectId: project.projectId,
            username: project.username,
            status: project.status,
            ipAddress: project.ipAddress,
            country: project.country,
        });
        setShowProjectForm(true);
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
                await loadData();
                toast.success('Project deleted successfully');
            } catch (err) {
                toast.error('Failed to delete project');
            }
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingReview) {
                await updateReview(editingReview.id, reviewForm);
                toast.success('Review updated successfully');
                setEditingReview(null);
            } else {
                await addReview({ ...reviewForm, userId: user.id });
                toast.success('Review added successfully');
            }

            setReviewForm({ title: '', description: '', rating: 5 });
            setShowReviewForm(false);
            await loadData();
        } catch (err) {
            toast.error('Failed to save review');
        }
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
        setReviewForm({
            title: review.title,
            description: review.description,
            rating: review.rating,
        });
        setShowReviewForm(true);
    };

    const handleDeleteReview = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await deleteReview(id);
                await loadData();
                toast.success('Review deleted successfully');
            } catch (err) {
                toast.error('Failed to delete review');
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Projects Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
                            <button
                                onClick={() => {
                                    setShowProjectForm(!showProjectForm);
                                    setEditingProject(null);
                                    setProjectForm({ projectId: '', username: '', status: 'active', ipAddress: '', country: '' });
                                }}
                                className="btn-primary flex items-center gap-2"
                            >
                                {showProjectForm ? <X size={20} /> : <Plus size={20} />}
                                {showProjectForm ? 'Cancel' : 'Create Project'}
                            </button>
                        </div>

                        {showProjectForm && (
                            <div className="card mb-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    {editingProject ? 'Edit Project' : 'Create New Project'}
                                </h3>
                                <form onSubmit={handleProjectSubmit} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Project ID</label>
                                        <input
                                            type="text"
                                            value={projectForm.projectId}
                                            onChange={(e) => setProjectForm({ ...projectForm, projectId: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                        <input
                                            type="text"
                                            value={projectForm.username}
                                            onChange={(e) => setProjectForm({ ...projectForm, username: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <select
                                            value={projectForm.status}
                                            onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                                            className="input-field"
                                        >
                                            <option value="active">Active</option>
                                            <option value="security">Security</option>
                                            <option value="directors">Directors</option>
                                            <option value="terminated">Terminated</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">IP Address</label>
                                        <input
                                            type="text"
                                            value={projectForm.ipAddress}
                                            onChange={(e) => setProjectForm({ ...projectForm, ipAddress: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                        <input
                                            type="text"
                                            value={projectForm.country}
                                            onChange={(e) => setProjectForm({ ...projectForm, country: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-2">
                                        <button type="submit" className="btn-primary">
                                            {editingProject ? 'Update Project' : 'Create Project'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {projects.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No projects yet. Create your first project!
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Project ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Username</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">IP Address</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Country</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {projects.map((project) => (
                                                <tr key={project.id} className="table-row">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{project.projectId}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{project.username}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${project.status === 'active' || project.status === 'security' ? 'bg-green-100 text-green-700' :
                                                            project.status === 'terminated' || project.status === 'directors' ? 'bg-red-100 text-red-700' :
                                                                'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {project.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{project.ipAddress}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{project.country}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleEditProject(project)}
                                                                className="text-blue-600 hover:text-blue-800"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProject(project.id)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
                            <button
                                onClick={() => {
                                    setShowReviewForm(!showReviewForm);
                                    setEditingReview(null);
                                    setReviewForm({ title: '', description: '', rating: 5 });
                                }}
                                className="btn-primary flex items-center gap-2"
                            >
                                {showReviewForm ? <X size={20} /> : <Plus size={20} />}
                                {showReviewForm ? 'Cancel' : 'Add Review'}
                            </button>
                        </div>

                        {showReviewForm && (
                            <div className="card mb-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    {editingReview ? 'Edit Review' : 'Add New Review'}
                                </h3>
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={reviewForm.title}
                                            onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={reviewForm.description}
                                            onChange={(e) => setReviewForm({ ...reviewForm, description: e.target.value })}
                                            className="input-field"
                                            rows="4"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                                        <select
                                            value={reviewForm.rating}
                                            onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                                            className="input-field"
                                        >
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="5">5 Stars</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="btn-primary">
                                            {editingReview ? 'Update Review' : 'Add Review'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <ReviewList
                            reviews={reviews}
                            onEdit={handleEditReview}
                            onDelete={handleDeleteReview}
                            showActions={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
