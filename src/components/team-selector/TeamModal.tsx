'use client'

import React, { useState } from 'react'
import { FaUserCircle, FaTimes, FaFutbol, FaStar } from 'react-icons/fa'

// Define player info type
interface PlayerInfo {
  name: string
  team: string
}

interface TeamModalProps {
  isOpen: boolean
  onClose: () => void
}

const positions = [
  { key: 'GK', label: 'Portero', color: 'from-yellow-400 to-orange-500' },
  { key: 'LB', label: 'Lateral Izquierdo', color: 'from-blue-400 to-blue-600' },
  { key: 'CB1', label: 'Central 1', color: 'from-red-400 to-red-600' },
  { key: 'CB2', label: 'Central 2', color: 'from-red-400 to-red-600' },
  { key: 'RB', label: 'Lateral Derecho', color: 'from-blue-400 to-blue-600' },
  { key: 'LM', label: 'Mediocampista Izquierdo', color: 'from-green-400 to-green-600' },
  { key: 'CM', label: 'Mediocentro', color: 'from-purple-400 to-purple-600' },
  { key: 'RM', label: 'Mediocampista Derecho', color: 'from-green-400 to-green-600' },
  { key: 'LW', label: 'Extremo Izquierdo', color: 'from-pink-400 to-pink-600' },
  { key: 'CF', label: 'Delantero Centro', color: 'from-indigo-400 to-indigo-600' },
  { key: 'RW', label: 'Extremo Derecho', color: 'from-pink-400 to-pink-600' },
]

export default function TeamModal({ isOpen, onClose }: TeamModalProps) {
  const [selectedPos, setSelectedPos] = useState<string | null>(null)
  const [players, setPlayers] = useState<Record<string, PlayerInfo>>({})
  const [form, setForm] = useState<PlayerInfo>({ name: '', team: '' })

  const handleSlotClick = (pos: string) => {
    setSelectedPos(pos)
    const existing = players[pos]
    setForm(existing ? { ...existing } : { name: '', team: '' })
  }

  const handleConfirm = () => {
    if (selectedPos) {
      setPlayers(prev => ({ ...prev, [selectedPos]: { ...form } }))
      setSelectedPos(null)
      setForm({ name: '', team: '' })
    }
  }

  const getPositionColor = (pos: string) => {
    return positions.find(p => p.key === pos)?.color || 'from-gray-400 to-gray-600'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/30 to-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white via-green-50 to-blue-50 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20 transform transition-all duration-300 scale-100">{/* Removed custom animations */}
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 px-6 py-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaFutbol className="text-white text-base animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mi Equipo</h3>
                <p className="text-white/80 text-sm">Formación 4-3-3</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110"
            >
              <FaTimes className="text-white text-base" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Field Background */}
          <div className="relative bg-gradient-to-b from-green-400 to-green-600 rounded-2xl p-6 shadow-inner">
            {/* Field lines */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Field Layout */}
            <div className="relative flex flex-col space-y-4">
              {/* Attack Row */}
              <div className="flex justify-around items-center">
                {['LW', 'CF', 'RW'].map(pos => (
                  <button
                    key={pos}
                    onClick={() => handleSlotClick(pos)}
                    className={`group relative transform transition-all duration-300 ${selectedPos === pos ? 'scale-110' : 'hover:scale-105'}`}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${getPositionColor(pos)} rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 backdrop-blur-sm`}>
                      {players[pos]?.name ? (
                        <FaStar className="text-white text-base animate-pulse" />
                      ) : (
                        <FaUserCircle className="text-white text-base" />
                      )}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 min-w-max">
                      <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        {players[pos]?.name || pos}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Midfield Row */}
              <div className="flex justify-around items-center pt-4">
                {['LM', 'CM', 'RM'].map(pos => (
                  <button
                    key={pos}
                    onClick={() => handleSlotClick(pos)}
                    className={`group relative transform transition-all duration-300 ${selectedPos === pos ? 'scale-110' : 'hover:scale-105'}`}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${getPositionColor(pos)} rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 backdrop-blur-sm`}>
                      {players[pos]?.name ? (
                        <FaStar className="text-white text-base animate-pulse" />
                      ) : (
                        <FaUserCircle className="text-white text-base" />
                      )}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 min-w-max">
                      <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        {players[pos]?.name || pos}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Defense Row */}
              <div className="flex justify-around items-center pt-4">
                {['LB', 'CB1', 'CB2', 'RB'].map(pos => (
                  <button
                    key={pos}
                    onClick={() => handleSlotClick(pos)}
                    className={`group relative transform transition-all duration-300 ${selectedPos === pos ? 'scale-110' : 'hover:scale-105'}`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${getPositionColor(pos)} rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 backdrop-blur-sm`}>
                      {players[pos]?.name ? (
                        <FaStar className="text-white text-base animate-pulse" />
                      ) : (
                        <FaUserCircle className="text-white text-base" />
                      )}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 min-w-max">
                      <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        {players[pos]?.name || pos}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Goalkeeper Row */}
              <div className="flex justify-center items-center pt-4">
                <button
                  onClick={() => handleSlotClick('GK')}
                  className={`group relative transform transition-all duration-300 ${selectedPos === 'GK' ? 'scale-110' : 'hover:scale-105'}`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${getPositionColor('GK')} rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 backdrop-blur-sm`}>
                    {players['GK']?.name ? (
                      <FaStar className="text-white text-base animate-pulse" />
                    ) : (
                      <FaUserCircle className="text-white text-base" />
                    )}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 min-w-max">
                    <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                      {players['GK']?.name || 'GK'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Form for selected position */}
          {selectedPos && (
            <div className="mt-6 bg-gradient-to-r from-white to-gray-50 p-4 rounded-2xl shadow-inner border border-gray-200 transform transition-all duration-300">{/* Removed custom animation */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 bg-gradient-to-br ${getPositionColor(selectedPos)} rounded-full flex items-center justify-center`}>
                  <FaUserCircle className="text-white text-base" />
                </div>
                <h4 className="text-lg font-bold text-gray-800">
                  {positions.find(p => p.key === selectedPos)?.label}
                </h4>
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nombre del jugador"
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Equipo"
                    value={form.team}
                    onChange={e => setForm(prev => ({ ...prev, team: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <button
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  ✓ Confirmar Jugador
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}