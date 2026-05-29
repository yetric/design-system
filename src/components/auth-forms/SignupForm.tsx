"use client";

import * as React from "react";

import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Label } from "../label/Label";
import { cn } from "../../lib/cn";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

interface SignupFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => void | Promise<void>;
  onLoginClick?: () => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateSignupValues = (values: SignupFormValues): SignupFormErrors => {
  const errors: SignupFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
};

const hasErrors = (errors: SignupFormErrors) => Object.values(errors).some(Boolean);

const SignupForm = ({
  onSubmit,
  onLoginClick,
  loading = false,
  error,
  className,
}: SignupFormProps) => {
  const [values, setValues] = React.useState<SignupFormValues>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<SignupFormErrors>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof SignupFormValues, boolean>>>(
    {}
  );
  const baseId = React.useId();

  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const passwordId = `${baseId}-password`;
  const nameErrorId = `${nameId}-error`;
  const emailErrorId = `${emailId}-error`;
  const passwordErrorId = `${passwordId}-error`;

  const updateField =
    (field: keyof SignupFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValues = { ...values, [field]: event.target.value };
      setValues(nextValues);

      if (touched[field] || errors[field]) {
        setErrors(validateSignupValues(nextValues));
      }
    };

  const handleBlur = (field: keyof SignupFormValues) => () => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validateSignupValues(values));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateSignupValues(values);
    setTouched({ name: true, email: true, password: true });
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    await Promise.resolve(onSubmit(values));
  };

  return (
    <form
      className={cn("flex w-full max-w-sm flex-col gap-5", className)}
      noValidate
      onSubmit={handleSubmit}
    >
      {error && (
        <div
          role="alert"
          className="border-destructive/20 bg-destructive/5 text-destructive rounded-md border px-3 py-2 text-sm"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor={nameId} required>
          Full name
        </Label>
        <Input
          id={nameId}
          value={values.name}
          onChange={updateField("name")}
          onBlur={handleBlur("name")}
          placeholder="Jane Doe"
          autoComplete="name"
          disabled={loading}
          error={Boolean(errors.name)}
          aria-describedby={errors.name ? nameErrorId : undefined}
        />
        {errors.name && (
          <p id={nameErrorId} role="alert" className="text-destructive text-sm">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={emailId} required>
          Email
        </Label>
        <Input
          id={emailId}
          type="email"
          value={values.email}
          onChange={updateField("email")}
          onBlur={handleBlur("email")}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={loading}
          error={Boolean(errors.email)}
          aria-describedby={errors.email ? emailErrorId : undefined}
        />
        {errors.email && (
          <p id={emailErrorId} role="alert" className="text-destructive text-sm">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={passwordId} required>
          Password
        </Label>
        <Input
          id={passwordId}
          type="password"
          value={values.password}
          onChange={updateField("password")}
          onBlur={handleBlur("password")}
          placeholder="Create a password"
          autoComplete="new-password"
          disabled={loading}
          error={Boolean(errors.password)}
          aria-describedby={errors.password ? passwordErrorId : undefined}
        />
        {errors.password && (
          <p id={passwordErrorId} role="alert" className="text-destructive text-sm">
            {errors.password}
          </p>
        )}
      </div>

      <Button type="submit" fullWidth isLoading={loading} loadingText="Creating account">
        Create account
      </Button>

      {onLoginClick && (
        <div className="flex justify-center">
          <Button type="button" variant="ghost" size="sm" onClick={onLoginClick} disabled={loading}>
            Already have an account? Log in
          </Button>
        </div>
      )}
    </form>
  );
};

SignupForm.displayName = "SignupForm";

export { SignupForm };
