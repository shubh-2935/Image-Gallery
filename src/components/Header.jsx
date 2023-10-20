import React, { useState } from "react";
import FullWidthTextField from "./FullWidthTextField";
import "../styles.css";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

function Header({ setNewComp, setSearchData, setUpdateSearch, setDarkMode }) {
  const [mode, setMode] = useState(true);

  const toggleDarkMode = () => {
    if (mode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
    setMode(!mode);
    setDarkMode(!mode);
  };
  return (
    <div
      className="header"
      style={{ backgroundColor: mode ? "#f5f5f5" : "#232323" }}
    >
      <div className="ImageGallery">
        Image Gallery
        <span style={{ fontSize: "1rem" }}>
          by <span style={{ fontStyle: "italic" }}>Shubham</span>
        </span>
      </div>
      <FullWidthTextField
        setNewComp={setNewComp}
        setSearchData={setSearchData}
        setUpdateSearch={setUpdateSearch}
      />
      <ul className="headerList">
        <li>Explore</li>
        <li>Collection</li>
        <li>Community</li>
      </ul>
      {mode ? (
        <ToggleOffIcon onClick={toggleDarkMode} />
      ) : (
        <ToggleOnIcon onClick={toggleDarkMode} />
      )}
    </div>
  );
}
export default Header;
