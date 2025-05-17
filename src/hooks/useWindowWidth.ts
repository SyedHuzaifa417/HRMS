import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setIsMobileView(window.innerWidth < 640);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobileView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobileView,
    windowWidth,
  };
};

export default useWindowWidth;
