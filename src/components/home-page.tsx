"use client";

import { useState } from "react";
import { AboutSection } from "@/components/about-section";
import { BookingSection } from "@/components/booking-section";
import { FloatingBookCta } from "@/components/floating-book-cta";
import { HeroSection } from "@/components/hero-section";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { ScrollProgress } from "@/components/scroll-progress";
import { ServicesPackagesSection } from "@/components/services-packages-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { TestimonialsSection } from "@/components/testimonials-section";

export function HomePage() {
  const [prefillServiceType, setPrefillServiceType] = useState<string | undefined>(undefined);

  function handleBookPackage(defaultShoot: string) {
    setPrefillServiceType(defaultShoot);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main className="min-h-screen">
        <HeroSection />
        <ServicesPackagesSection onBookPackage={handleBookPackage} />
        <PortfolioGallery />
        <TestimonialsSection />
        <AboutSection />
        <BookingSection prefillServiceType={prefillServiceType} />
      </main>
      <SiteFooter />
      <FloatingBookCta />
    </>
  );
}
