import { Fragment, useState, useEffect } from "react";
import UserDropdown from "../../../template/UserDropdown";
import Logo from "../../../../assets/logo.png";
import Frame from "../../../../assets/Frame 1.png";
import User from "../../../../assets/user.png";

const Mainheader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userFromStorage = localStorage.getItem('USER');
    if (userFromStorage) {
      setUserName(JSON.parse(userFromStorage).name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('secret');
    localStorage.removeItem('key');
    localStorage.removeItem('USER');
    window.location.href = '/'; // Redirect to home page
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <Fragment>
      <header className="flex justify-between items-center py-5">
        <div className="flex gap-5 w-[40%]">
          <img src={Logo} alt="Logo" />
          <input className="px-[10px] text-white" type="text" placeholder="Search for any training you want" style={{width: "100%", fontSize: "15px", background: "transparent"}} />
        </div>
        <div className="flex items-center gap-5">
          <img src={Frame} alt="Frame" />
          <div className="cursor-pointer" onClick={toggleDropdown}>
            <img src={User} alt="User" className="cursor-pointer w-[32px] bg-gray-400 rounded-3xl py-[6px] px-[6px]" />
            <UserDropdown isOpen={dropdownOpen} userName={userName} onLogout={handleLogout} />
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Mainheader;
