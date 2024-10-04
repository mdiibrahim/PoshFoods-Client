import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Talk to a Human</h1>
        <p className="mt-4 text-lg ">
          You’re not going to hit a ridiculously long phone menu when you call
          us. Your email isn’t going to the inbox abyss, never to be seen or
          heard from again. At PoshFoods, we provide the exceptional service
          we’d want to experience ourselves!
        </p>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column: Company Information */}
        <div>
          <h2 className="text-2xl font-bold text-primary">
            PoshFoods strives to provide the best service possible with every
            contact!
          </h2>
          <p className="mt-4 ">
            We operate in an industry built on trust. This can only be achieved
            through communication and experienced support – from the first
            contact past your ten-year anniversary.
          </p>
          <p className="mt-4 ">
            At PoshFoods, you always talk to a human! Have questions about our
            services? Our team receives specialized training regularly to ensure
            you’re receiving the best information possible. From basic questions
            to complex inquiries, we’re here to help!
          </p>
          <p className="mt-4 ">
            Interested in learning more about our services? Our Account
            Executives take the time to discuss your needs and help you make
            smart decisions that best meet your goals.
          </p>
        </div>

        {/* Right Column: Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-primary">Corporate Office</h2>
          <p className="mt-4">
            3456 Elm Street, Suite 500 <br />
            New York, NY 10001
          </p>

          <h3 className="mt-6 text-lg font-semibold text-primary">
            Direct Contact
          </h3>
          <p className="">Phone: 123-456-7890</p>
          <p className="">Fax: 123-456-7891</p>
          <p className="">
            Email:{" "}
            <a
              href="mailto:support@poshfoods.com"
              className="text-blue-600 underline"
            >
              support@poshfoods.com
            </a>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-primary">
            Departments
          </h3>
          <p className="">
            <a
              href="mailto:customerservice@poshfoods.com"
              className="text-blue-600 underline"
            >
              customerservice@poshfoods.com
            </a>
          </p>
          <p className="">
            <a
              href="mailto:sales@poshfoods.com"
              className="text-blue-600 underline"
            >
              sales@poshfoods.com
            </a>
          </p>
          <p className="">
            <a
              href="mailto:careers@poshfoods.com"
              className="text-blue-600 underline"
            >
              careers@poshfoods.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
