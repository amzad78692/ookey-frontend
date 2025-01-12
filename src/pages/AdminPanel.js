import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigationItems = [
        {
            path: 'all-users',
            label: 'All Users',
            icon: <FaUsers className="w-5 h-5" />
        },
        {
            path: 'all-products',
            label: 'All Products',
            icon: <FaBoxOpen className="w-5 h-5" />
        },
        {
            path: 'all-order',
            label: 'All Orders',
            icon: <FaShoppingCart className="w-5 h-5" />
        }
    ];

    useEffect(() => {
        // if (!user?.role || user?.role !== ROLE.ADMIN) {
        //     navigate('/');
        //     return;
        // }

        // If we're at /admin, redirect to the first sub-route
        // if (location.pathname === '/admin') {
        //     navigate('/admin/all-users');
        // }
    }, [user, location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActiveRoute = (path) => {
        return location.pathname.includes(path);
    };

    return (
        <div className="min-h-[calc(100vh-120px)] relative">
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className="md:hidden fixed top-24 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <aside className={`bg-white min-h-full w-full max-w-60 customShadow fixed md:relative 
                transition-transform duration-300 ease-in-out z-40
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                {/* User Profile Section */}
                <div className="h-32 flex justify-center items-center flex-col border-b">
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        {user?.profilePic ? (
                            <img 
                                src={user.profilePic} 
                                className="w-20 h-20 rounded-full object-cover border-2 border-blue-600" 
                                alt={user.name} 
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <FaUser className="text-blue-600 w-12 h-12"/>
                            </div>
                        )}
                    </div>
                    <p className="capitalize text-lg font-semibold mt-2">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.role}</p>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors
                                ${isActiveRoute(item.path)
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'hover:bg-gray-50 text-gray-700'
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="w-full h-full p-4 md:p-6 md:ml-60">
                <Outlet />
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminPanel;