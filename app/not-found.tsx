import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex-1 circuit-bg flex items-center justify-center min-h-screen">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <Image
          src="/img/logo.png"
          alt="La Fabrik Numérique"
          width={48}
          height={48}
          className="mx-auto mb-8"
        />
        <p className="fig-label mb-4">FIG. 404 — CIRCUIT OUVERT</p>
        <h1 className="font-display uppercase text-6xl">
          Page <span className="text-cyan">introuvable</span>
        </h1>
        <p className="mt-6 text-muted leading-relaxed">
          Ce nœud n&apos;existe pas ou a été déconnecté du circuit.
          <br />
          <span className="fig-label">This page could not be found.</span>
        </p>
        <Link
          href="/"
          className="fig-label inline-block mt-10 bg-cyan text-background-deep px-6 py-3 hover:bg-amber transition-colors"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
