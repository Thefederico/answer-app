/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-8">
      <Link href="/" className="flex items-center text-6xl">
        Eva
        <img src="/brain.png" alt="Brain" width={50} />
      </Link>
    </header>
  );
}
