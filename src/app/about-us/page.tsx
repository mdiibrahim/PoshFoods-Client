import React from "react";
import Image from "next/image";
import teamImage from "@/assests/team.jpg";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6  dark:text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">About Us</h1>
        <p className="mt-4 text-lg  ">
          Welcome to PoshFoods - A place where taste meets quality!
        </p>
      </div>

      {/* Our Story Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-primary mb-6">Our Story</h2>
        <p className="text-lg leading-relaxed mb-4">
          Founded in 2024, PoshFoods was built on the vision of providing
          high-quality, fresh, and sustainable food products to our customers.
          What started as a small passion project has grown into a trusted brand
          known for its commitment to excellence.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          We believe that food is more than just sustenance; it’s an experience.
          That’s why we source our ingredients from sustainable farms and
          partners who share our passion for great taste and eco-friendly
          practices.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-primary mb-6">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Our mission is to create a unique culinary experience for our
          customers by offering premium, high-quality products that are
          responsibly sourced and sustainably produced.
        </p>
        <p className="text-lg leading-relaxed">
          We’re constantly innovating and evolving to meet the changing needs of
          our customers, without ever compromising on the taste, quality, and
          health benefits of our offerings.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-primary mb-6">
          Our Core Values
        </h2>
        <ul className="list-disc list-inside text-lg">
          <li className="mb-2">
            <strong>Quality:</strong> We never compromise on the quality of our
            ingredients.
          </li>
          <li className="mb-2">
            <strong>Innovation:</strong> We are always looking for new ways to
            enhance the customer experience.
          </li>
          <li className="mb-2">
            <strong>Sustainability:</strong> We believe in sourcing ingredients
            responsibly and supporting sustainable practices.
          </li>
          <li>
            <strong>Customer-Centric:</strong> Everything we do is aimed at
            creating the best possible experience for our customers.
          </li>
        </ul>
      </section>

      {/* Meet Our Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-primary mb-6">
          Heartfelt Message Our Team
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          At PoshFoods, our team is more than just a group of professionals – we
          are a family driven by a shared passion for creating exceptional food
          experiences. Each member brings unique skills, creativity, and
          dedication to ensure we deliver the best products and services to our
          customers. Together, we are committed to innovation, sustainability,
          and most importantly, to making a difference in the lives of those we
          serve.
          <br />
          Thank you for being part of our journey.
        </p>
        <div className="flex justify-center">
          <Image
            src={teamImage}
            alt="Our Team"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-primary mb-6">Contact Us</h2>
        <p className="text-lg leading-relaxed">
          If you have any questions or want to know more about our products,
          feel free to reach out to us at{" "}
          <a href="mailto:support@poshfoods.com" className="text-primary">
            support@poshfoods.com
          </a>
          . We would love to hear from you!
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
