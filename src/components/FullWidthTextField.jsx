import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useRef } from "react";

function FullWidthTextField({ setNewComp, setSearchData, setUpdateSearch }) {
  const [input, setInput] = useState("");
  const apiKey = "3kZqHeYDi_n7gFBOjKtzFMZow1uVg1NAK_5oV2MxZSw";

  useEffect(() => {
    if (input.trim() === "") {
      setNewComp(false);
      setUpdateSearch("");
      setSearchData([]);
      return;
    }

    async function searchNow() {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${input}&per_page=30`,
          {
            headers: {
              "Accept-Version": "v1",
              Authorization: `Client-ID ${apiKey}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setSearchData(result.results);
        setNewComp(true);
        setUpdateSearch(input);
      } catch (error) {
        console.error("API Request Error:", error);
      }
    }

    searchNow();
  }, [input, apiKey]);

  const addDiv = () => {
    setNewComp(true);
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%"
      }}
    >
      <TextField
        fullWidth
        value={input}
        id="fullWidth"
        className="light-mode"
        onChange={(event) => {
          const userInput = event.target.value;
          setInput(userInput);
          setUpdateSearch(userInput);
        }}
        placeholder="search"
        label="search"
        onClick={addDiv}
        inputProps={{ style: { height: "15px" } }}
      />
    </Box>
  );
}

export default FullWidthTextField;
