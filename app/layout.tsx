import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "梦鱼服 DreamingFish",
  description: "Minecraft 合作多模组生存服务器，面向长期社区建设。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
