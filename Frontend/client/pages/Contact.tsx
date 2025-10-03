import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { whatsappLink, SITE } from "@/lib/site";
import { submitContact } from "@shared/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Schema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z
    .string()
    .min(10, "Enter valid phone")
    .regex(/^\+?\d[\d\s-]{8,}$/i, "Enter valid phone"),
  email: z.string().email().optional().or(z.literal("")),
  service: z.enum(["Laundry", "Dry Cleaning", "Ironing", "Other"]),
  address: z.string().min(6, "Enter address"),
  message: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof Schema>;

export default function Contact() {
  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "Laundry",
      address: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await submitContact({
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        service: values.service,
        address: values.address,
        message: values.message || undefined,
      });
      toast({ title: "Request received", description: "We will reach out shortly." });
      // Optional: still open WhatsApp for instant chat
      const text = `New enquiry for ${values.service}%0AName: ${values.name}%0APhone: ${values.phone}%0AEmail: ${values.email || "-"}%0AAddress: ${values.address}%0AMessage: ${values.message || "-"}`;
      const url = whatsappLink(text);
      window.open(url, "_blank", "noopener,noreferrer");
      form.reset();
    } catch (e: any) {
      toast({ title: "Submission failed", description: e?.message ?? "Please try again." });
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Fill the form to book a pickup or ask anything. You can also reach us directly on WhatsApp.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98xxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Laundry">Laundry (Wash & Fold)</SelectItem>
                                <SelectItem value="Dry Cleaning">Dry Cleaning</SelectItem>
                                <SelectItem value="Ironing">Ironing/Pressing</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="House/Flat, Street, Area, City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any specific instructions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button type="submit" className="min-w-40">Send via WhatsApp</Button>
                    <Button asChild variant="outline">
                      <a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer">Open WhatsApp</a>
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visit or call us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">Address</div>
                  <p className="text-muted-foreground">Add your business address here for customers to visit or for pickup. Share it and I’ll update this section.</p>
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <a className="text-primary hover:underline" href={`tel:${SITE.phoneDisplay}`}>{SITE.phoneDisplay}</a>
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <a className="text-primary hover:underline" href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer">Chat now</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
