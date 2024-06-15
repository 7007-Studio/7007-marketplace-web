import { useGetImageStore } from "@/app/create/collection/store";
import React, { useState } from "react";
import { MdFileDownload, MdFileUpload } from "react-icons/md";

const DragInput = () => {
  const { setUploadImages, uploadImages } = useGetImageStore();
  const [error, setError] = useState("");
  const [fileEnter, setFileEnter] = useState(false);

  const checkFiles = (files: any) => {
    // Check if the number of selected files exceeds 25
    if (files.length > 25) {
      setError("You can upload a maximum of 25 photos.");
      return false;
    }

    // Check if the number of selected files is less than 20
    if (files.length < 20) {
      setError("You must upload at least 20 photos.");
      return false;
    }

    // Check file formats
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFiles = files.filter(
      (file: any) => !allowedFormats.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      setError("Only PNG, JPG, and JPEG file formats are allowed.");
      return false;
    }

    setError(""); // Clear any previous error message
    return true;
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);
    if (checkFiles(files)) {
      setUploadImages(files as any);
    }
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    setFileEnter(false);
    const files = Array.from(e.dataTransfer.files);
    if (checkFiles(files)) {
      setUploadImages(files as any);
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      {uploadImages && uploadImages.length > 0 ? (
        <div className="w-full h-full flex items-center justify-between px-10 gap-4">
          <a>already upload {uploadImages.length} images</a>
          <button
            className="font-bold cursor-pointer w-[239px] h-10 flex items-center justify-center gap-3 bg-black hover:bg-black/50"
            onClick={() => setUploadImages([])}
          >
            <a>Change</a>
          </button>
        </div>
      ) : (
        <div
          className="w-full h-full flex items-center justify-start px-10 gap-4"
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            handleFileDrop(e);
          }}
        >
          {fileEnter ? (
            <>
              <MdFileDownload size={50} className="opacity-40" />
              <div className="opacity-40 flex flex-col">
                <label htmlFor="file" className="text-[18px] leading-[150%]">
                  Drag and drop or click to upload
                </label>
              </div>
            </>
          ) : (
            <>
              <MdFileUpload size={50} className="opacity-40" />
              <div className="opacity-40 flex flex-col">
                <label htmlFor="file" className="text-[18px] leading-[150%]">
                  Drag and drop or click to upload
                </label>
                <a className="text-[12px]">{`1920 x 1080  png / jpg / mp4  < 10MB`}</a>
              </div>
            </>
          )}
          <input
            id="file"
            type="file"
            multiple
            className="w-full h-[120px] hidden cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
      )}
      {error && (
        <p style={{ color: "red" }} className="absolute bottom-2 left-10">
          {error}
        </p>
      )}
    </div>
  );
};

export default DragInput;
