"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Review } from "../../[review_id]/page";
import { useUser } from "@/lib/context/UserContext";
import { api } from "@/utils/api/api";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ReviewSectionProps {
  review: Review | null;
}

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface Users {
  users: User[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ review }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (!review?.user_id) return;
      try {
        setIsLoading(true);
        const response = await api.get<Users>(`/users/?id=${review.user_id}`);
        setUserInfo(response.data.users[0]);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [review?.user_id]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await api.delete(`/reviews/${id}`);
        alert("Review deleted successfully.");
        router.back();
      } catch (error) {
        console.error(error);
        alert("Failed to delete review.");
      }
    }
  };

  if (!review) return <div>Loading</div>;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col gap-2 text-white">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 w-full">
          <div className="relative h-[70px] w-[70px] rounded-full overflow-hidden bg-gray-200 mb-2">
            <Link
              href={`/profile/${userInfo.username}`}
              className="relative block w-full h-full"
            >
              <Image
                src={userInfo.avatar}
                alt="User Image"
                fill={true}
                sizes="20vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
          <Link
            href={`/profile/${userInfo.username}`}
            className="truncate max-w-full text-center text-xl hover:text-blue-500"
          >
            {userInfo.username}
          </Link>
        </div>

        {user && (user.role === "admin" || user.id === review.user_id) && (
          <div className="flex items-center">
            <Button
              variant="destructive"
              onClick={() => handleDelete(review.id)}
              className="gap-1 px-2"
            >
              <Trash2 /> Delete
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col pl-2 bg-white text-black rounded-lg p-2">
        <div
          dangerouslySetInnerHTML={{ __html: review.content }}
          className="whitespace-pre-wrap break-words"
        ></div>
      </div>
      <div className="flex justify-end space-x-1 text-base sm:text-xl">
        <p>{review.likes}</p>
        <ThumbsUp />
        <p>/</p>
        <ThumbsDown />
        <p>{review.dislikes}</p>
        <div className="pl-2">
          ■■■□□{" "}
          {((review.likes * 10) / (review.likes + review.dislikes)).toFixed(2)}
          /10
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
