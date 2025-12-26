// ** React Imports
import { memo, useEffect, useState } from "react";

// ** Styles Imports
import styles from "./index.module.scss";

// ** Thirds party Imports
import { LazyLoadImage } from "react-lazy-load-image-component";

import EmptyImage from "../../assets/images/empty-image.svg";

interface CustomizeImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

function CustomizeImage({ ...props }: CustomizeImageProps) {
  // ** Props
  const { src, className, children } = props;

  // ** States
  const [imageSrc, setImageSrc] = useState("");

  // ** Functions
  const handleError = () => {
    setImageSrc(EmptyImage); // Set the SVG as the fallback image
  };

  // ** UseEffect
  useEffect(() => {
    if (src) {
      setImageSrc(src);
    }
  }, [src]);

  return (
    <LazyLoadImage
      {...props}
      src={imageSrc}
      className={`${styles.customizeImage} `}
      effect='blur'
      wrapperClassName={`${styles.customizeImageWrapper} ${className}`}
      onError={handleError}
      alt=''
    >
      {children}
    </LazyLoadImage>
  );
}

export default memo(CustomizeImage);
