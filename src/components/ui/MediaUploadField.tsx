"use client";

import { useState } from "react";
import { FileUpload } from "./FileUpload";

export function MediaUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");

  return (
    <div>
      <FileUpload
        label={label}
        accept="audio/*,video/*"
        maxSizeMB={100}
        resourceType="video"
        value={url}
        onUploaded={setUrl}
      />
      <input type="hidden" name={name} value={url} />
    </div>
  );
}