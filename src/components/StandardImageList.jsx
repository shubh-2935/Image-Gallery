import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Skeleton from "@mui/material/Skeleton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModalBox from "./ModalBox";
import Modal from "@mui/material/Modal";

const apiKey = "3kZqHeYDi_n7gFBOjKtzFMZow1uVg1NAK_5oV2MxZSw";
const apiUrl = "https://api.unsplash.com/photos";

export default function StandardImageList({ darkMode }) {
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const imageContainerRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}?per_page=50`, {
          headers: {
            "Accept-Version": "v1",
            Authorization: `Client-ID ${apiKey}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setItemData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("API Request Error:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      };

      const observer = new IntersectionObserver(handleIntersection, options);
      if (imageContainerRef.current) {
        imageContainerRef.current.querySelectorAll("img").forEach((img) => {
          observer.observe(img);
        });
      }
    }
  }, [isLoading]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
      }
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        width: "75%",
        height: 1000,
        margin: "0 auto"
      }}
    >
      <ImageList variant="masonry" cols={3} gap={8} ref={imageContainerRef}>
        {itemData.map((item) => (
          <ImageListItem key={item.urls.thumb}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width={248}
                height={300}
                animation="wave"
              />
            ) : (
              <img
                src={item.urls.thumb}
                data-src={`${item.urls.thumb}?w=248&fit=crop&auto=format`}
                alt={item.slug}
                loading="lazy"
                onClick={() => openModal(item)}
                style={{ cursor: "pointer" }}
              />
            )}
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
                isLoading ? (
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    animation="wave"
                  />
                ) : (
                  <img
                    src={item.user.profile_image.large}
                    data-src={item.user.profile_image.large}
                    alt={`${item.user.name}'s profile`}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      marginRight: "10px",
                      marginBottom: "10px"
                    }}
                  />
                )
              }
              sx={{ textAlign: "left", alignItems: "center" }}
            />
          </ImageListItem>
        ))}
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
  );
}
