

import React, { useState, useEffect, useRef } from 'react';
import '../style/Sticky.css';
const  Sticky = ({child, top}) => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
      const handleScroll = () => {
        if (ref && ref.current && ref.current.getBoundingClientRect()) {
            setSticky(ref.current.getBoundingClientRect().top <= top);
        }
      }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [top]);


  return (
      <div className={`sticky__wrapper ${isSticky && 'sticky'}`} ref={ref}>
        <div className="sticky--inner">
            {child}
        </div>
      </div>
  );
};

export default Sticky

