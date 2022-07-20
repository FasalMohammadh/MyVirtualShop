import "../css/ProductMainImageDisplay.css";
import React, { useState, useEffect } from "react";

export default function ProductMainImageDisplay({ images, className }) {
  images = images.map((img) => {
    const serveUrl = "http://localhost:3010/";
    return serveUrl + img.split("/")[1];
  });

  const [imagePrev, setImagePrev] = useState(images[0]);

  useEffect(() => {
    const keydownListener = (event) =>
      event.key === "ArrowRight"
        ? handleNext()
        : event.key === "ArrowLeft" && handlePrev();

    document.addEventListener("keydown", keydownListener);
    return () => document.removeEventListener("keydown", keydownListener);
  },[imagePrev]);


  const handleClick = (event) => setImagePrev(event.target.dataset.src);

  const handlePrev = () => {
    let curIndex = images.indexOf(imagePrev);
    curIndex > 0 && setImagePrev(images[curIndex - 1]);
  };

  const handleNext = () => {
    let curIndex = images.indexOf(imagePrev);
    curIndex < images.length - 1 && setImagePrev(images[curIndex + 1]);
  };

  return (
    <div class={`preview-image align-self-center ${className}`}>
      <img class="rounded-3" alt="" src={imagePrev} />
      <div class="allBtn bg-light gap-2">
        <i class="fa-solid fa-angles-left" onClick={handlePrev} />
        {images.map((img) => (
          <i
            class={`btn-control fa-regular ${
              imagePrev === img ? "fa-circle-dot" : "fa-circle"
            }`}
            data-src={img}
            onClick={handleClick}
          />
        ))}
        <i class="fa-solid fa-angles-right" onClick={handleNext} />
      </div>
    </div>
  );
}

/* <i */
/*   class="btn-control fa-regular fa-circle" */
/*   data-src="https://www.hdnicewallpapers.com/Walls/Big/Rainbow/Rainbow_on_Mountain_HD_Image.jpg" */
/* /> */
/* <i class="btn-control fa-regular fa-circle" data-src="" /> */
/* <i class="btn-control fa-regular fa-circle" data-src="" /> */
/* <i class="btn-control fa-regular fa-circle" data-src="" /> */
/* <i class="btn-control fa-regular fa-circle" data-src="" /> */
