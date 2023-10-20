import * as React from "react";
import Box from "@mui/material/Box";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Skeleton from "@mui/material/Skeleton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function ModalBox({ selectedImage, darkMode }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "75%",
    bgcolor: darkMode ? "white" : "#333333",
    p: 4
  };

  return (
    <>
      <Box sx={style}>
        {selectedImage && (
          <>
            <img
              src={selectedImage.urls.full}
              alt={selectedImage.slug}
              style={{
                "max-width": "100%",
                display: "block",
                "max-height": "100%",
                margin: "0 auto",
                height: "95%"
              }}
            />
            <ImageListItemBar
              title={selectedImage.user.name}
              subtitle={
                <span>
                  by: {selectedImage.user.username}
                  <span style={{ float: "right" }}>
                    <ThumbUpIcon color="black" /> {selectedImage.likes}
                  </span>
                </span>
              }
              position="below"
              actionPosition="left"
              actionIcon={
                selectedImage.user.profile_image.large ? (
                  <img
                    src={selectedImage.user.profile_image.large}
                    alt={`${selectedImage.user.name}'s profile`}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      marginRight: "10px",
                      marginBottom: "10px"
                    }}
                  />
                ) : (
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    animation="wave"
                  />
                )
              }
              sx={{ textAlign: "left", alignItems: "center" }}
            />
          </>
        )}
      </Box>
    </>
  );
}
export default ModalBox;
