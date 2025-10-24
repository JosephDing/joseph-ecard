import { NextResponse } from "next/server";
import { profile } from "@/lib/profile";

export async function GET() {
  const p = profile;
  const a = p.address;

  const vcf = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:Ding;Joseph;;;`,
    `FN:${p.fullName}`,
    `ORG:${p.company}`,
    `TITLE:${p.title}`,
    `TEL;TYPE=CELL:${p.phone}`,
    `EMAIL;TYPE=INTERNET:${p.email}`,
    `URL:${p.website}`,
    `ADR;TYPE=WORK:;;${a.street};${a.city};${a.region};${a.postalCode};${a.country}`,
    `NOTE:${p.summary}`,
    "END:VCARD",
  ].join("\r\n");

  return new NextResponse(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="contact.vcf"',
    },
  });
}
