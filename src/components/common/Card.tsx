import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`flex flex-col gap-6 rounded-2xl border-[2px] border-blue-200 px-4 py-8 shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
