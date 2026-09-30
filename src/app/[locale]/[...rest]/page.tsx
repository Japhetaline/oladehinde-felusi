import { notFound } from 'next/navigation';

// Any unknown path under /en or /ar renders the localized not-found page.
export default function CatchAll() {
  notFound();
}
