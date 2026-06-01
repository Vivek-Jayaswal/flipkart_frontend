import { useEffect, useRef, useState } from "react";

export type ImagesType = {
  id: string;
  files: File;
  URL: string;
};

export type MultipleImageSelectorProps = {
  onChange?: (images: ImagesType[]) => void;
  children: React.ReactNode;
  selectImageType?: "single" | "multiple";
  id: string;
};

export const MultipleImageSelector = ({
  onChange,
  children,
  selectImageType = "multiple",
  id,
}: MultipleImageSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImagesType[]>([]);

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newImages = selectedFiles.map((file, idx) => ({
      id: `uid_${Date.now()}_${idx}`,
      files: file,
      URL: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      onChange && onChange(images);
      setImages([]);
    }
  }, [images]);

  return (
    <label
      htmlFor={id}
      className="w-full rounded-md flex items-center justify-center cursor-pointer"
    >
      <input
        multiple={selectImageType === "multiple"}
        type="file"
        id={id}
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        ref={inputRef}
        onChange={handleImagesChange}
      />
      {children}
    </label>
  );
};
