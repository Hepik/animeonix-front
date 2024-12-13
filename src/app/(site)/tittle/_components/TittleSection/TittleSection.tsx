"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/utils/api/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUser } from "@/lib/context/UserContext";
import { Trash2, Pencil } from "lucide-react";

interface Title {
  id: number;
  name: string;
  description: string;
  trailer: string;
  likes: number;
  dislikes: number;
  reviews: number;
  image: string;
  slug: string;
}

interface TitleEdit {
  id: number;
  name: string;
  description: string;
  trailer: string;
  image: string;
  slug: string;
}

const TittleSection = ({ slug }: { slug: string }) => {
  const [title, setTitle] = useState<Title | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<TitleEdit | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const fetchTitle = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        const response = await api.get<Title>(`/titles/${slug}`);
        setTitle(response.data);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTitle();
  }, [slug]);

  const handleEdit = (titleEdit: TitleEdit) => {
    setSelectedTitle(titleEdit);
  };

  const handleSave = async () => {
    try {
      if (!selectedTitle) return;
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("old_image", title?.image || "");

        const { data } = await api.post("/titles/change/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        let imageUrl = data;

        if (imageUrl) {
          await api.patch(`/titles/${selectedTitle.id}`, {
            name: selectedTitle.name,
            description: selectedTitle.description,
            trailer: selectedTitle.trailer,
            image: imageUrl,
            slug: selectedTitle.slug,
          });
        }
      }

      alert("Title updated successfully");
      setSelectedTitle(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update title");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this title?")) {
      try {
        await api.delete(`/titles/${id}`);
        alert("Title deleted successfully.");
        router.replace("/");
      } catch (error) {
        console.error(error);
        alert("Failed to delete title.");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!title) {
    return <div>Title not found</div>;
  }

  return (
    <div className="flex max-[580px]:flex-col max-[580px]:items-center text-white gap-4">
      <div className="flex flex-col max-w-[370px] w-full h-full items-center border rounded-lg space-y-2 py-2 px-4">
        <div className="relative h-[250px] w-[200px] lg:h-[400px] lg:w-[350px] rounded-lg overflow-hidden bg-gray-200 ">
          <Link
            href={`/tittle/${slug}`}
            className="relative block w-full h-full"
          >
            <Image
              src={title.image}
              alt={title.name}
              fill={true}
              sizes="20vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
        <p className="text-xl sm:text-2xl lg:text-3xl text-center">
          {title.name}
        </p>
        {user && user.role === "admin" && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => handleEdit(title)}
              className="flex items-center gap-1 px-2 text-black dark:text-white"
            >
              <Pencil /> Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(title.id)}
              className="flex items-center gap-1 px-2"
            >
              <Trash2 /> Delete
            </Button>
          </div>
        )}
        <div className="flex items-end space-x-1 text-base sm:text-lg lg:text-xl">
          <p>{title.likes}</p>
          <ThumbsUp />
          <p>/</p>
          <ThumbsDown />
          <p>{title.dislikes}</p>
          <div className="pl-3">
            {((title.likes * 10) / (title.likes + title.dislikes)).toFixed(2)}
            /10
          </div>
        </div>
        <Link href={`/tittle/${slug}/form`}>
          <Button className="border border-white rounded-lg py-4 lg:py-8 px-4 text-base lg:text-xl hover:text-black hover:bg-white">
            Write a review
          </Button>
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-m lg:text-lg border border-white px-4 py-2 rounded-lg">
          {title.description}
        </p>

        <div className="flex justify-center border border-white px-2 py-4 rounded-lg">
          <iframe
            className="hidden lg:block"
            width="540"
            height="315"
            src={title.trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <iframe
            className="hidden sm:block lg:hidden"
            width="320"
            height="280"
            src={title.trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <iframe
            className="sm:hidden"
            width="250"
            height="170"
            src={title.trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {selectedTitle && (
        <Dialog open={true} onOpenChange={() => setSelectedTitle(null)}>
          <DialogContent>
            <DialogHeader>Edit Title</DialogHeader>
            <div className="space-y-2">
              <div className="flex flex-col">
                <p>Name</p>
                <Input
                  id="name"
                  value={selectedTitle.name}
                  onChange={(e) =>
                    setSelectedTitle({
                      ...selectedTitle,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter name"
                />
              </div>
              <div className="flex flex-col">
                <p>Description</p>
                <Textarea
                  className="min-h-[200px]"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={selectedTitle.description}
                  onChange={(e) =>
                    setSelectedTitle({
                      ...selectedTitle,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <p>Trailer</p>
                <Input
                  id="trailer"
                  value={selectedTitle.trailer}
                  onChange={(e) =>
                    setSelectedTitle({
                      ...selectedTitle,
                      trailer: e.target.value,
                    })
                  }
                  placeholder="Enter trailer"
                />
              </div>
              <div className="flex flex-col">
                <p>Image</p>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) =>
                    setImageFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
              <div className="flex flex-col">
                <p>Slug</p>
                <Input
                  id="slug"
                  value={selectedTitle.slug}
                  onChange={(e) =>
                    setSelectedTitle({ ...selectedTitle, slug: e.target.value })
                  }
                  placeholder="Enter slug"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="px-2"
                variant="outline"
                onClick={() => setSelectedTitle(null)}
              >
                Cancel
              </Button>
              <Button className="px-2" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TittleSection;
