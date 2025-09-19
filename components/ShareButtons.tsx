import React from 'react';

const ShareButtons: React.FC<{ text: string }> = ({ text }) => {
  const encodedText = encodeURIComponent(text);
  const url = encodeURIComponent('https://brainer.com.ng'); // Placeholder URL

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-semibold">Share:</span>
      <a href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="text-gray-500 hover:text-sky-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="text-gray-500 hover:text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" /></svg>
      </a>
      <a href={`https://api.whatsapp.com/send?text=${encodedText} ${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="text-gray-500 hover:text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.25 0 4.56-3.69 8.25-8.25 8.25-1.53 0-3-.42-4.29-1.19l-.3-.18-3.18.84.86-3.1-.2-.32a8.19 8.19 0 0 1-1.25-4.38c0-4.56 3.69-8.25 8.25-8.25m4.52 6.13c-.24-.12-1.44-.71-1.67-.79-.23-.08-.39-.12-.56.12-.17.24-.63.79-.78.95-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2-1.23-.74-.66-1.23-1.48-1.38-1.72-.14-.24-.02-.38.11-.5.12-.11.24-.29.37-.43.12-.14.17-.24.24-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.4-.42-.55-.42-.14 0-.3 0-.46 0s-.39.04-.6.24c-.2.2-.79.76-.79 1.85 0 1.08.81 2.15.92 2.3.11.14 1.58 2.41 3.82 3.39.54.23.97.36 1.31.47.69.21 1.32.18 1.82.11.55-.07 1.44-.59 1.64-1.15.2-.56.2-.95.14-1.08s-.22-.17-.46-.29" /></svg>
      </a>
    </div>
  );
};

export default ShareButtons;