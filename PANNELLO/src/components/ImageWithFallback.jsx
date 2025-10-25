import React, { useState } from 'react'

export const ImageWithFallback = ({ src, alt, fallbackIcon, fallbackGradient = 'from-purple-400 to-blue-500', className = 'w-full h-full object-cover' }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  if (imageError || !src) {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}>
        <i className={`${fallbackIcon} text-white text-3xl`}></i>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ display: imageLoading ? 'none' : 'block' }}
      />
    </div>
  )
}
