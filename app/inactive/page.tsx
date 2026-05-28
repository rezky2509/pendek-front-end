import { CircleAlert } from 'lucide-react';

export default function InactivePage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon/Status Indicator */}
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg border border-black">
            <CircleAlert
              className="w-10 h-10 text-mono"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
            </CircleAlert>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Link Inactive</h1>
          <p className="text-muted-foreground">
            This link is no longer active or has expired.
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          The link you're trying to access is no longer available. This could
          be because it has expired, been removed, or is temporarily unavailable.
        </p>
      </div>
    </main>
  );
}