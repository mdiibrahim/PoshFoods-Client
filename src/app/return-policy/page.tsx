import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Return Policy
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-primary">
            1. Eligibility for Returns
          </h2>
          <p>
            Items must be returned within <strong>14 days</strong> of delivery.
            The item(s) must be unused, in the same condition that you received
            them, and in the original packaging. Perishable goods such as food,
            flowers, newspapers, or magazines are exempt from being returned. We
            also do not accept products that are intimate or sanitary goods,
            hazardous materials, or flammable liquids or gases.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary">
            2. Non-Returnable Items
          </h2>
          <p>
            Certain types of products cannot be returned, including:
            <ul className="list-disc list-inside ml-4">
              <li>
                Perishable goods (e.g., fruits, vegetables, meats, bakery items)
              </li>
              <li>
                Items returned after the <strong>14-day return window</strong>
              </li>
              <li>Gift cards or downloadable software products</li>
            </ul>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary">
            3. Return Process
          </h2>
          <p>
            To initiate a return, please follow these steps:
            <ol className="list-decimal list-inside ml-4">
              <li>
                <strong>Contact Us:</strong> Reach out to our customer service
                team at
                <a
                  href="mailto:support@poshfoods.com"
                  className="text-blue-600 underline"
                >
                  {" "}
                  support@poshfoods.com
                </a>
                .
              </li>
              <li>
                <strong>Approval:</strong> Once we receive your request, we will
                review it and provide you with return instructions.
              </li>
              <li>
                <strong>Ship the Item:</strong> Pack the item securely and send
                it to the address provided by our customer service team.
              </li>
            </ol>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary">4. Refunds</h2>
          <p>
            Once your return is received and inspected, we will notify you of
            the approval or rejection of your refund. If approved, your refund
            will be processed and a credit applied to your original payment
            method within <strong>5-7 business days</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary">
            5. Shipping Costs for Returns
          </h2>
          <p>
            You will be responsible for paying for your own shipping costs for
            returning your item unless the return is due to our error (i.e.,
            incorrect or defective item received). Shipping costs are
            non-refundable.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
