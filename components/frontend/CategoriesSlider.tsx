"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Category } from "@/types/global";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperType } from "swiper"; // Import Swiper type

const CategoriesSlider = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null); // Corrected type for Swiper reference

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("category").select("*");
      if (error) throw error;
      setCategories(data);
    } catch (error) {
      console.log("Failed to fetch categories", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiperInstance = swiperRef.current;
      if (swiperInstance.params.navigation && typeof swiperInstance.params.navigation !== "boolean") {
        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="my-5 flex justify-between gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="flex-1 flex h-[200px] rounded-md shadow-lg animate-pulse bg-gray-300"
            key={index}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative my-10 py-5">
      {/* Navigation Controls */}
      <button type="button" ref={prevRef} className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <ArrowLeftCircle className="w-10 h-10 text-primary hover:text-black" />
      </button>
      <button type="button" ref={nextRef} className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <ArrowRightCircle className="w-10 h-10 text-primary hover:text-black" />
      </button>

      {/* Swiper Slider */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Correct way to set the ref
        className="flex"
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        spaceBetween={15}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 2 },
          400: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          991: { slidesPerView: 5 },
        }}
      >
        {categories.map(({ category, id, image_url }) => {
          let parsedImageUrl = "/placeholder.jpeg";
          try {
            const parsedData = JSON.parse(image_url || "{}");
            parsedImageUrl = parsedData?.data?.publicUrl ?? parsedImageUrl;
          } catch (error) {
            console.error("Error parsing image URL:", error);
          }

          return (
            <SwiperSlide key={id} className="bg-gray-100 rounded-md shadow-md py-4 px-2">
              <div className="flex flex-col items-center gap-1">
                <Image
                  src={parsedImageUrl}
                  alt={category}
                  width={50}
                  height={50}
                  className="w-10 h-10 object-cover rounded-2xl"
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpeg")}
                />
                <p className="text-sm text-primary">{category}</p>
                <Link href={`/${category}`} className="text-xs text-white px-2 py-1 rounded bg-primary hover:bg-black">
                  Shop
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
