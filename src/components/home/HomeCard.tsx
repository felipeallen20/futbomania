'use client';

import React from 'react';
import { FaPlayCircle } from "react-icons/fa";
import Link from 'next/link';

type CardHomeProps = {
  icon: React.ReactNode;
  title: string;
  cta: string;
  link: string;
};

const CardHome: React.FC<CardHomeProps> = ({ icon, title, cta, link }) => {
  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-2xl shadow-md p-6 w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <div className="text-5xl text-indigo-600 mb-4">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
        {title}
      </h2>
      <Link href={link} className="mt-4">
        <div className="flex items-center justify-center bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <span className="mr-2">{cta}</span>
          <FaPlayCircle />
        </div>
      </Link>
    </div>
  );
};

export default CardHome;
