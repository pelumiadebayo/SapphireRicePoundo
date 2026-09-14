import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProductImageContextType {
  productImage: string;
  isCustom: boolean;
  setProductImageFromDataUrl: (dataUrl: string) => void;
  resetToDefault: () => void;
  brandLogo: string;
  isCustomLogo: boolean;
  setBrandLogoFromDataUrl: (dataUrl: string) => void;
  resetBrandLogo: () => void;
}

const assetUrl = (fileName: string) => `${import.meta.env.BASE_URL}assets/images/${fileName}`;
const publicFileUrl = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`;
const DEFAULT_IMAGE = assetUrl('sapphire_rice_flour_pack_1789386666178.png');
const DEFAULT_LOGO = assetUrl('sapphire_logo.png');
const STORAGE_KEY = 'sapphire_custom_product_image';
const LOGO_STORAGE_KEY = 'sapphire_custom_brand_logo';

const ProductImageContext = createContext<ProductImageContextType>({
  productImage: DEFAULT_IMAGE,
  isCustom: false,
  setProductImageFromDataUrl: () => {},
  resetToDefault: () => {},
  brandLogo: DEFAULT_LOGO,
  isCustomLogo: false,
  setBrandLogoFromDataUrl: () => {},
  resetBrandLogo: () => {},
});

export const ProductImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productImage, setProductImage] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return DEFAULT_IMAGE;
  });

  const [isCustom, setIsCustom] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  const [brandLogo, setBrandLogo] = useState<string>(() => {
    const saved = localStorage.getItem(LOGO_STORAGE_KEY);
    if (saved) return saved;
    return DEFAULT_LOGO;
  });

  const [isCustomLogo, setIsCustomLogo] = useState<boolean>(() => {
    return !!localStorage.getItem(LOGO_STORAGE_KEY);
  });

  // Check if a direct file was uploaded for product
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const candidates = [
      publicFileUrl('product.png'),
      publicFileUrl('product.jpg'),
      publicFileUrl('product.jpeg'),
      publicFileUrl('product.webp'),
      publicFileUrl('ChatGPT Image Sep 14, 2026, 12_48_31 PM.png'),
      encodeURI(publicFileUrl('ChatGPT Image Sep 14, 2026, 12_48_31 PM.png')),
      publicFileUrl('sapphire-pack.png'),
      publicFileUrl('sapphire-pack.jpg'),
    ];
    let cancelled = false;

    const checkCandidates = async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok && res.headers.get('content-type')?.startsWith('image')) {
            if (!cancelled) {
              setProductImage(url);
              setIsCustom(true);
            }
            break;
          }
        } catch {
          // ignore
        }
      }
    };

    checkCandidates();
    return () => {
      cancelled = true;
    };
  }, []);

  // Check if a direct file was uploaded for logo
  useEffect(() => {
    if (localStorage.getItem(LOGO_STORAGE_KEY)) return;

    const candidates = [
      publicFileUrl('Sapphire_Logo_Original_Font_Green_Text (1).png'),
      encodeURI(publicFileUrl('Sapphire_Logo_Original_Font_Green_Text (1).png')),
      publicFileUrl('Sapphire_Logo_Original_Font_Green_Text.png'),
      publicFileUrl('logo.png'),
      publicFileUrl('logo.jpg'),
      publicFileUrl('sapphire_logo.png'),
      publicFileUrl('sapphire_logo.jpg'),
      assetUrl('sapphire_logo.png'),
    ];
    let cancelled = false;

    const checkLogoCandidates = async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok && res.headers.get('content-type')?.startsWith('image')) {
            if (!cancelled) {
              setBrandLogo(url);
              setIsCustomLogo(true);
            }
            break;
          }
        } catch {
          // ignore
        }
      }
    };

    checkLogoCandidates();
    return () => {
      cancelled = true;
    };
  }, []);

  const setProductImageFromDataUrl = (dataUrl: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
    } catch {
      // quota limit
    }
    setProductImage(dataUrl);
    setIsCustom(true);
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProductImage(DEFAULT_IMAGE);
    setIsCustom(false);
  };

  const setBrandLogoFromDataUrl = (dataUrl: string) => {
    try {
      localStorage.setItem(LOGO_STORAGE_KEY, dataUrl);
    } catch {
      // quota limit
    }
    setBrandLogo(dataUrl);
    setIsCustomLogo(true);
  };

  const resetBrandLogo = () => {
    localStorage.removeItem(LOGO_STORAGE_KEY);
    setBrandLogo(DEFAULT_LOGO);
    setIsCustomLogo(false);
  };

  return (
    <ProductImageContext.Provider
      value={{
        productImage,
        isCustom,
        setProductImageFromDataUrl,
        resetToDefault,
        brandLogo,
        isCustomLogo,
        setBrandLogoFromDataUrl,
        resetBrandLogo,
      }}
    >
      {children}
    </ProductImageContext.Provider>
  );
};

export const useProductImage = () => useContext(ProductImageContext);
