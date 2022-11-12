import React, { useState } from "react";

import './ImageView.scss';

type Props = {
  images: FileList,
  selectedImage: number,
  closeModals: () => void,
  isMobile: number
}

export const ImageView: React.FC<Props> = ({
  images,
  selectedImage,
  closeModals,
  isMobile
}) => {
  const [index, setIndex] = useState<number>(selectedImage);

  return (
    <div className="images__view">
      <button
        className={isMobile < 1024 ? "images__view--button close--mobile" : "images__view--button close"}
        onClick={closeModals}
      >
        X
      </button>

      <button
        className="images__view--button back"
        style={{
          visibility: index === 0 ? 'collapse' : 'visible'
        }}
        onClick={() => {
          setIndex(prevState => prevState - 1)
        }}
      >
        &#10096;
      </button>
      <img
        className="images__view--image"
        src={`${process.env.REACT_APP_FILE_STORAGE}${images[index]}`}
        alt="/"
      />
      <button
        className="images__view--button forward"
        style={{
          visibility: index === images.length - 1 ? 'collapse' : 'visible'
        }}
        onClick={() => {
          setIndex(prevState => prevState + 1)
        }}
      >
        &#10097;
      </button>
    </div>
  )
}
