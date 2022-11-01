import { defineConfig } from "vitepress";
import { SearchPlugin } from "vitepress-plugin-search";

export default defineConfig({
    title: "AiDraw",
    description:
        "关于使用 Ai 绘画的 Wiki ，翻译，教程，相关资源。主要内容为 StableDiffusionWebUI",
    lang: "zh-CN",
    lastUpdated: true,
    outDir: "./dist",
    srcDir: "./src",
    ignoreDeadLinks: true,
    themeConfig: {
        outlineTitle: "在这一页上",
        nav: [
            { text: "指南", link: "/guide/index" },
            {
                text: "深入",
                link: "/advanced/index",
            },
            { text: "附录", link: "/appendix" },
        ],
        sidebar: {
            "/guide/": [
                {
                    text: "新手指南",
                    items: [{ text: "前言", link: "/guide/" }],
                },
                {
                    text: "起步于此",
                    collapsible: true,
                    items: [
                        { text: "准备工作", link: "/guide/preparation" },
                        {
                            text: "硬件要求与模型选择",
                            link: "/guide/requirements",
                        },
                        {
                            text: "新闻",
                            link: "/guide/newsfeed",
                        },
                    ],
                },
                {
                    text: "安装与配置",
                    collapsible: true,
                    items: [
                        {
                            text: "SD-WebUI 方案",
                            link: "/guide/install/sd-webui",
                        },
                        {
                            text: "Google Colab 方案",
                            link: "/guide/install/colab",
                        },
                        {
                            text: "NAI 官方套件方案",
                            link: "/guide/install/original",
                        },
                        {
                            text: "其他方案",
                            link: "/guide/install/others",
                        },
                    ],
                },
                {
                    text: "配置与调试",
                    items: [
                        { text: "引言", link: "/guide/configuration/index" },
                        {
                            text: "关于显卡",
                            link: "/guide/configuration/videocards",
                        },
                        {
                            text: "关于 NovelAI 泄露模型",
                            link: "/guide/configuration/novelai-models",
                        },
                        {
                            text: "调参基础",
                            link: "/guide/configuration/param-basic",
                        },
                        {
                            text: "进阶配置",
                            link: "/guide/configuration/param-advanced",
                        },
                        {
                            text: "其他",
                            link: "/guide/configuration/other",
                        },
                    ],
                },
            ],
            "/advanced/": [
                {
                    text: "进阶深入",
                    items: [{ text: "前言", link: "/advanced/" }],
                },
                {
                    text: "提示词工程",
                    items: [
                        { text: "概述", link: "/advanced/prompt-engineering/" },
                        {
                            text: "魔法入门",
                            link: "/advanced/prompt-engineering/basic",
                        },
                        {
                            text: "实战指南",
                            link: "/advanced/prompt-engineering/practice",
                        },
                        {
                            text: "杂项",
                            link: "/advanced/prompt-engineering/misc",
                        },
                    ],
                },
                {
                    text: "模型精调",
                    items: [
                        {
                            text: "概述",
                            link: "/advanced/finetuning/",
                        },
                    ],
                },
                {
                    text: "二次开发",
                    items: [
                        {
                            text: "自定义脚本",
                            link: "/advanced/development/scripts",
                        },
                    ],
                },
            ],
        },
    },
    vite: {
        plugins: [
            SearchPlugin({
                wildcard: true,
            }),
        ],
    },
});
