"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api/api";
import { Container } from "@/components/shared/Container/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreateTitlePage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trailer: "",
    image: "",
    slug: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (file) {
        setIsUploading(true);
        const formDataFile = new FormData();
        formDataFile.append("file", file);
        formDataFile.append("old_image", "");

        const { data } = await api.post("/titles/change/image", formDataFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const updatedFormData = { ...formData, image: data };
        setFormData(updatedFormData);
      }

      if (formData.image != "") {
        await api.post("/titles", formData);
        alert("Title created successfully!");
        router.replace(`/tittle/${formData.slug}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create title.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container className="flex flex-col gap-4 flex-1 py-4 px-8 bg-gray-900 rounded-lg border border-black">
      <h1 className="text-2xl font-bold text-white mb-4">Create New Title</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Title Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter title name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="trailer">Trailer URL</Label>
          <Input
            id="trailer"
            name="trailer"
            placeholder="Enter trailer URL"
            value={formData.trailer}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Upload Image</Label>
          <Input id="image" type="file" onChange={handleFileChange} required />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="Enter slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Create Title"}
        </Button>
      </form>
    </Container>
  );
};

export default CreateTitlePage;
