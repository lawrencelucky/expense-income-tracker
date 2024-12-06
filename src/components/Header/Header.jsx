import "./header.css";

import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div>
      <header className="header">
        <h1 className="heading">INCOME AND EXPENSE MANAGEMENT SYSTEM</h1>
      </header>

      <Navbar />
    </div>
  );
};

export default Header;
