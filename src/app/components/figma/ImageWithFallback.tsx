import React, { useState } from 'react'
import { infoFor, webpSrcSet } from '../../utils/images'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** How wide the image is drawn, e.g. "(min-width: 1024px) 33vw, 50vw". */
  sizes?: string
  /** True only for the one image that is the main thing on screen at load. */
  priority?: boolean
}

/**
 * A photo, served at the size it is actually drawn.
 *
 * When image_variants.py has made WebP copies of the file, the browser picks
 * the smallest one that is sharp at this width on this screen: a 180px card on
 * a phone takes the 400px copy (about 6 KB) instead of the 1200px JPEG (about
 * 190 KB). Browsers without WebP, and any file without copies, get the JPEG.
 *
 * width and height come from the original file, so the browser reserves the
 * right space before the image arrives and nothing jumps. They set the shape
 * only; the classes still decide the size on screen.
 *
 * Everything below the first screen loads lazily, when the visitor scrolls
 * near it. The <picture> is display: contents so the <img> inside keeps
 * sizing itself against the same parent it always did.
 */
export function ImageWithFallback({ sizes, priority = false, ...props }: Props) {
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  const info = src ? infoFor(src) : undefined
  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      width={info?.w}
      height={info?.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchpriority: 'high' } : {})}
      {...rest}
      onError={() => setDidError(true)}
    />
  )
  if (!info || !src) return img

  return (
    <picture className="contents">
      <source type="image/webp" srcSet={webpSrcSet(src, info.webp)} sizes={sizes ?? '100vw'} />
      {img}
    </picture>
  )
}
