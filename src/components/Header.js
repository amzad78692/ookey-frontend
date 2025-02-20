import React, { useContext, useState, useCallback, useRef } from "react";
import Logo from "../assest/ookey.jpeg";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const debounceTimeout = useRef(null);

  const debouncedSearch = useCallback(
    (value) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        if (value) {
          navigate(`/search?q=${value}`);
        } else {
          navigate("/search");
        }
      }, 500);
    },
    [navigate]
  );

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md fixed w-full z-40 border-b border-gray-100">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <img
              src={Logo}
              alt="brand"
              width={80}
              height={40}
              className="rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-xl mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products here..."
              className="w-full outline-none px-5 py-3 rounded-xl text-gray-700 bg-gray-50 border border-gray-200 
                focus:border-[#4d91da] focus:bg-white transition-all duration-300 pr-12"
              onChange={handleSearch}
              value={search}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 hover:text-[#4d91da] transition-colors duration-300 cursor-pointer">
              <GrSearch />
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          {/* User Profile */}
          <div className="relative">
            {user?._id && (
              <div
                className="cursor-pointer relative flex justify-center group"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-11 h-11 rounded-xl border-2 border-gray-100 hover:border-[#4d91da] transition-all duration-300 
                      shadow-md hover:shadow-lg object-cover"
                    alt={user?.name}
                  />
                ) : (
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border-2 border-gray-100 hover:border-[#4d91da] 
                    transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                    <FaRegCircleUser className="text-2xl text-gray-600" />
                  </div>
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white right-0 top-14 w-56 shadow-xl rounded-xl p-2 border border-gray-100 
                backdrop-blur-lg bg-white/90 transform transition-all duration-300">
                <nav className="space-y-1">
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel"}
                      className="flex items-center gap-3 hover:bg-[#4d91da]/10 p-3 rounded-lg text-gray-700 
                        hover:text-[#4d91da] transition-all duration-300 group"
                      onClick={() => setMenuDisplay(false)}
                    >
                      <span className="text-lg opacity-70 group-hover:opacity-100">👑</span>
                      Admin Dashboard
                    </Link>
                  )}
                  {user?.role === ROLE.USER && (
                    <>
                      <Link
                        to={"/profile"}
                        className="flex items-center gap-3 hover:bg-[#4d91da]/10 p-3 rounded-lg text-gray-700 
                          hover:text-[#4d91da] transition-all duration-300 group"
                        onClick={() => setMenuDisplay(false)}
                      >
                        <span className="text-lg opacity-70 group-hover:opacity-100">👤</span>
                        User Profile
                      </Link>
                      <Link
                        to={"/orders"}
                        className="flex items-center gap-3 hover:bg-[#4d91da]/10 p-3 rounded-lg text-gray-700 
                          hover:text-[#4d91da] transition-all duration-300 group"
                        onClick={() => setMenuDisplay(false)}
                      >
                        <span className="text-lg opacity-70 group-hover:opacity-100">📦</span>
                        My Orders
                      </Link>
                    </>
                  )}
                  {user?.role === ROLE.DELIVERY_PARTNER && (
                    <Link
                      to={"/delivery-dashboard"}
                      className="flex items-center gap-3 hover:bg-[#4d91da]/10 p-3 rounded-lg text-gray-700 
                        hover:text-[#4d91da] transition-all duration-300 group"
                      onClick={() => setMenuDisplay(false)}
                    >
                      <span className="text-lg opacity-70 group-hover:opacity-100">🚚</span>
                      Delivery Dashboard
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {/* Cart */}
          {user?._id && (
            <Link to={"/cart"} className="relative group">
              <div className="w-11 h-11 rounded-xl bg-gray-50 border-2 border-gray-100 hover:border-[#4d91da] 
                transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                <FaShoppingCart className="text-xl text-gray-600 group-hover:text-[#4d91da] transition-colors duration-300" />
              </div>
              {context?.cartProductCount > 0 && (
                <div className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center 
                  absolute -top-2 -right-2 text-xs font-medium border-2 border-white shadow-lg 
                  group-hover:scale-110 transition-transform duration-300">
                  {context?.cartProductCount}
                </div>
              )}
            </Link>
          )}

          {/* Login/Logout */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-[#4d91da] to-[#85caff] 
                  hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl 
                  font-medium hover:-translate-y-0.5"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-[#4d91da] to-[#85caff] 
                  hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-medium 
                  hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
