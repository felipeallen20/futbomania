'use client'

import React from 'react'
import { Wheel } from 'react-custom-roulette'
import { FaTrophy, FaStar } from 'react-icons/fa'

type RouletteProps = {
  data: { option: string }[]
  prizeNumber: number
  mustSpin: boolean
  onStop: () => void
  winner: string | null
}

const Roulette: React.FC<RouletteProps> = ({
  data,
  prizeNumber,
  mustSpin,
  onStop,
  winner
}) => {
  // Verificar que hay datos antes de renderizar
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-12 text-center">
        <div className="bg-gray-100 rounded-full w-64 h-64 flex items-center justify-center">
          <p className="text-gray-500 font-medium">No hay opciones disponibles</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center py-12 text-center">
      <div className="relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={[
            '#667eea', // Azul-Púrpura
            '#f093fb', // Rosa-Coral  
            '#4facfe', // Azul-Cian
            '#43e97b', // Verde-Turquesa
            '#fa709a', // Rosa-Amarillo
            '#a8edea', // Agua-Rosa suave
            '#ffecd2', // Durazno-Naranja
            '#ff9a9e', // Rosa suave-Lila
            '#a18cd1', // Púrpura-Rosa
            '#fad0c4', // Salmón-Rosa
            '#ff758c', // Coral-Rosa
            '#74b9ff', // Azul claro-Azul
          ]}
          textColors={['#ffffff']}
          outerBorderColor="transparent"
          innerBorderColor="transparent"
          innerBorderWidth={0}
          innerRadius={4}
          radiusLineColor="rgba(255,255,255,0.1)"
          radiusLineWidth={1}
          fontSize={16}
          textDistance={70}
          pointerProps={{
            style: {
              transform: 'scale(0.7)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              top: '8px',
              right: '25px'
            },
          }}
          outerBorderWidth={0}
          onStopSpinning={onStop}
          spinDuration={0.8}
        />
      </div>

      {winner && (
        <div className="mt-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white px-8 py-6 rounded-2xl shadow-2xl flex items-center gap-6 max-w-lg mx-auto border border-white/20 animate-pulse">
          <div className="flex flex-col gap-2">
            <FaTrophy className="text-4xl text-yellow-300 animate-bounce" />
            <FaStar className="text-2xl text-yellow-200" />
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-100 mb-1 uppercase tracking-wide">
                ¡Resultado!
            </p>
            <p className="text-xl font-bold">
              {winner}
            </p>
            <div className="mt-2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-300 text-sm" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Roulette