"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export function RestoreAccessForm() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/access/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = (await res.json()) as {
        error?: string;
        access?: { premium: boolean; pdf: boolean };
      };
      if (!res.ok) throw new Error(data.error ?? "Restore failed");
      setStatus("ok");
      const bits: string[] = [];
      if (data.access?.premium) bits.push("full question bank");
      if (data.access?.pdf) bits.push("Texas law cheat sheet");
      setMessage(
        bits.length
          ? `Restored: ${bits.join(" + ")}. You can practice on this device now.`
          : "Access restored.",
      );
      try {
        window.localStorage.setItem("tip_access_code", code.trim());
      } catch {
        /* ignore */
      }
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not restore");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3">
      <label className="text-sm text-[var(--ink-muted)]" htmlFor="access-code">
        Paste your TIP.… access code
      </label>
      <input
        id="access-code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="TIP.xxxxx.xxxxx"
        className="w-full border border-[var(--line)] bg-white px-3 py-2 font-mono text-sm text-[var(--ink)] outline-none focus:border-[var(--navy)]"
        autoComplete="off"
        spellCheck={false}
        required
      />
      <button
        type="submit"
        className="btn-primary justify-self-start"
        disabled={status === "loading" || !code.trim()}
      >
        {status === "loading" ? "Restoring…" : "Restore access"}
      </button>
      {message && (
        <p
          className={
            status === "error"
              ? "text-sm text-[var(--fail)]"
              : "text-sm text-[var(--pass)]"
          }
        >
          {message}
        </p>
      )}
      {status === "ok" && (
        <div className="flex flex-wrap gap-3">
          <Link href="/practice/tx-life-health" className="btn-secondary">
            Practice
          </Link>
          <Link href="/guide/texas-law" className="btn-ghost">
            Texas law sheet
          </Link>
        </div>
      )}
    </form>
  );
}
