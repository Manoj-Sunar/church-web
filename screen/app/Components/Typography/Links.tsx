
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import { FC, memo } from "react";

interface LinksProps{
  linkName:string;
  href:string;
  className?:string;
}

const Links: FC<LinksProps> = memo(({ linkName, href, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "text-base transition-colors hover:text-primary",

        className
      )}
    >
      {linkName}
    </Link>
  );
});

export default Links;
