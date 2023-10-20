import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Skeleton from "@mui/material/Skeleton";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useState, useEffect } from "react";
import "../styles.css";

import ModalBox from "./ModalBox";
import Modal from "@mui/material/Modal";

function SearchPhotos({ searchData, updateSearch, darkMode }) {
  const [isLoading, setIsLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsLoading(searchData.length === 0 ? true : false);
  }, [searchData]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="searchResults">
        <span>
          Search results for "<span>{updateSearch}</span>"
        </span>
      </div>
      <Box
        sx={{
          width: "75%",
          height: "100%",
          margin: "0 auto"
        }}
      >
        <ImageList variant="masonry" cols={3} gap={8}>
          {searchData.map((item) =>
            isLoading ? (
              <Skeleton
                variant="rounded"
                width={"30"}
                height={300}
                animation="wave"
                gap={20}
              />
            ) : (
              <ImageListItem key={item.urls.thumb}>
                <img
                  srcSet={`${item.urls.thumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.urls.thumb}?w=248&fit=crop&auto=format`}
                  alt={item.slug}
                  loading="lazy"
                  onClick={() => openModal(item)}
                  style={{ cursor: "pointer" }}
                />
                <ImageListItemBar
                  title={item.user.name}
                  subtitle={
                    <span>
                      by: {item.user.username}
                      <span style={{ float: "right" }}>
                        <ThumbUpIcon color="black" /> {item.likes}
                      </span>
                    </span>
                  }
                  position="below"
                  actionPosition="left"
                  actionIcon={
                    <img
                      src={item.user.profile_image.large}
                      alt={`${item.user.name}'s profile`}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        marginRight: "10px",
                        marginBottom: "10px"
                      }}
                    />
                  }
                  sx={{ textAlign: "left", alignItems: "center" }}
                />
              </ImageListItem>
            )
          )}
        </ImageList>

        <Modal
          open={modalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBox selectedImage={selectedImage} darkMode={darkMode} />
        </Modal>
      </Box>
    </>
  );
}

export default SearchPhotos;
