export type ItemRate = {
  item: string;
  washFold?: number;
  dryClean?: number;
  iron?: number;
  steamIron?: number;
};

export const MEN_RATES: ItemRate[] = [
  { item: "Shirt", washFold: 30, dryClean: 80, iron: 10, steamIron: 15 },
  { item: "Trousers", washFold: 35, dryClean: 90, iron: 12, steamIron: 18 },
  { item: "T-shirt", washFold: 25, dryClean: 70, iron: 8, steamIron: 12 },
  { item: "Jeans", washFold: 40, dryClean: 110, iron: 12, steamIron: 18 },
  { item: "Kurta", washFold: 35, dryClean: 100, iron: 12, steamIron: 18 },
];

export const WOMEN_RATES: ItemRate[] = [
  { item: "Top/Blouse", washFold: 30, dryClean: 85, iron: 10, steamIron: 15 },
  { item: "Leggings/Bottoms", washFold: 30, dryClean: 85, iron: 10, steamIron: 15 },
  { item: "Dress", washFold: 60, dryClean: 150, iron: 20, steamIron: 30 },
  { item: "Kurti", washFold: 35, dryClean: 100, iron: 12, steamIron: 18 },
  { item: "Saree", washFold: 80, dryClean: 180, iron: 25, steamIron: 35 },
];

export const HOUSEHOLD_RATES: ItemRate[] = [
  { item: "Bedsheet (Single)", washFold: 60, dryClean: 140, iron: 20 },
  { item: "Bedsheet (Double)", washFold: 80, dryClean: 160, iron: 25 },
  { item: "Blanket", washFold: 120, dryClean: 220 },
];

export const FOOTWEAR_RATES: ItemRate[] = [
  { item: "Sneakers", washFold: 250, dryClean: 500, iron: 150 }, // Clean, Deep Clean, Polish
  { item: "Leather Shoes", washFold: 300, dryClean: 550, iron: 200 },
  { item: "Heels", washFold: 280, dryClean: 520, iron: 180 },
  { item: "Sports Shoes", washFold: 260, dryClean: 520, iron: 150 },
  { item: "Boots", washFold: 350, dryClean: 600, iron: 200 },
];

export type PackagePlan = {
  name: string;
  garments: number;
  turnaround: string;
  price: number; // monthly in INR
  features: string[];
};

export const PACKAGES: PackagePlan[] = [
  {
    name: "Basic",
    garments: 30,
    turnaround: "48h",
    price: 799,
    features: ["Wash & Fold", "Free Pickup/Delivery"],
  },
  {
    name: "Family",
    garments: 60,
    turnaround: "48h",
    price: 1499,
    features: ["Wash & Fold", "Free Pickup/Delivery", "Priority Support"],
  },
  {
    name: "Premium",
    garments: 100,
    turnaround: "24h",
    price: 2299,
    features: ["Wash & Fold", "Ironing Included", "Express Pickup"],
  },
];
