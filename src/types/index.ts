export type ContactChannelType =
  | 'phone'
  | 'email'
  | 'telegram'
  | 'max'
  | 'whatsapp'
  | 'form'
  | 'callback';

export interface ContactChannel {
  id: string;
  type: ContactChannelType;
  title: string;
  label: string;
  value: string;
  href: string;
  description: string;
  enabled: boolean;
  sortOrder: number;
  showInHeader: boolean;
  showInContactPanel: boolean;
  showInMobileBar: boolean;
  showInFooter: boolean;
  showInForms: boolean;
}

export type PriceMode = 'from' | 'on_request';

export type AvailabilityStatus = 'in_stock' | 'on_request' | 'limited';

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  application: string;
  priceMode: PriceMode;
  priceFrom?: number;
  priceUnit?: string;
  availability: AvailabilityStatus;
  updatedAt?: string;
  image?: string;
  active: boolean;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface DeliveryStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface SupplyCase {
  id: string;
  title: string;
  region: string;
  product: string;
  description: string;
  date?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  author: string;
  company?: string;
  role?: string;
  text: string;
  active: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  slug: string;
  active: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
}

export interface SEOConfig {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  /** Полный title для Open Graph / Twitter */
  ogTitle: string;
  ogImage: string;
  keywords: string[];
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export type FormType = 'calculate' | 'contact' | 'callback';

export interface ContentProvider {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getIndustries(): Promise<Industry[]>;
  getRegions(): Promise<Region[]>;
  getDeliverySteps(): Promise<DeliveryStep[]>;
  getSupplyCases(): Promise<SupplyCase[]>;
  getFAQ(): Promise<FAQItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getNews(): Promise<NewsItem[]>;
}
