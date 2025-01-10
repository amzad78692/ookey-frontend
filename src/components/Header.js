import React, { useContext, useState, useCallback, useRef } from "react";
import Logo from "../assest/logo.png";
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
    <header className="h-24 shadow-md bg-slate-200 fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <img
              src={Logo}
              alt="brand"
              width={90}
              height={50}
              className="rounded-full hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-md border-2 border-white rounded-full bg-white pl-2 shadow-lg focus-within:ring focus-within:ring-[#4d91da]">
          <input
            type="text"
            placeholder="Search products here..."
            className="w-full outline-none px-3 py-2 rounded-l-full text-gray-700"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-10 bg-[#4d91da] flex items-center justify-center rounded-r-full text-white hover:bg-[#85caff] transition-colors duration-300 cursor-pointer">
            <GrSearch />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-5">
          {/* User Profile */}
          <div className="relative">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center hover:scale-105 transition-transform duration-300"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser className="text-white" />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white right-0 top-12 w-40 shadow-lg rounded-lg p-2">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="block hover:bg-[#4d91da]/20 p-2 rounded-lg text-gray-700"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={"/order"}
                    className="block hover:bg-[#4d91da]/20 p-2 rounded-lg text-gray-700"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Orders
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {/* Cart */}
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span className="text-white">
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3 text-xs">
                {context?.cartProductCount}
              </div>
            </Link>
          )}

          {/* Login/Logout */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-white bg-[#4d91da] hover:bg-red-600 transition-colors duration-300 shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-2 rounded-full text-white bg-[#4d91da] hover:bg-[#85caff] transition-colors duration-300 shadow-lg"
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
