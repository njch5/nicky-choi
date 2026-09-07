import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 bg-white/90 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-6">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            aria-hidden
            src="/home.svg"
            alt="Home icon"
            width={16}
            height={16}
          />
          Home
        </Link>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/nickyjchoi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="LinkedIn icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/blog"
        >
          <Image
            aria-hidden
            src="/blog-48.png"
            alt="Blog icon"
            width={16}
            height={16}
          />
          Blog
        </Link>
      </div>
    </footer>
  );
}
