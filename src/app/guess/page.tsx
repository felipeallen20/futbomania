'use client'

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { FaDice, FaUsers } from 'react-icons/fa'
const Roulette = dynamic(() => import('@/components/guess/Roulette'), { ssr: false })
import RouletteItemManager from '@/components/guess/RouletteItemManager'
import TeamModal from '@/components/team-selector/TeamModal'

export default function Guess() {
  const [items, setItems] = useState<{ option: string }[]>([
    { option: 'Premio 1' },
    { option: 'Premio 2' },
    { option: 'Premio 3' }
  ])
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [showTeam, setShowTeam] = useState(false)

  const handleSpinClick = () => {
    if (items.length === 0) return
    const randomIndex = Math.floor(Math.random() * items.length)
    setPrizeNumber(randomIndex)
    setMustSpin(true)
    setWinner(null)
  }

  const handleStop = () => {
    setMustSpin(false)
    setWinner(items[prizeNumber].option)
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6 min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100">
      {/* Left: Roulette */}
      <div className="flex flex-col items-center justify-center w-full relative">
        <Roulette
          data={items}
          prizeNumber={prizeNumber}
          mustSpin={mustSpin}
          onStop={handleStop}
          winner={winner}
        />

        <button
          onClick={handleSpinClick}
          disabled={mustSpin || items.length === 0}
          className={
            `mt-6 flex items-center justify-center gap-3
            px-6 py-3
            text-white text-lg font-semibold
            rounded-full shadow-lg
            bg-gradient-to-r from-green-500 to-emerald-600
            hover:from-green-600 hover:to-emerald-700
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 ease-in-out`
          }
        >
          <FaDice className="text-xl animate-pulse" />
          Girar
        </button>

        {/* TeamModal trigger button */}
        <button
          onClick={() => setShowTeam(true)}
          className="absolute top-4 right-4 md:static md:mt-8 flex items-center gap-2 text-gray-700 bg-white/50 backdrop-blur-sm hover:bg-white/70 px-4 py-2 rounded-full shadow-sm transition"
        >
          <FaUsers className="text-lg" />
          Equipo
        </button>
      </div>

      {/* Right: Item Manager */}
      <RouletteItemManager items={items} setItems={setItems} />

      {/* TeamModal component controlled by state */}
      <TeamModal isOpen={showTeam} onClose={() => setShowTeam(false)} />

    </div>
  )
}
