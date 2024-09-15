"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function CustomerSupport() {
  const faqContent = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by visiting the 'My Orders' section in your account dashboard.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, PayPal, Apple Pay, and Google Pay.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "Contact our support team within 1 hour of placing the order. After that, it might already be processed.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. The product must be unused and in its original packaging.",
    },
    {
      question: "Do you offer 24/7 customer support?",
      answer:
        "Yes, our customer support team is available 24/7 through chat, email, and phone.",
    },
  ];

  return (
    <motion.section
      className="py-16 bg-backgroundColor dark:bg-darkBackground"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-primary dark:text-darkText">
        Need Help?
      </h2>

      <div className="flex flex-col justify-center items-center gap-10 lg:flex-row lg:gap-16">
        {/* Support Card */}
        <motion.div
          className="w-full lg:w-1/2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card shadow="lg" className="hover:shadow-xl transition-shadow">
            <CardBody>
              <h3 className="text-center text-primary dark:text-darkText">
                Contact Our Customer Support
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
                We&apos;re here to assist you with any issues, questions, or
                concerns.
              </p>
              <Button
                className="w-full bg-primary dark:bg-[#229799] text-white hover:bg-secondary hover:text-primary transition-all"
                onPress={() => alert("Connecting to support...")}
                aria-label="Chat with support"
              >
                Chat with Us
              </Button>
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

        {/* FAQ Section */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary dark:text-darkText">
            Frequently Asked Questions
          </h3>
          <Accordion
            className="text-textColor dark:text-darkText"
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: { easings: "ease", duration: 1 },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: { easings: "ease", duration: 0.25 },
                    opacity: { easings: "ease", duration: 0.3 },
                  },
                },
              },
            }}
          >
            {faqContent.map((faq, idx) => (
              <AccordionItem
                key={idx}
                aria-label={faq.question}
                title={
                  <span className="text-primary dark:text-darkText">
                    {faq.question}
                  </span>
                }
                className="text-primary dark:text-darkText"
              >
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </motion.section>
  );
}
