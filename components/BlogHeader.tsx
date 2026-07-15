import Link from "next/link";
import Image from "next/image";
import LangToggle from "./LangToggle";

export default function BlogHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/logo.png" alt="La Fabrik Numérique" width={32} height={32} />
          <span className="font-display text-sm tracking-widest uppercase">
            La Fabrik Numérique
          </span>
        </Link>
        <LangToggle />
      </div>
    </header>
  );
}
