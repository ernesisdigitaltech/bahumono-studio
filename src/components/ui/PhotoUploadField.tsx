"use client";

import { useState } from "react";
import { FileUpload } from "./FileUpload";

export function PhotoUploadField({
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
        accept="image/*"
        maxSizeMB={5}
        resourceType="image"
        value={url}
        onUploaded={setUrl}
      />
      <input type="hidden" name={name} value={url} />
    </div>
  );
}