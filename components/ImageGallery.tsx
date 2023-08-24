import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import Image from "next/image";

interface ImageItem {
  file_path: string;
}

const ImageGalleryComponent: React.FC<{ images: ImageItem[] }> = ({
  images,
}) => {
  const imageItems = images.map((picture) => ({
    original: `https://image.tmdb.org/t/p/original${picture.file_path}`,
    thumbnail: `https://image.tmdb.org/t/p/w200${picture.file_path}`,
  }));

  return (
    <div>
      <ImageGallery
        items={imageItems}
        showFullscreenButton={false}
        renderItem={(item) => (
          <div className='image-gallery-image'>
            <Image
              src={item.original}
              alt=''
              width={200} // Set the desired width
              height={300} // Set the desired height
            />
          </div>
        )}
      />
    </div>
  );
};

export default ImageGalleryComponent;
