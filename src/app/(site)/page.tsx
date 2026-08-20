import { SiteLayout } from '@/components/layout/SiteLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { PricesSection } from '@/components/sections/PricesSection';
import { OffersSection } from '@/components/sections/OffersSection';
import { CalculateSection } from '@/components/sections/CalculateSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { DowntimeSection } from '@/components/sections/DowntimeSection';
import { DeliverySection } from '@/components/sections/DeliverySection';
import { TrustSection } from '@/components/sections/TrustSection';
import { DocumentsSection } from '@/components/sections/DocumentsSection';
import { GeographySection } from '@/components/sections/GeographySection';
import { RealDeliveriesSection } from '@/components/sections/RealDeliveriesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactsSection } from '@/components/sections/ContactsSection';
import { getOrganizationJsonLd, getWebSiteJsonLd } from '@/lib/seo';

export default function HomePage() {
  const jsonLd = [getOrganizationJsonLd(), getWebSiteJsonLd()];

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <PricesSection />
      <OffersSection />
      <CalculateSection />
      <ProductsSection />
      <IndustriesSection />
      <DowntimeSection />
      <DeliverySection />
      <TrustSection />
      <DocumentsSection />
      <GeographySection />
      <RealDeliveriesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactsSection />
    </SiteLayout>
  );
}
