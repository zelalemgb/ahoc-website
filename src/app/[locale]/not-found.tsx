import { ButtonLink } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-7xl text-maroon">404</p>
      <h1 className="mt-4 font-display text-3xl">This page is off view</h1>
      <p className="mt-4 text-ink/60">
        The page you’re looking for isn’t here. Step back through the arch.
      </p>
      <ButtonLink href="/" className="mt-8">
        Return home →
      </ButtonLink>
    </div>
  );
}
