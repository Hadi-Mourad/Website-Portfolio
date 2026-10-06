import { ArrowUp } from "lucide-react";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-500 sm:flex-row">
        <p>© 2026 Hadi Mourad · Built with Next.js and Tailwind CSS</p>
        <a
          href="#home"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-900"
        >
          Back to top
          <ArrowUp className="h-4 w-4" />
        </a>
      </Container>
    </footer>
  );
}
