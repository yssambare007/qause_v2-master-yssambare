import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { type CardType } from "../../types/need/card";
import { getNeedCard } from "../../utils/apis/needs/Index";
import { useAuthRedirect } from "../../utils/hooks";
import Navbar from "../navbar/Navbar";
import Carousel from "./Carousel";

interface GigFrameProps {
  children: React.ReactNode;
}

const GigFrame = ({ children }: GigFrameProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthRedirect();
  const { needId } = router.query;
  const { data: cardData } = useQuery<CardType>(["card", needId], getNeedCard, {
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="flex h-[100vh] w-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-6">
        <Carousel>
          {[1, 2, 3, 4, 5].map((i) => (
            <Image
              className="h-72 w-full rounded-lg object-contain"
              key={i}
              height={1}
              width={20000}
              src={cardData?.data?.questionsFormat?.logo as string}
              alt="carousel"
            />
          ))}
        </Carousel>
        {children}
      </div>
    </>
  );
};

export default GigFrame;
