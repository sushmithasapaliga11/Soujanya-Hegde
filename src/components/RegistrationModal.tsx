import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const COMPETITIONS = [
  "Crawling Competition",
  "Tricycle Race",
  "Fancy Dress",
  "Drawing Competition",
  "Little Prince & Princess Contest",
  "Robotics Contest",
  "Quiz Contest",
  "Twin Show",
  "Marathon",
] as const;

const schema = z.object({
  parent_name: z.string().trim().min(2, "Parent name required").max(100),
  child_name: z.string().trim().min(1, "Child name required").max(100),
  child_age: z.number().min(0).max(18),
  category: z.string().min(1, "Select a category"),
  phone: z.string().trim().min(7, "Phone required").max(20).regex(/^[+\d\s-]+$/, "Invalid phone"),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

type FormVals = z.infer<typeof schema>;

export function RegistrationModal({
  open,
  onOpenChange,
  defaultCategory,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultCategory?: (typeof COMPETITIONS)[number];
}) {
  const [done, setDone] = useState(false);
  const {
    register, handleSubmit, formState: { errors, isSubmitting }, reset,
  } = useForm<FormVals>({
    resolver: zodResolver(schema) as any,
    defaultValues: { category: defaultCategory ?? COMPETITIONS[0], child_age: 1 },
  });

  const onSubmit = async (values: FormVals) => {
    const { error } = await supabase.from("kidfest_registrations").insert({
      parent_name: values.parent_name,
      child_name: values.child_name,
      child_age: values.child_age,
      category: values.category,
      phone: values.phone,
      email: values.email || null,
      city: values.city || null,
      notes: values.notes || null,
    });
    if (error) {
      toast.error("Registration failed. Please try again.");
      return;
    }
    setDone(true);
    toast.success("You're registered! See you at Kidfest 🎉");
  };

  const close = () => {
    onOpenChange(false);
    setTimeout(() => { setDone(false); reset(); }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(v) : close())}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        {!done ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Kidfest Registration
              </DialogTitle>
              <DialogDescription>
                May 16 & 17, 2026 · Palemar Convention Centre, Mangalore
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Parent's Name *</Label>
                  <Input {...register("parent_name")} />
                  {errors.parent_name && <p className="text-xs text-destructive mt-1">{errors.parent_name.message}</p>}
                </div>
                <div>
                  <Label>Child's Name *</Label>
                  <Input {...register("child_name")} />
                  {errors.child_name && <p className="text-xs text-destructive mt-1">{errors.child_name.message}</p>}
                </div>
                <div>
                  <Label>Child's Age *</Label>
                  <Input type="number" min={0} max={18} {...register("child_age", { valueAsNumber: true })} />
                  {errors.child_age && <p className="text-xs text-destructive mt-1">{errors.child_age.message}</p>}
                </div>
                <div>
                  <Label>Category *</Label>
                  <select
                    {...register("category")}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    {COMPETITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input placeholder="+91" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...register("email")} />
                </div>
                <div className="sm:col-span-2">
                  <Label>City</Label>
                  <Input {...register("city")} />
                </div>
                <div className="sm:col-span-2">
                  <Label>Notes</Label>
                  <Textarea rows={3} {...register("notes")} />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90"
              >
                {isSubmitting ? "Submitting..." : "Register Now"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Registration fee ₹100 applies for some events. Limited slots — confirmation by phone.
              </p>
            </form>
          </>
        ) : (
          <div className="py-10 text-center animate-scale-in">
            <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
            <h3 className="font-display text-2xl mt-4">You're Registered!</h3>
            <p className="text-muted-foreground mt-2">
              Thank you. We'll reach out shortly with event details.
            </p>
            <Button onClick={close} className="mt-6 bg-gradient-primary text-primary-foreground">Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
