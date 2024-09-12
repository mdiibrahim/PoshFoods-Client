"use client";
import React from "react";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";

const CustomerSupport = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Need Help?</h2>
      <div className="max-w-md mx-auto">
        <Card shadow="lg" className="hover:shadow-xl transition-shadow">
          <CardBody>
            <h3 className="text-center">Contact Our Customer Support</h3>
            <p className="text-gray-500 text-center mb-4">
              We&apos;re here to help you with any issues or questions you may
              have!
            </p>
            <Button
              color="primary"
              className="w-full"
              onPress={() => alert("Support contacted")}
            >
              Chat with Us
            </Button>
          </CardBody>
          <CardFooter className="flex justify-between">
            <Button as="a" href="mailto:support@poshfoods.com">
              Email Support
            </Button>
            <Button as="a" href="tel:+1234567890">
              Call Us
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default CustomerSupport;
