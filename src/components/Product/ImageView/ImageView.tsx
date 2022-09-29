import React, { useState } from "react";

import './ImageView.scss';

type Props = {
  images: FileList,
  selectedImage: number
}

export const ImageView: React.FC<Props> = ({ images, selectedImage }) => {
  const [index, setIndex] = useState<number>(selectedImage);

  return (
    <div className="images__view">
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
