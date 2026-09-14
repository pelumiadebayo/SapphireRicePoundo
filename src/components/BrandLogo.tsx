import React, { useRef, useState } from 'react';
import { useProductImage } from '../context/ProductImageContext';
import { Upload } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  withText?: boolean;
  theme?: 'light' | 'dark';
  allowUpload?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  withText = false,
  theme = 'light',
  allowUpload = false,
  className = '',
  onClick,
}) => {
  const { brandLogo, setBrandLogoFromDataUrl } = useProductImage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBrandLogoFromDataUrl(reader.result);
          setImageError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* The Circular Badge / Logo Graphic */}
      <div className="relative group/logo shrink-0">
        <div
          className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover/logo:scale-105 duration-200 ${
            theme === 'dark' ? 'bg-white/95 p-0.5 shadow-md shadow-emerald-950/40' : 'bg-white p-0.5 shadow-xs border border-stone-200/60'
          }`}
        >
          {!imageError ? (
            <img
              src={brandLogo}
              alt="Sapphire Foods Official Brand Logo"
              className="w-full h-full object-contain rounded-full"
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            /* Vector Wreath & Script Fallback SVG matching Sapphire logo structure */
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer circular branch ring */}
              <circle cx="50" cy="50" r="44" stroke="#8B5A2B" strokeWidth="2.5" strokeDasharray="3 2" />
              {/* Left Coffee/Grain Beans Wreath */}
              <g fill="#6E3D1E">
                <ellipse cx="22" cy="28" rx="5" ry="8" transform="rotate(-30 22 28)" />
                <ellipse cx="16" cy="40" rx="5" ry="8" transform="rotate(-15 16 40)" />
                <ellipse cx="15" cy="54" rx="5" ry="8" transform="rotate(5 15 54)" />
                <ellipse cx="20" cy="68" rx="5" ry="8" transform="rotate(25 20 68)" />
                <ellipse cx="29" cy="80" rx="5" ry="8" transform="rotate(50 29 80)" />
              </g>
              {/* Green Leaf sprigs bottom right */}
              <g fill="#7CB342">
                <ellipse cx="48" cy="85" rx="3.5" ry="6" transform="rotate(75 48 85)" />
                <ellipse cx="60" cy="83" rx="3.5" ry="6" transform="rotate(65 60 83)" />
                <ellipse cx="72" cy="77" rx="3.5" ry="6" transform="rotate(50 72 77)" />
                <ellipse cx="81" cy="68" rx="3" ry="5.5" transform="rotate(35 81 68)" />
              </g>
              {/* Inner leaf accent */}
              <path d="M 28 65 Q 26 50 36 44 Q 38 58 28 65 Z" fill="#2E7D32" />
              {/* Central Cursive Text: Sapphire */}
              <text
                x="52"
                y="55"
                textAnchor="middle"
                fill="#1B5E20"
                fontFamily="Georgia, serif"
                fontStyle="italic"
                fontWeight="bold"
                fontSize="18"
              >
                Sapphire
              </text>
            </svg>
          )}
        </div>

        {/* Optional upload trigger on hover */}
        {allowUpload && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title="Upload custom logo file"
              className="absolute -bottom-1 -right-1 p-1 bg-emerald-800 text-white rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity shadow-sm hover:bg-emerald-900"
            >
              <Upload className="w-2.5 h-2.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Typography Text Extension */}
      {withText && (
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold tracking-tight font-serif ${
                theme === 'dark' ? 'text-white text-xl' : 'text-emerald-950 text-xl sm:text-2xl'
              }`}
            >
              SAPPHIRE
            </span>
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                theme === 'dark'
                  ? 'bg-emerald-800 text-amber-300'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              Foods
            </span>
          </div>
          <p
            className={`text-[11px] font-medium uppercase tracking-widest -mt-0.5 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-stone-500'
            }`}
          >
            Rice Flour Mix
          </p>
        </div>
      )}
    </div>
  );
};
