import Link from "next/link";
import { Church, Facebook, Youtube } from "lucide-react";
import { Heading, Paragraph, Span } from "../Typography/TypoGraphy";
import { memo } from "react";
import Map from "../Common/Map";

/* ---------- TikTok Icon (inline SVG — Lucide has no brand icons) ---------- */
const TikTokIcon = memo(function TikTokIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
});

/* ---------- Social links ---------- */
const SOCIAL_LINKS = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/daniel.tiruwa.5",
    Icon: Facebook,
    hover: "hover:bg-blue-600",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@daniel_tiruwa",
    Icon: Youtube,
    hover: "hover:bg-red-600",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@danieltr104",
    Icon: TikTokIcon,
    hover: "hover:bg-pink-600",
  },
] as const;

const Footer = memo(() => {
  return (
    <footer className="bg-white text-soft-blue px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg text-white">
                <Church className="w-7 h-7" />
              </div>
              <Heading
                as="h2"
                size="text-3xl"
                weight="extrabold"
                className="text-gray-800"
              >
                LTN Church
              </Heading>
            </div>

            <Paragraph className="text-gray-400 text-lg leading-relaxed">
              A diverse community dedicated to reflecting God's love through
              authentic worship and radical hospitality.
            </Paragraph>

            {/* ✅ Facebook · YouTube · TikTok */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ key, label, href, Icon, hover }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className={`p-3 rounded-full bg-primary/70 ${hover} transition-colors`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <Span className="text-gray-700 font-bold uppercase tracking-widest">
                Connect
              </Span>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/ministries">Ministries</FooterLink>
            </div>

            <div className="flex flex-col gap-4">
              <Span className="text-gray-700 font-bold uppercase tracking-widest">
                Resources
              </Span>
              <FooterLink href="/sermons">Sermon Library</FooterLink>
              <FooterLink href="/donate">Giving</FooterLink>
            </div>
          </div>

          {/* Map */}
          <div className="flex flex-col gap-6">
            <Span className="text-gray-700 font-bold uppercase tracking-widest">
              Visit Us
            </Span>

            <Map />

            <Paragraph className="text-gray-400 italic text-lg">
              LTN Emanuel Church
              <br />
              +977 9825612100 | trdaniel2022@gmail.com
            </Paragraph>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <Paragraph className="text-gray-500 text-base">
            © {new Date().getFullYear()} LTN Emanuel Church. All rights
            reserved.
          </Paragraph>

          <div className="flex gap-8 text-gray-500 text-sm">
            <span className="flex items-center gap-2">
              Accessibility Support
            </span>
            <span className="flex items-center gap-2">English</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

const FooterLink = memo(function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-400 text-lg hover:text-gray-500 transition-colors"
    >
      {children}
    </Link>
  );
});