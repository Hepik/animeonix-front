"use client";

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import "./quill-image-styles.css";

const MAX_CHAR_LIMIT = 5000;

const FormInput = ({ onSubmit }: { onSubmit: (content: string) => void }) => {
  const [content, setContent] = useState<string>("");
  const [isTooLong, setIsTooLong] = useState<boolean>(false);
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && quillRef.current) {
      import("quill").then((Quill) => {
        if (!quillInstance.current && quillRef.current) {
          quillInstance.current = new Quill.default(quillRef.current, {
            theme: "snow",
            placeholder: "Write something amazing...",
            modules: {
              toolbar: [
                [{ font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link", "image"],
                ["clean"],
              ],
            },
          });
          quillInstance.current.on("text-change", () => {
            setContent(quillInstance.current?.root.innerHTML || "");
            const plainText = quillInstance.current?.getText() || "";
            setIsTooLong(plainText.length > MAX_CHAR_LIMIT);
          });
        }
      });
    }
  }, []);

  const handleSubmit = () => {
    if (!isTooLong) {
      onSubmit(content);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-[600px] overflow-hidden p-4 rounded-lg border border-gray-300 bg-white dark:text-black">
        <div ref={quillRef} className="quill-editor" />
      </div>
      {isTooLong && (
        <p className="text-red-500 text-sm pt-2">
          Your text exceeds the maximum limit of {MAX_CHAR_LIMIT} characters.
        </p>
      )}
      <div className="flex pt-2 justify-end">
        <Button
          className={`border border-white rounded-lg py-6 px-3 text-xl hover:text-black hover:bg-white ${
            isTooLong ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={isTooLong}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default FormInput;
