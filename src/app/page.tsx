"use client";

import { GiCardRandom } from "react-icons/gi";
import CardHome from '../components/home/HomeCard';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <CardHome
        icon={<GiCardRandom className="w-24 h-24"/>}
        title="Adivina adivinador"
        cta="Jugar ahora"
        link="/guess"
      />
    </main>
  );
}