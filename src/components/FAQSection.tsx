import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'Are the sarees authentic handloom?', a: 'Yes, all our sarees are 100% authentic handloom products sourced directly from master weavers across India. Each piece comes with a handloom mark certification.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days within India. Express shipping (2-3 days) is available for metro cities. Free shipping on orders above ₹5,000.' },
  { q: 'What is the return policy?', a: 'We offer easy returns within 7 days of delivery. The saree must be unused, unwashed, and in original packaging. Refunds are processed within 5-7 business days.' },
  { q: 'Is a blouse piece included?', a: 'Most of our sarees come with an unstitched blouse piece. This is mentioned in each product description. Custom blouse stitching can be arranged on request.' },
  { q: 'Is Cash on Delivery (COD) available?', a: 'Yes, COD is available for orders within India. You can discuss payment options during WhatsApp checkout for maximum convenience.' },
  { q: 'How should I care for silk sarees?', a: 'We recommend dry cleaning for silk sarees. Store them wrapped in muslin cloth in a cool, dry place. Avoid direct sunlight and moisture to maintain the fabric\'s lustre.' },
];

const FAQSection = () => (
  <section id="faq" className="py-20 px-4 bg-muted/30">
    <div className="container mx-auto max-w-3xl">
      <div className="text-center mb-12">
        <p className="font-section text-secondary text-xs uppercase tracking-[0.3em] mb-2">Have Questions?</p>
        <h2 className="font-heading text-h2 font-bold">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-lg px-6">
            <AccordionTrigger className="font-section font-medium text-sm py-5 hover:no-underline hover:text-primary">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground font-body leading-relaxed pb-5">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
