import React from 'react';

const TypewriterText = ({ fullMessage }: { fullMessage: string }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const typingSpeed = 30;

  React.useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [fullMessage]);

  React.useEffect(() => {
    if (currentIndex < fullMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prevText) => prevText + fullMessage[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullMessage]);

  return <p className='revealText text-[1.8rem]'>{displayedText}</p>;
};

export default TypewriterText;
