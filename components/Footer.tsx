import { footerLinks } from "@/lib/site-data";
import { withBasePath } from "@/lib/base-path";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-lg font-semibold text-white">DreamingFish / 梦鱼服</p>
          <p className="mt-2 text-sm text-mist/62">合作多模组生存服务器</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="页脚导航">
          {footerLinks.map((link) => (
            <a key={link.label} href={withBasePath(link.href)} className="focus-ring rounded-full text-sm text-mist/62 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-mist/45">© 2026 DreamingFish. All rights reserved.</p>
      </div>
    </footer>
  );
}
