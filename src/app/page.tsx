"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import { profile } from "@/lib/profile";

export default function Home() {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://example.com";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Blue header */}
      <div className="bg-blue-500 pt-16 pb-8 flex flex-col items-center text-white">
        <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white/40">
          <Image
            src={profile.photoUrl}
            alt={profile.fullName}
            width={112}
            height={112}
          />
        </div>
        <h1 className="mt-4 text-2xl font-semibold">{profile.fullName}</h1>
        <button
          className="mt-3 bg-white text-gray-900 px-4 py-2 rounded-full shadow hover:bg-gray-100"
          onClick={() => window.location.assign("/api/vcard")}
        >
          + Add contact
        </button>
      </div>

      {/* Info cards */}
      <div className="max-w-md mx-auto px-4 -mt-6 pb-12 space-y-4">
        <Section title="Contact">
          <Field label="Phone" value={profile.phone} href={`tel:${profile.phone}`} />
          <Field label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <Field label="Website" value={profile.website} href={profile.website} />
          <Field
            label="Location"
            value={`${profile.address.street}, ${profile.address.city}, ${profile.address.region}, ${profile.address.postalCode}, ${profile.address.country}`}
          />
        </Section>

        <Section title="Company">
          <Field label="Company" value={profile.company} />
          <Field label="Title" value={profile.title} />
        </Section>

        <Section title="Summary">
          <p className="text-gray-700">{profile.summary}</p>
        </Section>

        <Section title="Social media">
          <Field label="LinkedIn" value="Linkedin" href={profile.linkedin} />
        </Section>

        {/* QR code section */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <QRCode value={origin} size={160} />
          <p className="mt-2 text-sm text-gray-500">Scan to open this card</p>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow">
      <div className="px-4 py-3 border-b">
        <h2 className="font-medium">{title}</h2>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start justify-between">
      <span className="text-gray-500">{label}:</span>
      <span className="ml-3 text-gray-900 break-all">{value}</span>
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block hover:bg-gray-50 rounded-lg px-2 py-2 transition"
    >
      {content}
    </a>
  ) : (
    <div className="px-2 py-2">{content}</div>
  );
}
