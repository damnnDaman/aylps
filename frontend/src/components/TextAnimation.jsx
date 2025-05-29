// import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

function TextAnimation(text) {
//    
console.log(text)
    return <motion.div
       
        
        initial={{ width: 0}}
        style={{ overflow: "hidden", whiteSpace: "nowrap", display: "inline-block" , fontFamily: "poppins"}}
        animate={{ width: "100%" }}
        exit={{ width: 0 }}

        transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
        // style={{ fontFamily: "sans-serif" }}
        className=" py-3 color-white-100 font-semibold  md:text-4xl sm:text-2xl"
        
    >{text.text}</motion.div>
    
    

    
    
    
// 
// 
// 
// const [displayedText, setDisplayedText] = useState('');
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index < text.length) {
//       const timeoutId = setTimeout(() => {
//         setDisplayedText((prevText) => prevText + text[index]);
//         setIndex((prevIndex) => prevIndex + 1);
//       }, delay);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [index, text, delay]);

//   return <span>{displayedText}</span>;
  
}

export default TextAnimation;