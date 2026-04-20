import React, { useRef, useState, useEffect } from "react";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader(); // default js
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setFile(false);
      fileIsValid = false;
    }
    props.onInput(pickedFile, fileIsValid);
  };

  return (
    <div className="w-full mx-auto md:w-[500px]">
      <label className="block text-[18px] font-bold leading-6 text-neoBorder mt-4 mb-2">
        Cover photo
      </label>
      <div className="flex justify-center rounded-lg border-2 border-dashed border-neoBorder bg-neoBg shadow-sm hover:shadow-neo transition-all px-6 pt-5 pb-6 w-full mx-auto">
        <div className="space-y-2 text-center">
          <svg
            className="mx-auto h-12 w-12 text-neoBorder"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex items-center justify-center text-sm text-neoBorder font-semibold">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-lg bg-neoYellow border-2 border-neoBorder font-bold px-3 py-1 shadow-[2px_2px_0px_#111827] hover:shadow-[4px_4px_0px_#111827] hover:-translate-y-0.5 transition-all text-neoBorder focus-within:outline-none focus-within:ring-2 focus-within:ring-neoBorder focus-within:ring-offset-2"
            >
              <button onClick={pickImageHandler} type="button" className="pointer-events-none p-1">
                Upload a file
              </button>
              <input
                ref={filePickerRef}
                id="file-upload"
                name="file-upload"
                accept=".jpg, .png, .jpeg"
                onChange={pickedHandler}
                className="sr-only"
                type="file"
              />
            </label>
            <p className="pl-2 my-auto">or drag and drop</p>
          </div>
          <p className="text-xs font-bold text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="w-full">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="mx-auto max-h-64 object-cover rounded-xl border-4 border-neoBorder shadow-neo" />
          ) : (
            <p className="text-center font-bold text-gray-400">Please pick an image</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
