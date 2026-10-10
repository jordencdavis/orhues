import React, { useState } from 'react';
import { Flower2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EFECE6] text-[#635E59] p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Flower2 className="w-8 h-8 text-[#9E1B1B]/70 mb-2 stroke-[1.5]" />
        <span className="font-display text-base font-medium text-[#181615]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
