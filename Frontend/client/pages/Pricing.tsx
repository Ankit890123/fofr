import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MEN_RATES, WOMEN_RATES, HOUSEHOLD_RATES, FOOTWEAR_RATES, PACKAGES } from "@/lib/pricing";
import { fetchPricing, type PricingResponse } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

function RatesTable({ data, labels }: { data: { item: string; washFold?: number; dryClean?: number; iron?: number; steamIron?: number }[]; labels?: { c1: string; c2: string; c3: string; c4?: string } }) {
  const l = labels ?? { c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing" };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>{l.c1}</TableHead>
          <TableHead>{l.c2}</TableHead>
          <TableHead>{l.c3}</TableHead>
          {l.c4 ? <TableHead>{l.c4}</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((r) => (
          <TableRow key={r.item}>
            <TableCell className="font-medium">{r.item}</TableCell>
            <TableCell>{r.washFold ? `₹${r.washFold}` : "-"}</TableCell>
            <TableCell>{r.dryClean ? `₹${r.dryClean}` : "-"}</TableCell>
            <TableCell>{r.iron ? `₹${r.iron}` : "-"}</TableCell>
            {l.c4 ? <TableCell>{r.steamIron ? `₹${r.steamIron}` : "-"}</TableCell> : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Pricing() {
  const { t } = useI18n();
  const { data } = useQuery<PricingResponse>({
    queryKey: ["pricing"],
    queryFn: () => fetchPricing(),
    staleTime: 5 * 60 * 1000,
  });
  const men = data?.men ?? MEN_RATES;
  const women = data?.women ?? WOMEN_RATES;
  const household = data?.household ?? HOUSEHOLD_RATES;
  const footwear = data?.footwear ?? FOOTWEAR_RATES;
  const packages = data?.packages ?? PACKAGES;
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t("pricing.title")}</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.intro")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("pricing.itemRates")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="men">
                  <TabsList>
                    <TabsTrigger value="men">{t("pricing.tabs.men")}</TabsTrigger>
                    <TabsTrigger value="women">{t("pricing.tabs.women")}</TabsTrigger>
                    <TabsTrigger value="household">{t("pricing.tabs.household")}</TabsTrigger>
                    <TabsTrigger value="footwear">{t("pricing.tabs.footwear")}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="men" className="mt-4">
                    <RatesTable data={men} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                  </TabsContent>
                  <TabsContent value="women" className="mt-4">
                    <RatesTable data={women} labels={{ c1: "Wash & Fold", c2: "Dry Clean", c3: "Ironing", c4: "Steam Iron" }} />
                  </TabsContent>
                  <TabsContent value="household" className="mt-4">
                    <RatesTable data={household} />
                  </TabsContent>
                  <TabsContent value="footwear" className="mt-4">
                    <RatesTable data={footwear} labels={{ c1: "Cleaning", c2: "Deep Clean", c3: "Polish" }} />
                  </TabsContent>
                </Tabs>
                <p className="mt-3 text-xs text-muted-foreground">{t("pricing.note")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {packages.map((p) => (
              <Card key={p.name}>
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span>{p.name}</span>
                    <span className="text-emerald-700">₹{p.price}/mo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{t("pricing.planMeta.upTo")} {p.garments} {t("pricing.planMeta.garments")} • {p.turnaround} {t("pricing.planMeta.turnaround")}</div>
                  <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Button asChild className="mt-4 w-full">
                    <a
                      href={whatsappLink(`I'd like the ${p.name} plan (up to ${p.garments} garments).`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Choose on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <a href={whatsappLink("Hi, I have a custom pricing question.")} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
