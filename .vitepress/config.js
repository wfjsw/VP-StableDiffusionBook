import { defineConfig } from "vitepress";

export default defineConfig({
    title: "AiDraw",
    description:
        "关于使用 Ai 绘画的 Wiki ，翻译，教程，相关资源。主要内容为 StableDiffusionWebUi",
    lang: "zh-CN",
    lastUpdated: true,
    outDir: "./dist",
    srcDir: "./src",
    ignoreDeadLinks: true,
    themeConfig: {
        outlineTitle: '在这一页上',
        nav: [
            { text: "附录", link: "/appendix" }
        ],
        sidebar: [
            {
                text: "基础指引",
                items: [
                    { text: "术语解释", link: "/glossary" },
                    { text: "起步于此", link: "/preparation" },
                    { text: "安装配置", link: "/installation" },
                    { text: "模型调试", link: "/models" },
                    { text: "绘画调试", link: "/drawing" },
                ],
            },
            {
                text: "进阶指引",
                items: [
                    { text: "训练精修", link: "/finetune" }
                ],
            },
        ],
    },
});
