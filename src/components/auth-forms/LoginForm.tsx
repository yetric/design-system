"use client";

import * as React from "react";

import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Label } from "../label/Label";
import { cn } from "../../lib/cn";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  onForgotPassword?: () => void;
  onSignupClick?: () => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateLoginValues = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {};

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

const hasErrors = (errors: LoginFormErrors) => Object.values(errors).some(Boolean);

const LoginForm = ({
  onSubmit,
  onForgotPassword,
  onSignupClick,
  loading = false,
  error,
  className,
}: LoginFormProps) => {
  const [values, setValues] = React.useState<LoginFormValues>({ email: "", password: "" });
  const [errors, setErrors] = React.useState<LoginFormErrors>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof LoginFormValues, boolean>>>({});
  const baseId = React.useId();

  const emailId = `${baseId}-email`;
  const passwordId = `${baseId}-password`;
  const emailErrorId = `${emailId}-error`;
  const passwordErrorId = `${passwordId}-error`;

  const updateField =
    (field: keyof LoginFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValues = { ...values, [field]: event.target.value };
      setValues(nextValues);

      if (touched[field] || errors[field]) {
        setErrors(validateLoginValues(nextValues));
      }
    };

  const handleBlur = (field: keyof LoginFormValues) => () => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validateLoginValues(values));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateLoginValues(values);
    setTouched({ email: true, password: true });
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
          className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </div>
      )}

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
          <p id={emailErrorId} role="alert" className="text-sm text-destructive">
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
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={loading}
          error={Boolean(errors.password)}
          aria-describedby={errors.password ? passwordErrorId : undefined}
        />
        {errors.password && (
          <p id={passwordErrorId} role="alert" className="text-sm text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      <Button type="submit" fullWidth isLoading={loading} loadingText="Logging in">
        Log in
      </Button>

      {(onForgotPassword || onSignupClick) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {onForgotPassword ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onForgotPassword}
              disabled={loading}
            >
              Forgot password?
            </Button>
          ) : (
            <span />
          )}
          {onSignupClick && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onSignupClick}
              disabled={loading}
            >
              Create account
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

LoginForm.displayName = "LoginForm";

export { LoginForm };
