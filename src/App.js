import "./styles.css";
import Header from "./components/Header";
import StandardImageList from "./components/StandardImageList";
import { useState } from "react";
import SearchPhotos from "./components/SearchPhotos";

function App() {
  const [newComp, setNewComp] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [updateSearch, setUpdateSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="App">
      <Header
        setNewComp={setNewComp}
        setSearchData={setSearchData}
        setUpdateSearch={setUpdateSearch}
        setDarkMode={setDarkMode}
      />
      {newComp ? (
        <SearchPhotos
          searchData={searchData}
          updateSearch={updateSearch}
          darkMode={darkMode}
        />
      ) : (
        <></>
      )}
      <StandardImageList darkMode={darkMode} />
    </div>
  );
}

export default App;
