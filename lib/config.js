// App configuration using environment variables
export const config = {
  marketName: process.env.NEXT_PUBLIC_MARKET_NAME,
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL,
  primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR,
  locale: process.env.NEXT_PUBLIC_LOCALE,
  currency: process.env.NEXT_PUBLIC_CURRENCY,
  brandDescription: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  contactPhone1: process.env.NEXT_PUBLIC_CONTACT_PHONE1,
  contactPhone2: process.env.NEXT_PUBLIC_CONTACT_PHONE2,
};