import { getConfig } from "@/lib/config";

const config = getConfig();

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex h-24 items-center px-4">
          <p className="text-sm leading-loose">
            Built by{" "}
            <a
              href={config.app.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {config.app.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}