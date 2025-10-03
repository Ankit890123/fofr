import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { whatsappLink, SITE } from "@/lib/site";
import { motion } from "framer-motion";
import { CalendarCheck, Truck, Sparkles, ShieldCheck, Leaf, Droplets, Shirt, Footprints } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Index() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100 via-white to-teal-100" />
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-teal-300/40 blur-3xl animate-pulse" />
        <div className="container mx-auto px-4 pt-16 pb-20 grid gap-10 md:grid-cols-2 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium ring-1 ring-emerald-200">
              {t("home.badge")}
            </div>
            <motion.h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight" variants={fadeUp} transition={{ delay: 0.1 }}>
              {t("home.title")}
            </motion.h1>
            <motion.p className="mt-4 text-lg text-muted-foreground max-w-xl" variants={fadeUp} transition={{ delay: 0.2 }}>
              {t("home.desc")}
            </motion.p>
            <motion.div className="mt-8 flex flex-wrap items-center gap-3" variants={fadeUp} transition={{ delay: 0.3 }}>
              <Button asChild size="lg">
                <a href={whatsappLink(`Hi ${SITE.name}, I want to place a laundry order.`)} target="_blank" rel="noreferrer">{t("common.orderWhatsApp")}</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/services">{t("common.seeServices")}</a>
              </Button>
            </motion.div>
            <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
              <li>• {t("common.freePickup")}</li>
              <li>• {t("common.ecoFriendly")}</li>
              <li>• {t("common.turnaround")}</li>
            </ul>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-2xl border bg-white shadow-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-emerald-50">
                  <CardContent className="p-4">
                    <div className="text-3xl font-extrabold text-emerald-700">+500</div>
                    <div className="text-xs text-emerald-800/80">{t("home.metrics.washedWeekly")}</div>
                  </CardContent>
                </Card>
                <Card className="bg-teal-50">
                  <CardContent className="p-4">
                    <div className="text-3xl font-extrabold text-teal-700">98%</div>
                    <div className="text-xs text-teal-800/80">{t("home.metrics.onTime")}</div>
                  </CardContent>
                </Card>
                <Card className="bg-cyan-50">
                  <CardContent className="p-4">
                    <div className="text-3xl font-extrabold text-cyan-700">24h</div>
                    <div className="text-xs text-cyan-800/80">{t("home.metrics.expressOption")}</div>
                  </CardContent>
                </Card>
                <Card className="bg-sky-50">
                  <CardContent className="p-4">
                    <div className="text-3xl font-extrabold text-sky-700">4.9★</div>
                    <div className="text-xs text-sky-800/80">{t("home.metrics.rating")}</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center">{t("home.how.title")}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[{ Icon: CalendarCheck, key: "s1" }, { Icon: Droplets, key: "s2" }, { Icon: Truck, key: "s3" }].map(({ Icon, key }, i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="h-11 w-11 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-4 font-semibold text-lg">{t(`home.how.${key}.t`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`home.how.${key}.d`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center">{t("home.why.title")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[{ Icon: Leaf, key: "eco" }, { Icon: ShieldCheck, key: "trust" }, { Icon: Sparkles, key: "finish" }, { Icon: Truck, key: "door" }].map(({ Icon, key }, i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto h-11 w-11 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-4 font-semibold">{t(`home.why.${key}.t`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`home.why.${key}.d`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("home.popular")}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[{ Icon: Shirt, name: "Laundry" }, { Icon: Droplets, name: "Dry Cleaning" }, { Icon: Sparkles, name: "Ironing" }, { Icon: Footprints, name: "Footwear Care" }].map(({ Icon, name }, i) => (
                  <motion.a key={name} href="/services" whileHover={{ scale: 1.03 }} className="rounded-lg border p-4 hover:shadow-sm">
                    <div className="h-9 w-9 rounded-md bg-emerald-100 text-emerald-700 grid place-items-center"><Icon className="h-5 w-5" /></div>
                    <div className="mt-2 text-sm font-medium">{name}</div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("home.faq")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>Pickup and delivery charges?</AccordionTrigger>
                    <AccordionContent>Pickup and delivery are free within our service area.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>How fast is express?</AccordionTrigger>
                    <AccordionContent>Express service delivers within 24 hours for eligible items.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>Do you clean shoes?</AccordionTrigger>
                    <AccordionContent>Yes — sneaker cleaning, deep clean, polish, and leather care.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border bg-gradient-to-r from-emerald-50 to-teal-50 p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold">{t("home.cta.title")}</h3>
            <p className="mt-2 text-muted-foreground">{t("home.cta.desc")}</p>
            <div className="mt-4">
              <Button asChild size="lg">
                <a href={whatsappLink(`Hi ${SITE.name}, please schedule a pickup for me.`)} target="_blank" rel="noreferrer">{t("common.bookWhatsApp")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
