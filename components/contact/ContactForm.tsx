"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/useLang";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const DEST_EMAIL = "contact@appconsultancy.com";

export function ContactForm() {
  const { t } = useLang();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = t("contact.form.name_required");
    if (!formData.email.trim()) {
      errs.email = t("contact.form.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = t("contact.form.email_invalid");
    }
    if (!formData.message.trim()) errs.message = t("contact.form.message_required");
    return errs;
  }

  function handleChange(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSubmitted(false);
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitError(null);
    const subject = encodeURIComponent(
      t("contact.form.email_subject").replace("{name}", formData.name)
    );
    const body = encodeURIComponent(
      `${t("contact.form.name")}: ${formData.name}\n${t("contact.form.email")}: ${formData.email}\n${t("contact.form.phone")}: ${formData.phone}\n\n${t("contact.form.message")}:\n${formData.message}`
    );
    try {
      window.location.href = `mailto:${DEST_EMAIL}?subject=${subject}&body=${body}`;
    } catch {
      setSubmitError(t("contact.form.error_opening_email"));
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <label htmlFor="contact-name" className="sr-only">
          {t("contact.form.name")}
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder={t("contact.form.name")}
          value={formData.name}
          onChange={handleChange("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-secondary-400"
          required
        />
        {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs text-red-300">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          {t("contact.form.email")}
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder={t("contact.form.email")}
          value={formData.email}
          onChange={handleChange("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-secondary-400"
          required
        />
        {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-300">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-phone" className="sr-only">
          {t("contact.form.phone")}
        </label>
        <input
          id="contact-phone"
          type="tel"
          placeholder={`${t("contact.form.phone")} ${t("contact.form.phone_optional")}`}
          value={formData.phone}
          onChange={handleChange("phone")}
          className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-secondary-400"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          {t("contact.form.message")}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder={t("contact.form.message")}
          value={formData.message}
          onChange={handleChange("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          maxLength={2000}
          className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-secondary-400"
          required
        />
        {errors.message && <p id="message-error" role="alert" className="mt-1 text-xs text-red-300">{errors.message}</p>}
      </div>

      {submitted && (
        <p className="text-sm text-green-300">{t("contact.form.success")}</p>
      )}
      {submitError && (
        <p className="text-sm text-red-300" role="alert">{submitError}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-secondary-400 px-6 py-3 text-sm font-semibold text-primary-900 transition-colors hover:bg-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400"
      >
        {t("contact.form.submit")}
      </button>
    </form>
  );
}
