"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export const runtime = "edge";

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalDimensions, setModalDimensions] = useState({
    width: 0,
    height: 0,
  });

  const images = Array.from(
    { length: 16 },
    (_, i) => `/images/gallery/${i}.jpg`
  );

  useEffect(() => {
    const handleResize = () => {
      if (selectedImage) {
        calculateModalDimensions(selectedImage);
      }
    };

    if (selectedImage) {
      // Prevent background scrolling when modal is open
      document.body.style.overflow = "hidden";
      calculateModalDimensions(selectedImage);

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);
    } else {
      // Restore background scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup event listener on component unmount or when selectedImage changes
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedImage]);

  const calculateModalDimensions = (imageSrc: string) => {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      const viewportWidth = window.innerWidth * 0.9; // Use 90% of viewport width
      const viewportHeight = window.innerHeight * 0.9; // Use 90% of viewport height
      const aspectRatio = img.width / img.height;

      let width, height;

      // Dynamically calculate the modal size
      if (aspectRatio > 1) {
        // Landscape: Constrain width
        width = Math.min(viewportWidth, img.width);
        height = width / aspectRatio;

        // If height exceeds viewport height, constrain height and recalculate width
        if (height > viewportHeight) {
          height = viewportHeight;
          width = height * aspectRatio;
        }
      } else {
        // Portrait: Constrain height
        height = Math.min(viewportHeight, img.height);
        width = height * aspectRatio;

        // If width exceeds viewport width, constrain width and recalculate height
        if (width > viewportWidth) {
          width = viewportWidth;
          height = width / aspectRatio;
        }
      }

      setModalDimensions({ width, height });
    };
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* Masonry-like layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="mb-4 break-inside-avoid">
            <div
              className="cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index}`}
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setSelectedImage(null)} // Close modal when clicking outside the image
          role="dialog"
        >
          {/* Image Container */}
          <div
            className="relative flex justify-center items-center"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal when clicking on the image
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          >
            {/* Close Button */}
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            {/* Dynamically Sized Image */}
            <Image
              src={selectedImage}
              alt="Selected"
              width={modalDimensions.width}
              height={modalDimensions.height}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
