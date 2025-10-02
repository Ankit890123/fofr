import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { Droplets, Sparkles, Shirt, Footprints, Home, Clock } from "lucide-react";

const categories = [
  {
    title: "Laundry",
    desc: "Everyday clothes care with premium detergents.",
    Icon: Shirt,
    types: [
      "Wash & Fold",
      "Wash & Iron",
      "Premium Care (delicates)",
      "Stain Treatment",
      "Express 24–48h",
    ],
  },
  {
    title: "Dry Cleaning",
    desc: "Delicate fabric care handled by experts.",
    Icon: Droplets,
    types: [
      "Suits & Blazers",
      "Saree / Silk / Velvet",
      "Wool / Cashmere",
      "Gowns & Formal Wear",
      "Curtains (dry clean)",
    ],
  },
  {
    title: "Ironing / Pressing",
    desc: "Crisp finish with careful steam pressing.",
    Icon: Sparkles,
    types: ["Steam Iron", "Light Starch", "Heavy Starch", "On-hanger / Folded"],
  },
  {
    title: "Footwear Care",
    desc: "Professional shoe cleaning and restoration.",
    Icon: Footprints,
    types: [
      "Sneaker Cleaning",
      "Deep Clean",
      "Sole Whitening",
      "Leather Conditioning & Polish",
      "Suede/Nubuck Care",
    ],
  },
  {
    title: "Household",
    desc: "Keep your home fabrics fresh and clean.",
    Icon: Home,
    types: [
      "Bedsheets (Single/Double)",
      "Blankets & Quilts",
      "Curtains",
      "Sofa Covers",
      "Pillows & Cushions",
    ],
  },
  {
    title: "Add-ons",
    desc: "Flexible options for busy schedules.",
    Icon: Clock,
    types: ["Express Pickup", "Same-day Express (select items)", "Packaging on request"],
  },
];

export default function Services() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Services</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Laundry, Dry Cleaning, Ironing, Footwear care, and Household cleaning — sab types available.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, desc, Icon, types }) => (
            <div key={title} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="h-11 w-11 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <ul className="mt-4 text-sm space-y-1 list-disc pl-5">
                {types.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <a href={whatsappLink("Hi, I want to book a service.")} target="_blank" rel="noreferrer">
              Book on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
