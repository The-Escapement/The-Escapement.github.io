import { useState } from "preact/hooks";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import emailjs from "@emailjs/browser";
import css from "./subscribe.css.ts";

type FormValues = {
  fullName: string;
  email: string;
};

export default function Subscribe() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      fullName: "",
      email: "",
    },
    validate: {
      fullName(value) {
        return value.trim().length === 0 ? "Please enter your name" : null;
      },
      email(value) {
        if (value.trim().length === 0) return "Please enter your email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please provide a valid email";
        return null;
      },
    },
    validateInputOnChange: ["fullName", "email"],
    validateInputOnBlur: ["fullName", "email"],
  });

  const handleSubmit = async (values: FormValues) => {
    if (!values.fullName.trim() || !values.email.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "default_service",
        "template_52c7x7l",
        {
          name: values.fullName.trim(),
          email: values.email.trim(),
        },
        {
          publicKey: "zmPgTLf8Ez28MtmHD",
        },
      );

      console.log("SUCCESS!");
      setIsSubmitted(true);

      // Reset form after success
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
      }, 3000);
    } catch (error: unknown) {
      console.log(
        "FAILED...",
        error instanceof Error ? error.message : String(error),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <box-l borderWidth="var(--size-1)">
        <stack-l>
          <h3>Thank you for subscribing!</h3>
          <p>We'll notify you as soon as we're live.</p>
        </stack-l>
      </box-l>
    );
  }

  return (
    <stack-l>
      <p>Be the first to know when we're live...</p>
      <form className={css.form} onSubmit={form.onSubmit(handleSubmit)}>
        <stack-l>
          <stack-l>
            <input
              type="text"
              placeholder="Full Name*"
              key={form.key("fullName")}
              {...form.getInputProps("fullName")}
            />
            {form.errors["fullName"] && (
              <div
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {form.errors["fullName"]}
              </div>
            )}
          </stack-l>
          <stack-l>
            <input
              type="email"
              placeholder="Email*"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            {form.errors["email"] && (
              <div
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {form.errors["email"]}
              </div>
            )}
          </stack-l>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !form.isValid() ||
              form.values.fullName.trim() === "" ||
              form.values.email.trim() === ""
            }
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </stack-l>
      </form>
    </stack-l>
  );
}
