"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GoogleReview {
  id: string;
  reviewer_name: string;
  reviewer_photo_link: string;
  reviewer_link: string;
  review_text: string;
  rating: number;
  review_date_time: string;
  images: string[];
  reviewer_images_link: string[];
}

interface GoogleReviewCardProps {
  review: GoogleReview;
  clinicName?: string;
  clinicLink?: string;
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) + ' ' + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function getInitialColor(name: string): string {
  const colors = [
    'bg-[#4285F4]', // Google Blue
    'bg-[#EA4335]', // Google Red
    'bg-[#FBBC05]', // Google Yellow
    'bg-[#34A853]', // Google Green
    'bg-[#FF6B7A]',
    'bg-[#7B4397]',
    'bg-[#FDB913]',
    'bg-[#00897B]',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

const GoogleIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" className="flex-shrink-0">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

/* ─── Image Lightbox ─── */
function ImageLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
      >
        <X className="w-8 h-8" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 rounded-full p-2 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 rounded-full p-2 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`Review image ${current + 1}`}
          width={900}
          height={700}
          className="object-contain max-h-[85vh] rounded-lg"
          unoptimized
        />
      </motion.div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
          {current + 1} / {images.length}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Review Detail Popup ─── */
function ReviewPopup({
  review,
  clinicName,
  clinicLink,
  onClose,
}: {
  review: GoogleReview;
  clinicName?: string;
  clinicLink?: string;
  onClose: () => void;
}) {
  const hasPhoto = review.reviewer_photo_link && !review.reviewer_photo_link.includes('default');
  const hasText = review.review_text && review.review_text.trim().length > 0;
  const hasImages = review.images && review.images.length > 0;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, lightboxIndex]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto z-10"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="p-6 md:p-8">
            {/* Reviewer Header */}
            <div className="flex items-start gap-4 mb-4">
              {/* Photo */}
              <div className="flex-shrink-0">
                {hasPhoto ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-100">
                    <Image
                      src={review.reviewer_photo_link}
                      alt={review.reviewer_name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${getInitialColor(review.reviewer_name)}`}>
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name + "reviewed Clinic" */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex flex-wrap items-baseline gap-1">
                  <span className="font-bold text-gray-900 text-base">
                    {review.reviewer_name}
                  </span>
                  {clinicName && (
                    <span className="text-gray-500 text-sm">
                      reviewed{' '}
                      {clinicLink ? (
                        <a
                          href={clinicLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1a73e8] hover:underline font-medium"
                        >
                          {clinicName}
                        </a>
                      ) : (
                        <span className="font-medium">{clinicName}</span>
                      )}
                    </span>
                  )}
                </div>

                {/* Stars + date */}
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'fill-[#FBBC05] text-[#FBBC05]'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#1a73e8]">
                    {formatDate(review.review_date_time)}
                  </span>
                </div>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-100 mb-5" />

            {/* Review Text (full, not truncated) */}
            {hasText && (
              <p className="text-gray-800 text-base leading-relaxed mb-5 whitespace-pre-line">
                {review.review_text}
              </p>
            )}

            {/* Review Images (larger in popup) */}
            {hasImages && (
              <div className="grid grid-cols-2 gap-3 mb-5">
                {review.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity cursor-pointer group"
                  >
                    <Image
                      src={img}
                      alt={`Review image ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}

            {/* View on Google */}
            <a
              href={review.reviewer_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors pt-3 border-t border-gray-100 w-full"
            >
              <GoogleIcon size={18} />
              <span className="font-medium">View on Google</span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && hasImages && (
          <ImageLightbox
            images={review.images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Review Card ─── */
export const GoogleReviewCard: React.FC<GoogleReviewCardProps> = ({
  review,
  clinicName,
  clinicLink,
}) => {
  const hasPhoto = review.reviewer_photo_link && !review.reviewer_photo_link.includes('default');
  const hasText = review.review_text && review.review_text.trim().length > 0;
  const hasImages = review.images && review.images.length > 0;
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="h-full cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <Card className="h-full bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
          <CardContent className="p-6 flex flex-col h-full">
            {/* Reviewer Info Row */}
            <div className="flex items-center gap-3 mb-4">
              {/* Reviewer Photo */}
              <div className="flex-shrink-0">
                {hasPhoto ? (
                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-gray-100">
                    <Image
                      src={review.reviewer_photo_link}
                      alt={review.reviewer_name}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg ${getInitialColor(review.reviewer_name)}`}>
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name and Date */}
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-[#1a73e8] text-sm truncate block">
                  {review.reviewer_name}
                </span>
                <p className="text-xs text-gray-500">
                  {timeAgo(review.review_date_time)}
                </p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'fill-[#FBBC05] text-[#FBBC05]'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <div className="flex-1 mb-4">
              {hasText ? (
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-5">
                  {review.review_text}
                </p>
              ) : (
                <p className="text-gray-400 text-sm italic">No review text</p>
              )}
            </div>

            {/* Review Images */}
            {hasImages && (
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {review.images.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <Image
                      src={img}
                      alt={`Review image ${i + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                ))}
                {review.images.length > 3 && (
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium border border-gray-200">
                    +{review.images.length - 3}
                  </div>
                )}
              </div>
            )}

            {/* View on Google Link */}
            <div
              className="flex items-center gap-2 text-sm text-gray-500 mt-auto pt-3 border-t border-gray-100"
            >
              <GoogleIcon />
              <span className="font-medium">View on Google</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Review Detail Popup (portaled to body) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showPopup && (
            <ReviewPopup
              review={review}
              clinicName={clinicName}
              clinicLink={clinicLink}
              onClose={() => setShowPopup(false)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
