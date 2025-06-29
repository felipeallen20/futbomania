'use client'

import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit, FaStar, FaBullseye, FaSave, FaTimes } from 'react-icons/fa'

type RouletteItemManagerProps = {
  items: { option: string }[]
  setItems: (items: { option: string }[]) => void
}

export default function RouletteItemManager({ items, setItems }: RouletteItemManagerProps) {
  const [inputValue, setInputValue] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAdd = () => {
    if (!inputValue.trim()) return
    
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
    
    if (editingIndex !== null) {
      const updated = [...items]
      updated[editingIndex] = { option: inputValue.trim() }
      setItems(updated)
      setEditingIndex(null)
    } else {
      setItems([...items, { option: inputValue.trim() }])
    }
    setInputValue('')
  }

  const handleEdit = (index: number) => {
    setInputValue(items[index].option)
    setEditingIndex(index)
  }

  const handleDelete = (index: number) => {
    const updated = [...items]
    updated.splice(index, 1)
    setItems(updated)
    if (editingIndex === index) {
      setInputValue('')
      setEditingIndex(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    } else if (e.key === 'Escape' && editingIndex !== null) {
      setInputValue('')
      setEditingIndex(null)
    }
  }

  const cancelEdit = () => {
    setInputValue('')
    setEditingIndex(null)
  }

  return (
    <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4 sm:px-0">
      {/* Main Container with Glassmorphism */}
      <div className="relative bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-orange-500/20 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-orange-400/30 to-red-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl shadow-lg">
              <FaBullseye className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Opciones de la Ruleta
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {items.length} {items.length === 1 ? 'opción' : 'opciones'} configuradas
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div className="relative mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-3 sm:px-4 lg:px-5 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl 
                           focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                           shadow-lg placeholder-gray-500 text-gray-800 font-medium text-sm sm:text-base
                           transition-all duration-300 hover:bg-white/90"
                  placeholder={editingIndex !== null ? "Editando opción..." : "Ej: Premio especial"}
                />
                {editingIndex !== null && (
                  <div className="absolute -top-2 sm:-top-3 left-3 sm:left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Editando #{editingIndex + 1}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 sm:gap-2">
                <button
                  onClick={handleAdd}
                  disabled={!inputValue.trim()}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base
                           ${inputValue.trim() 
                             ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105' 
                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                           }`}
                >
                  {editingIndex !== null ? <FaSave className="w-3 h-3 sm:w-4 sm:h-4" /> : <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />}
                  <span className="hidden sm:inline">{editingIndex !== null ? 'Guardar' : 'Agregar'}</span>
                </button>
                
                {editingIndex !== null && (
                  <button
                    onClick={cancelEdit}
                    className="px-3 sm:px-4 py-3 sm:py-4 bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 rounded-xl sm:rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto scrollbar-hide">
            {items.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <FaStar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium text-sm sm:text-base">No hay opciones aún</p>
                <p className="text-xs sm:text-sm text-gray-400">Agrega tu primera opción para comenzar</p>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg
                           hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]
                           ${editingIndex === index ? 'ring-2 ring-purple-500/50 bg-white/80' : ''}
                           ${isAnimating && index === items.length - 1 ? 'animate-pulse' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-800 font-medium flex-1 break-words text-sm sm:text-base min-w-0">
                        {item.option}
                      </span>
                    </div>
                    
                    <div className="flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 ml-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-110"
                        title="Editar opción"
                      >
                        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1.5 sm:p-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-110"
                        title="Eliminar opción"
                      >
                        <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}