"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

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

export function FAQAccordion() {
  return (
    <div className="w-3/4 lg:w-1/2">
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
                height: { type: "spring", stiffness: 500, damping: 30 },
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
  );
}
