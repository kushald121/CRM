import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Star, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { isAdmin, logout } = useAuth();

    const adminMenuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Projects', icon: FolderKanban, path: '/admin' },
        { name: 'Reviews', icon: Star, path: '/admin' },
        { name: 'Users', icon: Users, path: '/admin' },
    ];

    const userMenuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/user' },
        { name: 'My Projects', icon: FolderKanban, path: '/user' },
        { name: 'My Reviews', icon: Star, path: '/user' },
    ];

    const menuItems = isAdmin ? adminMenuItems : userMenuItems;

    return (
        <div className="bg-white h-screen w-64 shadow-lg flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-primary-500">CRM System</h1>
                <p className="text-sm text-gray-600 mt-1">{isAdmin ? 'Admin Panel' : 'User Panel'}</p>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
