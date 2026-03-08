"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star, ExternalLink } from 'lucide-react';
import { GoogleReviewCard, type GoogleReview } from './GoogleReviewCard';
import { Skeleton } from '@/components/ui/skeleton';

const REVIEWS_API_URL = 'https://data.accentapi.com/feed/25660885.json';

interface GoogleReviewsBio {
  name: string;
  overall_star_rating: number;
  rating_count: number;
  link: string;
  profile_picture: string;
}

interface GoogleReviewsApiResponse {
  bio: GoogleReviewsBio;
  reviews: GoogleReview[];
}

function ReviewCardSkeleton() {
  return (
    <Card className="h-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-11 h-11 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <Skeleton className="h-4 w-28 mt-auto" />
      </CardContent>
    </Card>
  );
}

export const GoogleReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [bio, setBio] = useState<GoogleReviewsBio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(REVIEWS_API_URL);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data: GoogleReviewsApiResponse = await response.json();
        setBio(data.bio);
        // Sort reviews: those with text or images first, empty reviews last
        const sortedReviews = [...(data.reviews || [])].sort((a, b) => {
          const aHasContent =
            (a.review_text && a.review_text.trim().length > 0) ||
            (a.images && a.images.length > 0) ? 1 : 0;
          const bHasContent =
            (b.review_text && b.review_text.trim().length > 0) ||
            (b.images && b.images.length > 0) ? 1 : 0;
          return bHasContent - aHasContent;
        });
        setReviews(sortedReviews);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#F5F7FA] to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-[#FF6B7A] text-white mb-4">Google Reviews</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Pet Parents Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Real reviews from pet parents who trust us with their beloved companions.
          </p>

          {/* Overall Rating Badge */}
          {bio && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href={bio.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {/* Google Logo */}
                <svg width="28" height="28" viewBox="0 0 48 48" className="flex-shrink-0">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>

                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-500">Overall Rating</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {bio.overall_star_rating.toFixed(1)}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(bio.overall_star_rating)
                              ? 'fill-[#FBBC05] text-[#FBBC05]'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    Based on {bio.rating_count} reviews
                  </span>
                </div>

                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1a73e8] transition-colors ml-2" />
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-lg mb-4">Unable to load reviews at the moment.</p>
            <button
              onClick={() => window.location.reload()}
              className="text-[#1a73e8] font-medium hover:underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Reviews Carousel */}
        {!loading && !error && reviews.length > 0 && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <GoogleReviewCard
                      review={review}
                      clinicName={bio?.name}
                      clinicLink={bio?.link}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        {/* Write a Review CTA */}
        {bio && !loading && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href={bio.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-[#1a73e8] hover:text-[#1a73e8] hover:shadow-lg transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 48 48" className="flex-shrink-0">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Write a Review
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};
