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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/titles", formData);
      alert("Title created successfully!");
      router.replace(`/tittle/${formData.slug}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create title.");
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
          <Label htmlFor="image">Image File Name</Label>
          <Input
            id="image"
            name="image"
            placeholder="Enter image file name"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
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
        <Button type="submit" className="w-full">
          Create Title
        </Button>
      </form>
    </Container>
  );
};

export default CreateTitlePage;
