"use client";

import { useState, useRef } from "react";
import { Upload, Check, X } from "lucide-react";

type FileUploadProps = {
  label: string;
  accept: string;
  maxSizeMB: number;
  resourceType?: "image" | "video" | "auto";
  value?: string;
  onUploaded: (url: string) => void;
};

export function FileUpload({
  label,
  accept,
  maxSizeMB,
  resourceType = "auto",
  value,
  onUploaded,
}: FileUploadProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMB} MB.`);
      return;
    }

    setFileName(file.name);
    uploadToCloudinary(file);
  }

  function uploadToCloudinary(file: File) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset!);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        onUploaded(response.secure_url);
        setProgress(null);
      } else {
        setError("Upload failed. Please try again.");
        setProgress(null);
      }
    };

    xhr.onerror = () => {
      setError("Upload failed. Check your connection and try again.");
      setProgress(null);
    };

    setProgress(0);
    xhr.send(formData);
  }

  return (
    <div>
      <label className="block text-xs text-dim mb-1.5">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full bg-card border border-line rounded-xl px-4 py-3 text-sm flex items-center justify-between"
      >
        <span className="text-dim truncate">
          {fileName ?? (value ? "File uploaded" : "Choose a file")}
        </span>
        {value && progress === null ? (
          <Check size={16} className="text-teal flex-shrink-0" />
        ) : (
          <Upload size={16} className="text-dim flex-shrink-0" />
        )}
      </button>

      {progress !== null && (
        <div className="mt-2">
          <div className="h-1.5 bg-card2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-dim mt-1">{progress}%</div>
        </div>
      )}

      {error && (
        <div className="text-xs text-red-400 mt-2 flex items-center gap-1">
          <X size={12} /> {error}
        </div>
      )}
    </div>
  );
}