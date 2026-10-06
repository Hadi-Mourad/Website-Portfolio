"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eraser, RotateCcw, Timer, Trophy } from "lucide-react";

const SIZE = 6;
const BOX_ROWS = 2;
const BOX_COLS = 3;

const PUZZLE: number[][] = [
  [1, 0, 0, 4, 0, 6],
  [0, 5, 0, 0, 2, 0],
  [2, 0, 1, 0, 0, 4],
  [5, 0, 0, 2, 0, 1],
  [0, 1, 0, 0, 4, 0],
  [6, 0, 5, 3, 0, 0],
];

type Cell = { r: number; c: number };

const sameBox = (a: Cell, b: Cell) =>
  Math.floor(a.r / BOX_ROWS) === Math.floor(b.r / BOX_ROWS) &&
  Math.floor(a.c / BOX_COLS) === Math.floor(b.c / BOX_COLS);

function findConflicts(grid: number[][]) {
  const conflicts = new Set<string>();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = grid[r][c];
      if (!v) continue;
      for (let r2 = 0; r2 < SIZE; r2++) {
        for (let c2 = 0; c2 < SIZE; c2++) {
          if (r === r2 && c === c2) continue;
          if (grid[r2][c2] !== v) continue;
          if (r === r2 || c === c2 || sameBox({ r, c }, { r: r2, c: c2 })) {
            conflicts.add(`${r}-${c}`);
          }
        }
      }
    }
  }
  return conflicts;
}

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function SudokuPuzzle() {
  const [grid, setGrid] = useState(() => PUZZLE.map((row) => [...row]));
  const [selected, setSelected] = useState<Cell | null>(null);
  const [seconds, setSeconds] = useState(0);
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const conflicts = useMemo(() => findConflicts(grid), [grid]);
  const solved = conflicts.size === 0 && grid.every((row) => row.every(Boolean));

  useEffect(() => {
    if (solved) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [solved]);

  const isGiven = (r: number, c: number) => PUZZLE[r][c] !== 0;

  const setValue = (value: number) => {
    if (!selected || solved || isGiven(selected.r, selected.c)) return;
    setGrid((prev) =>
      prev.map((row, r) =>
        row.map((v, c) => (r === selected.r && c === selected.c ? value : v)),
      ),
    );
  };

  const focusCell = (r: number, c: number) => {
    setSelected({ r, c });
    cellRefs.current[r * SIZE + c]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, r: number, c: number) => {
    const moves: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    if (moves[event.key]) {
      event.preventDefault();
      const [dr, dc] = moves[event.key];
      focusCell((r + dr + SIZE) % SIZE, (c + dc + SIZE) % SIZE);
    } else if (/^[1-6]$/.test(event.key)) {
      setValue(Number(event.key));
    } else if (["Backspace", "Delete", "0"].includes(event.key)) {
      setValue(0);
    }
  };

  const reset = () => {
    setGrid(PUZZLE.map((row) => [...row]));
    setSelected(null);
    setSeconds(0);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
        <span className="inline-flex items-center gap-1.5 font-mono">
          <Timer className="h-4 w-4" />
          {formatTime(seconds)}
        </span>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-900"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <div
        role="grid"
        aria-label="6 by 6 Sudoku puzzle"
        className="grid grid-cols-6 overflow-hidden rounded-xl border-2 border-slate-900 bg-white"
      >
        {grid.map((row, r) =>
          row.map((value, c) => {
            const given = isGiven(r, c);
            const isSelected = selected?.r === r && selected?.c === c;
            const related =
              selected && !isSelected &&
              (selected.r === r || selected.c === c || sameBox(selected, { r, c }));
            const sameValue = selected && value !== 0 && grid[selected.r][selected.c] === value;
            const conflict = conflicts.has(`${r}-${c}`);

            const borders = [
              c % BOX_COLS === BOX_COLS - 1 && c !== SIZE - 1 ? "border-r-2 border-r-slate-900" : c !== SIZE - 1 ? "border-r border-r-slate-200" : "",
              r % BOX_ROWS === BOX_ROWS - 1 && r !== SIZE - 1 ? "border-b-2 border-b-slate-900" : r !== SIZE - 1 ? "border-b border-b-slate-200" : "",
            ].join(" ");

            const background = solved
              ? "bg-emerald-50"
              : isSelected
                ? "bg-blue-100"
                : sameValue
                  ? "bg-blue-50"
                  : related
                    ? "bg-slate-50"
                    : "bg-white";

            const text = conflict
              ? "text-red-600"
              : given
                ? "text-slate-900 font-semibold"
                : "text-blue-600 font-medium";

            return (
              <button
                key={`${r}-${c}`}
                ref={(el) => {
                  cellRefs.current[r * SIZE + c] = el;
                }}
                type="button"
                role="gridcell"
                aria-label={`Row ${r + 1}, column ${c + 1}${value ? `, ${value}` : ", empty"}${given ? " (given)" : ""}`}
                onClick={() => setSelected({ r, c })}
                onFocus={() => setSelected({ r, c })}
                onKeyDown={(e) => handleKeyDown(e, r, c)}
                className={`flex aspect-square items-center justify-center text-xl outline-none transition-colors sm:text-2xl ${borders} ${background} ${text}`}
              >
                {value || ""}
              </button>
            );
          }),
        )}
      </div>

      {solved ? (
        <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <Trophy className="mx-auto h-6 w-6 text-emerald-600" />
          <p className="mt-2 font-semibold text-slate-900">Solved in {formatTime(seconds)}</p>
          <p className="mt-1 text-sm text-slate-600">Logic restored. You&apos;ve earned your way home.</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValue(n)}
              className="aspect-square rounded-lg border border-slate-200 bg-white text-lg font-medium text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setValue(0)}
            aria-label="Erase"
            className="flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            <Eraser className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
