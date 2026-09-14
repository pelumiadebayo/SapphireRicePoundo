import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProductImageContextType {
  productImage: string;
  isCustom: boolean;
  setProductImageFromDataUrl: (dataUrl: string) => void;
  resetToDefault: () => void;
}

const DEFAULT_IMAGE = '/assets/images/sapphire_rice_flour_pack_1789386666178.jpg';
const STORAGE_KEY = 'sapphire_custom_product_image';

const ProductImageContext = createContext<ProductImageContextType>({
  productImage: DEFAULT_IMAGE,
  isCustom: false,
  setProductImageFromDataUrl: () => {},
  resetToDefault: () => {},
});

export const ProductImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productImage, setProductImage] = useState<string>(() => {
    // 1. Check if user previously uploaded their real photo via the UI
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    return DEFAULT_IMAGE;
  });

  const [isCustom, setIsCustom] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  // Check if a direct file was uploaded to /product.png or /product.jpg in public/
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const candidates = [
      '/product.png',
      '/product.jpg',
      '/product.jpeg',
      '/product.webp',
      '/ChatGPT Image Sep 14, 2026, 12_48_31 PM.png',
      encodeURI('/ChatGPT Image Sep 14, 2026, 12_48_31 PM.png'),
      '/sapphire-pack.png',
      '/sapphire-pack.jpg',
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
          // ignore network error
        }
      }
    };

    checkCandidates();

    return () => {
      cancelled = true;
    };
  }, []);

  const setProductImageFromDataUrl = (dataUrl: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
    } catch {
      // localStorage quota limit handling
    }
    setProductImage(dataUrl);
    setIsCustom(true);
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProductImage(DEFAULT_IMAGE);
    setIsCustom(false);
  };

  return (
    <ProductImageContext.Provider
      value={{
        productImage,
        isCustom,
        setProductImageFromDataUrl,
        resetToDefault,
      }}
    >
      {children}
    </ProductImageContext.Provider>
  );
};

export const useProductImage = () => useContext(ProductImageContext);
