"use client";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export function SupportCard() {
  return (
    <motion.div className="w-3/4 lg:w-1/2 my-10" whileTap={{ scale: 0.95 }}>
      <Card className="shadow-md  dark:bg-darkBackground">
        <CardBody>
          <h3 className="text-center text-primary dark:text-darkText">
            Contact Our Customer Support
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
            We&apos;re here to assist you with any issues, questions, or
            concerns.
          </p>
          <div className="flex items-center justify-center">
            <Button
              className="w-2/4 bg-primary dark:bg-[#229799] text-white hover:bg-secondary hover:text-primary transition-all"
              onPress={() => alert("Connecting to support...")}
              aria-label="Chat with support"
            >
              Chat with Us
            </Button>
          </div>
        </CardBody>

        <CardFooter className="flex justify-between">
          <Button
            as="a"
            href="mailto:support@poshfoods.com"
            className="flex items-center gap-2"
            aria-label="Email support"
          >
            <FaEnvelope /> Email Support
          </Button>
          <Button
            as="a"
            href="tel:+1234567890"
            className="flex items-center gap-2"
            aria-label="Call support"
          >
            <FaPhone /> Call Us
          </Button>
        </CardFooter>

        <CardFooter className="flex justify-around mt-4">
          <a
            href="https://facebook.com/yourpage"
            aria-label="Visit our Facebook page"
          >
            <FaFacebook className="text-primary text-2xl cursor-pointer hover:text-secondary transition" />
          </a>
          <a
            href="https://twitter.com/yourpage"
            aria-label="Visit our Twitter page"
          >
            <FaTwitter className="text-primary text-2xl cursor-pointer hover:text-secondary transition" />
          </a>
          <a
            href="https://instagram.com/yourpage"
            aria-label="Visit our Instagram page"
          >
            <FaInstagram className="text-primary text-2xl cursor-pointer hover:text-secondary transition" />
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
