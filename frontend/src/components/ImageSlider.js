import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const ImageSlider = ({ images }) => {
  return (
    <AwesomeSlider>
      {images.map((image) => (
        <div data-src={image} />
      ))}
    </AwesomeSlider>
  );
};

export default ImageSlider;
