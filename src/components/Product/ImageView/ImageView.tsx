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
  const [touched, setTouched] = useState<boolean>(false);
  const [touchPosition, setTouchPosition] = useState<null | number>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    const firstTouch = event.touches[0].clientX;
    setTouchPosition(firstTouch);
    setTouched(true);
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentPosition = event.touches[0].clientX;
    const diff = touchDown - currentPosition;

    if (diff > 5) {
      index === images.length - 1 ? setIndex(0) : setIndex(prevState => prevState + 1)
    }

    if (diff < -5) {
      index === 0 ? setIndex(images.length - 1) : setIndex(prevState => prevState - 1)
    }

    setTouchPosition(null);
  }

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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
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
