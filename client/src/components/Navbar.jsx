import { useEffect, useMemo, useRef, useState } from "react";
import { Link , useLocation} from "react-router-dom";
import {assets} from "../assets/assets";
import { useClerk , UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";


const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/experience' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchCity, setSearchCity] = useState("");
    const searchRef = useRef(null);
    
    const {openSignIn} = useClerk();
    const location = useLocation();

    const { user , navigate , isOwner , setShowHotelReg, rooms, currency} = useAppContext();

    const searchResults = useMemo(() => {
        const query = searchCity.trim().toLowerCase();
        if (!query) return [];
        return rooms.filter((room) => {
            const city = room.hotel?.city?.toLowerCase() || "";
            const name = room.hotel?.name?.toLowerCase() || "";
            const roomType = room.roomType?.toLowerCase() || "";
            return city.includes(query) || name.includes(query) || roomType.includes(query);
        }).slice(0, 6);
    }, [rooms, searchCity]);


// Commonly Used in a navbar component to change its style (like background or shadow) after the user scrolls.
    
useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10 || location.pathname !== '/');
    };

    // Initial check (when page loads)
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
   }, [location.pathname]);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (event.target.closest("[data-search-toggle]")) return;
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setShowSearch(false);
        };
        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, []);

    const closeSearch = () => setShowSearch(false);

    const openRoom = (id) => {
        closeSearch();
        setSearchCity("");
        navigate(`/rooms/${id}`);
        scrollTo(0, 0);
    };

    const seeAllResults = (event) => {
        event.preventDefault();
        const query = searchCity.trim();
        if (!query) return;
        closeSearch();
        navigate(`/rooms?destination=${encodeURIComponent(query)}`);
        scrollTo(0, 0);
    };


    return (
                <nav className={`fixed top-0 left-0 ${
                    isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg" : "bg-transparent"} 
                    w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
                    isScrolled ? "py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to = '/' >
                    <img src = { assets.logo } alt="logo" className={`h-9 transition duration-300 hover:-translate-y-0.5 hover:scale-105 ${isScrolled && "invert opacity-80"}`} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className={`group flex flex-col gap-0.5 text-sm ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${location.pathname === link.path || (link.path !== "/" && location.pathname.startsWith(link.path)) ? "w-full" : "w-0 group-hover:w-full"} ${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 transition-all duration-300`} />
                        </Link>
                    ))}

                    { user && (
                      <button className={`border px-4 py-1 text-sm  font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`} 
                        onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true) } >
                         { isOwner ? 'Dashboard' : 'List Your Hotel'}
                      </button>
                     )}

                </div>

        {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">

                    <button type="button" data-search-toggle onClick={() => setShowSearch((open) => !open)} aria-label="Search hotels" className="cursor-pointer">
                        <img src={assets.searchIcon} alt="" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`}/>
                    </button>

                    { user ? 
                      ( 
                        <UserButton>     
                            <UserButton.MenuItems>
                                <UserButton.Action label="My Bookings" labelIcon = { <BookIcon/> } onClick={ () => navigate('/my-bookings')}/>
                            </UserButton.MenuItems>
                        </UserButton>
                      ) : (
                           <button onClick = { openSignIn } className="bg-black text-white px-8 hover:bg-green-900 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer">
                              Login
                          </button>
                          )  
                    }
                    
                </div>

        {/* Mobile Menu Button */}

                <div className="flex items-center gap-3 md:hidden">

                    <button type="button" data-search-toggle onClick={() => setShowSearch((open) => !open)} aria-label="Search hotels" className="cursor-pointer">
                        <img src={assets.searchIcon} alt="" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`}/>
                    </button>

                   {user && 
                     <UserButton>     
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon = { <BookIcon/> } onClick={ () => navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                     </UserButton>
                   }     

                    <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="" className = {`${isScrolled && 'invert'} h-4 `} />
                </div>

        {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                      <img src={assets.closeIcon} alt="close-menu" className = "h-6.5" />
                    </button>

                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={location.pathname === link.path ? "text-gray-900" : ""}>
                            {link.name}
                        </Link>
                    ))}

                 {/* Dashboard button will be visible when user is logged in. */}
                    {user && 
                      <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
                        onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)} >
                            { isOwner ? 'Dashboard' : 'List Your Hotel'}
                      </button>
                    }
           

                 {/* Login button will be visible when User is logged out. */}
                  { !user && 
                      <button onClick = { openSignIn } className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                         Login
                      </button>
                  }

                </div>

                {showSearch && (
                    <div ref={searchRef} className="absolute left-0 right-0 top-full px-4 md:px-16 lg:px-24 xl:px-32 pt-2">
                        <form onSubmit={seeAllResults} className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                            <input
                                autoFocus
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                placeholder="Search city, hotel or room"
                                className="w-full px-4 py-3 text-sm text-gray-800 outline-none"
                            />
                            {searchCity.trim() && (
                                <div className="border-t border-gray-100">
                                    {searchResults.length === 0 && (
                                        <p className="px-4 py-3 text-sm text-gray-500">No rooms found</p>
                                    )}
                                    {searchResults.map((room) => (
                                        <button
                                            type="button"
                                            key={room._id}
                                            onClick={() => openRoom(room._id)}
                                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50"
                                        >
                                            <img src={room.images?.[0]} alt="" className="h-12 w-14 rounded-lg object-cover" />
                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-sm font-medium text-gray-800">{room.hotel?.name}</span>
                                                <span className="block truncate text-xs text-gray-500">{room.hotel?.city} · {room.roomType}</span>
                                            </span>
                                            <span className="text-sm text-gray-700">{currency}{room.pricePerNight}</span>
                                        </button>
                                    ))}
                                    <button type="submit" className="w-full border-t border-gray-100 px-4 py-3 text-left text-sm text-blue-600 hover:bg-gray-50">
                                        See all results for "{searchCity.trim()}"
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </nav>

    );
};


export default Navbar;