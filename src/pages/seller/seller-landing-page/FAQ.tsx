import { ChevronDown } from "lucide-react";

const faqs = [
  "How do I become a seller?",
  "How long does approval take?",
  "When do I receive payments?",
  "What documents are required?",
];

const FAQ = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="max-w-5xl mx-auto mt-12 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq}
              className="border rounded-xl p-5 flex justify-between"
            >
              <span>{faq}</span>
              <ChevronDown />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
