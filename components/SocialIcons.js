const P = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.4-4.2A7.5 7.5 0 1 1 8.2 18.6L4 20z" />
      <path d="M9 9.2c.2 1.6 1.9 3.4 3.6 3.7.7.1 1.1-.2 1.3-.7.1-.3 0-.5-.2-.7l-1-.6c-.2-.1-.4-.1-.6.1l-.3.3c-.7-.3-1.3-.9-1.6-1.6l.3-.3c.2-.2.2-.4.1-.6l-.6-1c-.2-.3-.5-.4-.8-.3-.5.2-.8.6-.7 1.3z" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M10.5 9.3l4 2.7-4 2.7z" fill="currentColor" stroke="none" />
    </>
  )
};

export default function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      {P[name]}
    </svg>
  );
}
