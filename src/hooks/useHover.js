import { useState, useEffect } from "react";

const useHover = (target) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMouseEnter = () => {
      setIsHovered(true);
    };

    const onMouseLeave = () => {
      setIsHovered(false);
    };

    //document.querySelector(target).addEventListener("mouseenter", onMouseEnter);
    //document.querySelector(target).addEventListener("mouseleave", onMouseLeave);

    return () => {
      // component will unmount
      // before component did update
      document
        .querySelector(target)
        .removeEventListener("mouseenter", onMouseEnter);
      document
        .querySelector(target)
        .removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);
  return isHovered;
};

export default useHover;
