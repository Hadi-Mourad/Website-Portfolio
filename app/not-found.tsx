import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SudokuPuzzle from "@/components/SudokuPuzzle";

export const metadata = {
  title: "404 · Lost in the grid · Hadi Mourad",
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center py-16">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 px-6 sm:px-8 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-mono text-sm font-medium text-blue-600">Error 404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Lost in the grid.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
            This page doesn&apos;t exist, but logic always does. Fill the grid so every
            row, column, and 2×3 box contains the digits 1 to 6.
          </p>
          <ul className="mt-6 space-y-1.5 text-sm text-slate-500">
            <li>Click a cell, then type a number or use the pad.</li>
            <li>Arrow keys move between cells; Backspace clears.</li>
            <li>Conflicts turn <span className="font-medium text-red-600">red</span>.</li>
          </ul>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Skip the puzzle, take me home
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <SudokuPuzzle />
        </div>
      </div>
    </main>
  );
}
