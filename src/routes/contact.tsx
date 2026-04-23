import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { InteractiveOHeading } from "@/components/InteractiveOHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, Phone, MapPin, Instagram, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Soujanya Hegde" },
      { name: "description", content: "Book Soujanya Hegde for your wedding, corporate event, or stage hosting. Based in Mangalore — available across India." },
      { property: "og:title", content: "Contact — Soujanya Hegde" },
      { property: "og:description", content: "Book Soujanya Hegde for your event. Based in Mangalore." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});
type Vals = z.infer<typeof schema>;

const WHATSAPP = "919999999999";
const EMAIL = "hello@soujanyahegde.com";
const PHONE = "+91 99999 99999";

function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Vals>({
    resolver: zodResolver(schema as any) as any,
  });

  const onSubmit = async (v: Vals) => {
    const { error } = await supabase.from("contact_messages").insert({
      name: v.name, email: v.email,
      phone: v.phone || null, subject: v.subject || null, message: v.message,
    });
    if (error) { toast.error("Could not send. Try again."); return; }
    toast.success("Message sent! I'll get back to you soon.");
    reset();
  };

  return (
    <div className="py-20 px-6 lg:px-10 bg-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[oklch(0.78_0.13_80)]/15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Let's create something beautiful</p>
          <div className="mt-4">
            <InteractiveOHeading
              word="CONTACT"
              panel={
                <div>
                  <h3 className="font-display text-3xl mb-4">Reach Me Directly</h3>
                  <ul className="space-y-3 text-base text-left max-w-sm mx-auto">
                    <li className="flex items-center gap-3"><Phone className="h-4 w-4" /> {PHONE}</li>
                    <li className="flex items-center gap-3"><Mail className="h-4 w-4" /> {EMAIL}</li>
                    <li className="flex items-center gap-3"><MapPin className="h-4 w-4" /> Mangalore, India</li>
                    <li className="flex items-center gap-3"><Instagram className="h-4 w-4" /> @soujanyahegde</li>
                  </ul>
                </div>
              }
            />
          </div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to elevate your event? Whether it's a wedding, corporate gathering, or special celebration — I'm here to make it memorable.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-3xl bg-card border border-border shadow-soft space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" {...register("email")} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input {...register("phone")} />
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input {...register("subject")} />
                </div>
              </div>
              <div>
                <Label>Message *</Label>
                <Textarea rows={5} {...register("message")} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-primary text-primary-foreground rounded-full h-12 shadow-elegant">
                <Send className="mr-2 h-4 w-4" /> {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-2 space-y-4">
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%20Soujanya%2C%20I%27d%20like%20to%20book%20you%20for%20my%20event.`}
              target="_blank" rel="noreferrer"
              className="block p-6 rounded-3xl bg-gradient-primary text-primary-foreground shadow-elegant hover-lift"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white/20 grid place-items-center">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold">WhatsApp Now</p>
                  <p className="text-sm opacity-90">Quick replies, real conversations</p>
                </div>
              </div>
            </a>

            <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
              <Info icon={Phone} label="Phone" value={PHONE} />
              <Info icon={Mail} label="Email" value={EMAIL} />
              <Info icon={MapPin} label="Location" value="Mangalore, India" />
            </div>

            <div className="rounded-3xl overflow-hidden border border-border h-48 bg-cream relative">
              <iframe
                title="Mangalore"
                className="absolute inset-0 w-full h-full"
                src="https://www.google.com/maps?q=Mangalore&output=embed"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
