"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";

export function PDFUploader() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile?.type === "application/pdf") {
      setFile(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {file ? (
            <>
              <FileText className="h-12 w-12 text-blue-500" />
              <p className="text-lg font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400" />
              <p className="text-lg font-medium">Drop your PDF here</p>
              <p className="text-sm text-gray-500">or click to select a file</p>
            </>
          )}
        </div>
      </div>
      {file && (
        <button
          onClick={() => setFile(null)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Remove File
        </button>
      )}
    </div>
  );
}
