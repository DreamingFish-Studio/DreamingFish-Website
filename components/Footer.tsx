import { ArrowUp } from "lucide-react";
import { PixelFish } from "@/components/PixelFish";
import { footerLinks } from "@/lib/site-data";
import { withBasePath } from "@/lib/base-path";

export function Footer() {
  return (
    <footer className="dirt-footer">
      <div className="grass-edge" aria-hidden="true" />
      <div className="shell footer-inner">
        <div className="footer-brand">
          <span className="brand-block is-large"><PixelFish /></span>
          <div>
            <p>DreamingFish / 梦鱼服</p>
            <span>合作多模组生存服务器</span>
          </div>
        </div>
        <nav aria-label="页脚导航">
          {footerLinks.map((link) => (
            <a key={link.label} href={withBasePath(link.href)}>{link.label}</a>
          ))}
        </nav>
        <div className="footer-bottom">
          <p>© 2026 DreamingFish. All rights reserved.</p>
          <a href="#home" className="mc-btn mc-btn-icon" aria-label="回到首页"><ArrowUp size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
