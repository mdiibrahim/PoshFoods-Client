import { Link } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer className="bg-green-300 text-footerText p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
        {/* Column 1: Company Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            PoshFoods is dedicated to offering the best food items with quality
            and taste that makes a difference in your life. Follow us on our
            social media for updates.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/about" color="primary" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" color="primary" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" color="primary" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" color="primary" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-primary"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 5 3.68 9.14 8.44 9.88v-6.98H7.9v-2.9h2.54V9.58c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.57v1.89h2.77l-.44 2.9h-2.33v6.98A10 10 0 1 0 22 12z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="hover:text-primary"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.43 7.25c.01.14.01.29.01.43 0 4.41-3.35 9.5-9.5 9.5-1.88 0-3.63-.55-5.1-1.51h.74c1.55 0 2.97-.53 4.1-1.42-1.44-.03-2.66-.98-3.08-2.29.2.03.4.05.61.05.29 0 .57-.04.83-.11-1.5-.3-2.63-1.63-2.63-3.22v-.04c.44.24.95.38 1.49.4-.89-.6-1.48-1.63-1.48-2.8 0-.62.17-1.2.46-1.7 1.68 2.06 4.18 3.42 7 3.56-.06-.25-.09-.52-.09-.79 0-1.9 1.54-3.43 3.43-3.43.98 0 1.86.41 2.48 1.06.78-.15 1.52-.44 2.18-.83-.26.82-.82 1.51-1.54 1.94.7-.08 1.36-.27 1.98-.54-.46.7-1.05 1.31-1.72 1.8z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-primary"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5a4.25 4.25 0 0 0-4.25 4.25v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.75 2.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm-4.75 1.25a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto text-center mt-8">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} PoshFoods. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
