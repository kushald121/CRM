import { ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                    <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 uppercase">{user?.role}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors">
                        <span className="font-medium uppercase">{user?.role}</span>
                        <ChevronDown size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
