import { TestimonialCard } from "./TestimonialCard";
import { TestimonialsHeadline } from "./TestimonialsHeadline";
import { TESTIMONIALS } from "./data/testimonials";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
        <TestimonialsHeadline />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
