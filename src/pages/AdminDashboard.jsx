import { useState, useEffect } from 'react';
import { Users, FolderKanban, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ProjectTable from '../components/ProjectTable';
import ReviewList from '../components/ReviewList';
import { getProjects, getReviews, deleteProject, deleteReview, exportToCSV } from '../utils/dataManager';


const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filters, setFilters] = useState({
        projectId: '',
        status: '',
        startDate: '',
        endDate: '',
        uid: '',
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const projectsData = await getProjects();
            const reviewsData = await getReviews();
            const usersData = await getUsers();
            setProjects(projectsData);
            setFilteredProjects(projectsData);
            setReviews(reviewsData);
            setUsers(usersData);
        } catch (err) {
            toast.error('Failed to load data');
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleFilter = () => {
        let filtered = [...projects];

        if (filters.projectId) {
            filtered = filtered.filter((p) => p.projectId.includes(filters.projectId));
        }

        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter((p) => p.status === filters.status);
        }

        if (filters.uid) {
            filtered = filtered.filter((p) => p.username.toLowerCase().includes(filters.uid.toLowerCase()));
        }

        if (filters.startDate) {
            filtered = filtered.filter((p) => p.createdAt >= filters.startDate);
        }

        if (filters.endDate) {
            filtered = filtered.filter((p) => p.createdAt <= filters.endDate);
        }

        setFilteredProjects(filtered);
        toast.success(`Found ${filtered.length} projects`);
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

    const handleExport = () => {
        exportToCSV(filteredProjects, 'projects_export.csv');
        toast.success('Projects exported to CSV');
    };

    // Count active users (excluding admin)
    const activeUsersCount = users.filter((u) => u.role === 'user').length;

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Total Users</p>
                                    <h3 className="text-3xl font-bold mt-2">{activeUsersCount}</h3>
                                </div>
                                <div className="bg-white bg-opacity-20 p-4 rounded-full">
                                    <Users size={32} />
                                </div>
                            </div>
                        </div>

                        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">Total Projects</p>
                                    <h3 className="text-3xl font-bold mt-2">{projects.length}</h3>
                                </div>
                                <div className="bg-white bg-opacity-20 p-4 rounded-full">
                                    <FolderKanban size={32} />
                                </div>
                            </div>
                        </div>

                        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium">Total Reviews</p>
                                    <h3 className="text-3xl font-bold mt-2">{reviews.length}</h3>
                                </div>
                                <div className="bg-white bg-opacity-20 p-4 rounded-full">
                                    <Star size={32} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects Management</h2>
                        <FilterBar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onFilter={handleFilter}
                            onExport={handleExport}
                        />
                        <ProjectTable projects={filteredProjects} onDelete={handleDeleteProject} />
                    </div>

                    {/* Reviews Section */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews Management</h2>
                        <ReviewList
                            reviews={reviews}
                            onDelete={handleDeleteReview}
                            showActions={true}
                        />
                    </div>

                    {/* Users Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Users</h2>
                        <div className="table-container">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="table-row">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
