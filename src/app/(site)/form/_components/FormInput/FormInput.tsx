"use client";

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import "./quill-image-styles.css";
import { api } from "@/utils/api/api";

const FormInput = () => {
  const [content, setContent] = useState<string>("");
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
          });
        }
      });
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/reviews", {
        content,
      });
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending content:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-[600px] overflow-hidden p-4 rounded-lg border border-gray-300 bg-white">
        <div ref={quillRef} className="quill-editor" />
      </div>
      <div className="flex pt-2 justify-end">
        <Button
          className="border border-white rounded-lg py-6 px-3 text-xl hover:text-black hover:bg-white"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default FormInput;
