/**
 * Generate a human-readable, sortable application ID.
 * Format: YYYY-MM-DD-<company-slug>-<role-slug>
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function appId(company: string, role: string, date = new Date()): string {
  const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
  return `${iso}-${slugify(company)}-${slugify(role)}`;
}

export function companySlug(company: string): string {
  return slugify(company);
}

export function roleSlug(title: string): string {
  return slugify(title);
}
