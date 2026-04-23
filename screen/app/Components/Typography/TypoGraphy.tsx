import { cn } from "@/app/utils/cn";
import { FC, HTMLAttributes, memo } from "react";


export type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";

interface BaseTypographyProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  weight?: FontWeight;
  color?: string; // e.g. 'text-primary', 'text-gray-700'
}




// Map font weights to Tailwind classes
const weightMap: Record<FontWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};










// ----------------------
// Heading Component
// ----------------------
interface HeadingProps extends BaseTypographyProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: string; // optional Tailwind size override e.g., 'text-3xl'
}

export const Heading: FC<HeadingProps> = memo(({
  as = "h1",
  size,
  weight = "bold",
  color = "text-black",
  className,
  children,
  ...props
}) => {
  const Tag = as;
  return (
    <Tag
      className={cn(size ?? "text-2xl", weightMap[weight], color, className)}
      {...props}
    >
      {children}
    </Tag>
  );
});







// ----------------------
// Paragraph Component
// ----------------------
interface ParagraphProps extends BaseTypographyProps {
  size?: string; // e.g., 'text-base', 'text-sm'
}

export const Paragraph: FC<ParagraphProps> = memo(({
  size = "text-base",
  weight = "normal",
  color = "text-gray-800",
  className,
  children,
  ...props
}) => {
  return (
    <p className={cn(size, weightMap[weight], color, className)} {...props}>
      {children}
    </p>
  );
});








// ----------------------
// Label Component
// ----------------------
interface LabelProps extends BaseTypographyProps { }

export const Label: FC<LabelProps> = memo(({
  weight = "medium",
  color = "text-gray-700",
  className,
  children,
  ...props
}) => {
  return (
    <label className={cn("text-sm", weightMap[weight], color, className)} {...props}>
      {children}
    </label>
  );
});







// ----------------------
// Span Component
// ----------------------
interface SpanProps extends BaseTypographyProps { }

export const Span: FC<SpanProps> = memo(({
  weight = "normal",
  color = "text-gray-800",
  className,
  children,
  ...props
}) => {
  return (
    <span className={cn(weightMap[weight], color, className)} {...props}>
      {children}
    </span>
  );
});
