// Footer.tsx
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Store,
  Gift,
  HelpCircle,
  Megaphone,
} from "lucide-react";

const footerSections = [
  {
    title: "ABOUT",
    links: [
      "Contact Us",
      "About Us",
      "Careers",
      "Flipkart Stories",
      "Press",
      "Corporate Information",
    ],
  },
  {
    title: "GROUP COMPANIES",
    links: ["Myntra", "Cleartrip", "Shopsy"],
  },
  {
    title: "HELP",
    links: ["Payments", "Shipping", "Cancellation & Returns", "FAQ"],
  },
  {
    title: "CONSUMER POLICY",
    links: [
      "Cancellation & Returns",
      "Terms Of Use",
      "Security",
      "Privacy",
      "Sitemap",
      "Grievance Redressal",
      "EPR Compliance",
      "FSSAI Food Safety Connect App",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white mt-10">
      {/* Top Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 border-b border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-400 text-xs font-semibold mb-4 uppercase">
                {section.title}
              </h3>

              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li
                    key={link}
                    className="text-sm font-medium hover:underline cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mail Us */}
          <div className="lg:border-l border-gray-700 lg:pl-8">
            <h3 className="text-gray-400 text-xs font-semibold mb-4 uppercase">
              Mail Us:
            </h3>

            <p className="text-sm leading-6 text-gray-200">
              Flipkart Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia &
              <br />
              Clove Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">
              <Facebook
                size={20}
                className="cursor-pointer hover:text-yellow-400"
              />
              <Twitter
                size={20}
                className="cursor-pointer hover:text-yellow-400"
              />
              <Youtube
                size={20}
                className="cursor-pointer hover:text-yellow-400"
              />
              <Instagram
                size={20}
                className="cursor-pointer hover:text-yellow-400"
              />
            </div>
          </div>

          {/* Registered Office */}
          <div>
            <h3 className="text-gray-400 text-xs font-semibold mb-4 uppercase">
              Registered Office Address:
            </h3>

            <p className="text-sm leading-6 text-gray-200">
              Flipkart Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia &
              <br />
              Clove Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
              <br />
              CIN : U51109KA2012PTC066107
              <br />
              Telephone:
              <span className="text-blue-400 cursor-pointer">
                {" "}
                044-45614700
              </span>{" "}
              /
              <span className="text-blue-400 cursor-pointer">
                {" "}
                044-67415800
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-5">
        {/* Left Items */}
        <div className="flex flex-wrap items-center gap-8 text-sm">
          <div className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer">
            <Store size={16} className="text-yellow-400" />
            <span>Become a Seller</span>
          </div>

          <div className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer">
            <Megaphone size={16} className="text-yellow-400" />
            <span>Advertise</span>
          </div>

          <div className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer">
            <Gift size={16} className="text-yellow-400" />
            <span>Gift Cards</span>
          </div>

          <div className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer">
            <HelpCircle size={16} className="text-yellow-400" />
            <span>Help Center</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-300">© 2007-2026 Flipkart.com</p>

        {/* Payment Methods */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {["VISA", "MasterCard", "RuPay", "UPI", "Net Banking", "Cash"].map(
            (item) => (
              <div
                key={item}
                className="bg-white text-black text-[10px] px-2 py-1 rounded font-semibold"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
