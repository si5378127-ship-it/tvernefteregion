import { SiteLayout } from '@/components/layout/SiteLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { PricesSection } from '@/components/sections/PricesSection';
import { CalculateSection } from '@/components/sections/CalculateSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { DowntimeSection } from '@/components/sections/DowntimeSection';
import { DeliverySection } from '@/components/sections/DeliverySection';
import { TrustSection } from '@/components/sections/TrustSection';
import { DocumentsSection } from '@/components/sections/DocumentsSection';
import { GeographySection } from '@/components/sections/GeographySection';
import { RealDeliveriesSection } from '@/components/sections/RealDeliveriesSection';
import { SuppliesSection } from '@/components/sections/SuppliesSection';
import { NewsSection } from '@/components/sections/NewsSection';
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
      <CalculateSection />
      <ProductsSection />
      <IndustriesSection />
      <DowntimeSection />
      <DeliverySection />
      <TrustSection />
      <DocumentsSection />
      <GeographySection />
      <RealDeliveriesSection />
      <SuppliesSection />
      <NewsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactsSection />
    </SiteLayout>
  );
}
