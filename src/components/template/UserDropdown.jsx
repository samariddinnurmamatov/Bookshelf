import PropTypes from "prop-types";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import User from "../../assets/user.png";

const UserDropdown = ({ isOpen, userName, onLogout }) => {
  return (
    <div className={`p-5 bg-white absolute top-[73px] right-5 mx-3 my-2 min-w-[140px] rounded-lg ${isOpen ? 'flex flex-col' : 'hidden'}`} style={{ boxShadow: "#61616187 0px 1px 19px -8px", border: "0.3px solid #80808057", zIndex: "9999" }}>
      {userName && (
        <div className="flex items-center gap-3 mb-3">
          <img src={User} alt="User" className="w-[34px] bg-gray-400 py-[6px] px-[6px] rounded-3xl"/>
          <p>{userName}</p>
        </div>
      )}
      {userName && <hr />}
      <ul className="list-none flex justify-end items-center flex-col gap-4 mt-3">
        <li>
          <button onClick={onLogout} className="flex items-center gap-2 text-[14px]" style={{ background: "none", border: "none", cursor: "pointer" }}> 
            <ExitToAppIcon style={{fontSize: '18px'}} />
            Tizimdan chiqish
          </button>
        </li>
      </ul>
    </div>
  );
};

UserDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default UserDropdown;
