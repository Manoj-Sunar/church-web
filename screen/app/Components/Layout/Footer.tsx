import Link from "next/link";
import { Church, Facebook, Instagram } from "lucide-react";
import { Heading, Paragraph, Span } from "../Typography/TypoGraphy";
import { memo } from "react";
import Map from "../Common/Map";

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
                            <Heading as="h2" size="text-3xl" weight="extrabold" className="text-gray-800">
                                LTN Church
                            </Heading>
                        </div>

                        <Paragraph className="text-gray-400 text-lg leading-relaxed">
                            A diverse community dedicated to reflecting God's love through
                            authentic worship and radical hospitality.
                        </Paragraph>

                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="p-3 rounded-full bg-primary/70 hover:bg-primary transition-colors"
                            >
                                <Facebook className="w-5 h-5 text-white" />
                            </Link>
                            <Link
                                href="#"
                                className="p-3 rounded-full bg-primary/70 hover:bg-primary transition-colors"
                            >
                                <Instagram className="w-5 h-5 text-white" />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <Span className="text-gray-700 font-bold uppercase tracking-widest">
                                Connect
                            </Span>
                            <FooterLink href="/pages/contact">Contact Us</FooterLink>
                          
                            <FooterLink href="/pages/ministries">Ministries</FooterLink>
                           
                        </div>

                        <div className="flex flex-col gap-4">
                            <Span className="text-gray-700 font-bold uppercase tracking-widest">
                                Resources
                            </Span>
                            <FooterLink href="/pages/sermons">Sermon Library</FooterLink>
                            
                            <FooterLink href="/pages/give">Giving</FooterLink>
                           
                        </div>
                    </div>

                    {/* Map */}
                    <div className="flex flex-col gap-6">
                        <Span className="text-gray-700 font-bold uppercase tracking-widest">
                            Visit Us
                        </Span>

                        {/* Responsive Colorful Google Map */}
                        <Map/>

                        <Paragraph className="text-gray-400 italic text-lg">
                            LTN Emanuel Church<br />
                            (555) 0123-4567 | info@gracesprings.org
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
                        <span className="flex items-center gap-2">Accessibility Support</span>
                        <span className="flex items-center gap-2">English</span>
                    </div>
                </div>
            </div>
        </footer>
    );
});

export default Footer;

const FooterLink = memo(({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="text-gray-400 text-lg hover:text-gray-500 transition-colors"
    >
        {children}
    </Link>
));
