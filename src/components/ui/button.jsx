import React from "react";
import Link from "next/link";

const buttonVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 rounded-md",
  lg: "h-11 px-8 rounded-md",
  icon: "h-10 w-10",
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  href,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];
  
  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className || ""}`;
  
  if (href) {
    return (
      <Link href={href} className={allClasses} {...props} />
    );
  }
  
  return React.createElement(asChild ? React.Fragment : "button", {
    className: allClasses,
    ...props,
  });
}
