import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL as string;
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

// Only letters and spaces
const nameRegex = /^[A-Za-z\s]+$/;
// Only digits
const phoneRegex = /^\d+$/;

const schema = z.object({
  parent_name: z
    .string()
    .trim()
    .min(2, "Parent name is required")
    .max(100)
    .regex(nameRegex, "Only alphabets allowed"),
  child_name: z
    .string()
    .trim()
    .min(1, "Child name is required")
    .max(100)
    .regex(nameRegex, "Only alphabets allowed"),
  child_age: z
    .number()
    .min(0, "Age must be 0 or above")
    .max(18, "Age must be 18 or below"),
  category: z.string().min(1, "Please select a category"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone too long")
    .regex(phoneRegex, "Only digits allowed — no spaces or symbols"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(255),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(80)
    .regex(nameRegex, "Only alphabets allowed"),
});

type FormVals = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-destructive mt-1">
      <AlertCircle className="h-3 w-3 flex-shrink-0" /> {message}
    </p>
  );
}

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
  const [duplicate, setDuplicate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormVals>({
    resolver: zodResolver(schema) as any,
    defaultValues: { category: defaultCategory ?? COMPETITIONS[0], child_age: undefined as any },
  });

  const onSubmit = async (values: FormVals) => {
    setDuplicate(false);
    try {
      const formData = new FormData();
      formData.append("parent_name", values.parent_name);
      formData.append("child_name", values.child_name);
      formData.append("child_age", String(values.child_age));
      formData.append("category", values.category);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("city", values.city);

      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      // no-cors means we can't read the response body.
      // Duplicate detection is handled server-side in Apps Script.
      // We optimistically show success; the sheet won't add a row if duplicate.
      setDone(true);
      toast.success("You're registered! See you at Kidfest 🎉");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const close = () => {
    onOpenChange(false);
    setTimeout(() => {
      setDone(false);
      setDuplicate(false);
      reset();
    }, 300);
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
                May 16 & 17, 2026 ·{" "}
                <a
                  href="https://maps.app.goo.gl/ipia3jdSHg3ct7Hn8"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:opacity-80"
                >
                  Palemar Convention Centre, Mangalore
                </a>
              </DialogDescription>
            </DialogHeader>

            {duplicate && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                You have already registered for this event.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-2" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Parent Name */}
                <div>
                  <Label>Parent's Name </Label>
                  <Input
                    {...register("parent_name")}
                    placeholder="e.g. Ramesh Kumar"
                    className={errors.parent_name ? "border-destructive" : ""}
                  />
                  <FieldError message={errors.parent_name?.message} />
                </div>

                {/* Child Name */}
                <div>
                  <Label>Child's Name </Label>
                  <Input
                    {...register("child_name")}
                    placeholder="e.g. Aryan"
                    className={errors.child_name ? "border-destructive" : ""}
                  />
                  <FieldError message={errors.child_name?.message} />
                </div>

                {/* Child Age */}
                <div>
                  <Label>Child's Age </Label>
                  <Input
                    type="number"
                    min={0}
                    max={18}
                    placeholder="e.g. 5"
                    {...register("child_age", { valueAsNumber: true })}
                    className={errors.child_age ? "border-destructive" : ""}
                  />
                  <FieldError message={errors.child_age?.message} />
                </div>

                {/* Category */}
                <div>
                  <Label>Category </Label>
                  <select
                    {...register("category")}
                    className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm ${errors.category ? "border-destructive" : "border-input"}`}
                  >
                    {COMPETITIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <FieldError message={errors.category?.message} />
                </div>

                {/* Phone */}
                <div>
                  <Label>Phone </Label>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    placeholder="e.g. 9876543210"
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                    onKeyDown={(e) => {
                      // Block non-digit keys (allow backspace, tab, arrows)
                      if (!/^\d$/.test(e.key) && !["Backspace","Tab","ArrowLeft","ArrowRight","Delete"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <FieldError message={errors.phone?.message} />
                </div>

                {/* Email */}
                <div>
                  <Label>Email </Label>
                  <Input
                    type="email"
                    placeholder="e.g. name@email.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                {/* City */}
                <div className="sm:col-span-2">
                  <Label>City *</Label>
                  <Input
                    placeholder="e.g. Mangalore"
                    {...register("city")}
                    className={errors.city ? "border-destructive" : ""}
                  />
                  <FieldError message={errors.city?.message} />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 h-12 text-base"
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
            <Button onClick={close} className="mt-6 bg-gradient-primary text-primary-foreground">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
