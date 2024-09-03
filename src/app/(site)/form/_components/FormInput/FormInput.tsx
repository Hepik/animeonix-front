"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill-image-styles.css";
import { Button } from "@/components/ui/button";

const FormInput = () => {
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-[600px] overflow-hidden p-4 rounded-lg border border-gray-300 bg-white">
        <ReactQuill
          theme="snow"
          formats={[
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",

            "indent",
            "align",
            "link",
            "image",
          ]}
          placeholder="Write something amazing..."
          modules={modules}
          onChange={setContent}
          value={content}
        />
      </div>
      <div className="flex pt-2 justify-end">
        <Button className="border border-white rounded-lg py-6 px-3 text-xl hover:text-black hover:bg-white">
          Send
        </Button>
      </div>
    </div>
  );
};

export default FormInput;
