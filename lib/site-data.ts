import {
  Handshake,
  Landmark,
  MessageSquareText,
  Pickaxe,
  ShieldCheck,
  Wrench
} from "lucide-react";

export const navItems = [
  { label: "首页", href: "#home" },
  { label: "服务器介绍", href: "#about" },
  { label: "玩法特色", href: "#features" },
  { label: "守望梦屿", href: "#dreamhaven" },
  { label: "模组列表", href: "#mods" },
  { label: "加入服务器", href: "#join" },
  { label: "玩家作品", href: "#gallery" },
  { label: "更新日志", href: "#changelog" },
  { label: "论坛", href: "https://forum.dreamingfish.cn", external: true }
];

export const heroStats = ["Minecraft 1.20.1", "合作多模组生存", "守望梦屿预告中", "社区论坛开放中"];

export const aboutCards = [
  {
    title: "公平公益",
    description: "不售卖强力装备、特殊权限或数值优势，让成长回到游玩本身。"
  },
  {
    title: "清晰规则",
    description: "用公开沟通和稳定秩序维护环境，而不是靠管理随意裁决。"
  },
  {
    title: "长期开发",
    description: "围绕玩家反馈、玩法系统和社区内容持续调整更新。"
  }
];

export const features = [
  {
    title: "公益服方向",
    description: "服务器不售卖强力装备、特殊权限或数值优势。玩家的成长应来自游玩、合作、探索和创造本身。",
    icon: ShieldCheck
  },
  {
    title: "清晰规则",
    description: "管理不是凌驾于玩家之上的特权身份。服务器会尽量通过明确规则、公开沟通和稳定执行维护秩序。",
    icon: Landmark
  },
  {
    title: "积极社区",
    description: "梦鱼服重视友善、活跃、有参与感的社区氛围。讨论、分享、组队和玩家作品都会成为服务器的一部分。",
    icon: MessageSquareText
  },
  {
    title: "合作建设",
    description: "服务器鼓励玩家共同规划基地、道路、公共工程、商店和活动，让世界不是一个人孤立完成的存档。",
    icon: Handshake
  },
  {
    title: "生存生活",
    description: "砍树、挖矿、种田、建家、经营和装饰仍然是体验底色。服务器希望让普通生活也能被认真对待。",
    icon: Pickaxe
  },
  {
    title: "持续更新",
    description: "后续内容会围绕玩法系统、活动、区域探索和玩家反馈持续扩展，并兼顾性能优化与长期稳定。",
    icon: Wrench
  }
];

export const modCategories = ["全部", "科技自动化", "建筑装饰", "世界探索", "冒险战斗", "性能优化", "辅助体验"];

export const mods = [
  {
    name: "Create",
    category: "科技自动化",
    description: "使用机械动力构建传送带、工厂和自动化产线，适合玩家共同规划公共工程。",
    isCore: true
  },
  {
    name: "Farmer's Delight",
    category: "辅助体验",
    description: "扩展食物、烹饪和农业体验，让生存更有生活感。",
    isCore: false
  },
  {
    name: "Biomes O' Plenty",
    category: "世界探索",
    description: "增加大量新的生物群系，让探索路线更丰富，也为长期建设提供更多地形选择。",
    isCore: true
  },
  {
    name: "Supplementaries",
    category: "建筑装饰",
    description: "提供大量实用且自然融入原版风格的装饰与功能方块。",
    isCore: false
  },
  {
    name: "JourneyMap",
    category: "辅助体验",
    description: "提供地图与路径记录，方便玩家探索、协作和规划公共路线。",
    isCore: false
  },
  {
    name: "Better Combat",
    category: "冒险战斗",
    description: "优化战斗动作和手感，让冒险过程更流畅。",
    isCore: false
  }
];

export const joinSteps = [
  {
    title: "加入 QQ 群审核",
    description: "先加入 QQ 群 289131647，按群内要求完成审核。"
  },
  {
    title: "阅读游玩指南",
    description: "审核通过后，认真阅读梦鱼服游玩指南，了解服务器规则、玩法说明和注意事项。"
  },
  {
    title: "下载整合包",
    description: "根据指南下载梦鱼服专用整合包，并在启动器中导入。"
  },
  {
    title: "复制服务器地址",
    description: "点击按钮复制 dreamingfish.top，并添加到多人游戏。"
  },
  {
    title: "享受游戏",
    description: "完成准备后进入服务器，和其他玩家一起开始属于你的梦鱼服旅程。"
  }
];

export const galleryItems = [
  { title: "晨曦下的主城", author: "DreamingFish Team", image: "/images/gallery/city.webp", type: "建筑" },
  { title: "山谷工业区", author: "玩家投稿", image: "/images/gallery/factory.webp", type: "科技" },
  { title: "海边小镇", author: "玩家投稿", image: "/images/gallery/town.webp", type: "建筑" },
  { title: "远征合影", author: "玩家活动", image: "/images/gallery/group.webp", type: "活动" }
];

export const changelog = [
  {
    date: "2026.05.01",
    title: "守望梦屿入口接入官网",
    description: "主站新增下一周目预告区，玩家可以从首页直接进入守望梦屿页面。",
    tag: "官网"
  },
  {
    date: "2026.04.28",
    title: "官网展示页启动",
    description: "梦鱼服官网首页结构与视觉方向确定，论坛规划同步开始。",
    tag: "官网"
  },
  {
    date: "2026.04.25",
    title: "玩法方向调整",
    description: "服务器确定以合作多模组生存为核心，强调长期周目和社区沉淀。",
    tag: "服务器"
  },
  {
    date: "2026.04.20",
    title: "核心模组初步确定",
    description: "围绕科技、建筑、探索和辅助体验进行第一轮模组筛选。",
    tag: "模组"
  },
  {
    date: "2026.04.15",
    title: "梦鱼服项目启动",
    description: "DreamingFish 服务器项目正式开始规划。",
    tag: "项目"
  }
];

export const footerLinks = [
  { label: "加入服务器", href: "#join" },
  { label: "守望梦屿", href: "/dreamhaven" },
  { label: "论坛", href: "https://forum.dreamingfish.cn" },
  { label: "更新日志", href: "#changelog" },
  { label: "玩家作品", href: "#gallery" }
];

export const sectionMotion = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 }
};

export const cardContainerMotion = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const cardMotion = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};
