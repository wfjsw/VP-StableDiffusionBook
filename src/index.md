<script setup>
import Actions from './components/Actions.vue'
</script>

# AiDraw

::: tip 提示
本站内容可能过时，欲查阅最新内容请访问原站 https://draw.dianas.cyou/
:::

关于使用 Ai 绘画的 Wiki ，翻译，教程，相关资源。主要内容为 StableDiffusionWebUI

<Actions />

## 项目

本文档主要涉及以下两个项目。

[Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 简称 SD-WebUI，是一个基于 Gradio 库的 Stable Diffusion 浏览器界面。

[NovelAI](https://novelai.net/) 简称 NAI， 是一项按月订阅服务，用于 AI 辅助创作、讲故事、虚拟陪伴，或者只是供您想象的 GPT 驱动的沙盒。

Stable Diffusion 本来是面向三次元的，而 NAI 是二次元特化版本。

## Stable Diffusion 和 NAI 关系？我该怎么办？

因为泄漏事件，NAI 使用数千万 Danbooru（图站）图片训练的模型被泄漏了两次，而后来 **Stable Diffusion WebUI (一个通用的生成框架)** 对模型进行了支持，所以可以 使用 WebUI（简称 SD-WebUI）装载 NAI 的模型。

::: details 泄露内容详情

泄露 Part 1：共 53.66 GB，包含生产模型，程序。其中需要下载的相关模型有 7 GB 和 4 GB 两种。

泄露 Part 2：共 124.54 GB，包含历史测试代码和模型，程序。其中需要下载的相关模型与 Part 1 相同。

:::

## 社区

### 海外

<p>
    <a href="https://discord.gg/vhsArSSA6K">
        <img src="https://img.shields.io/discord/1033769426216046622?color=blue&label=Discord_Ai%E7%BB%98%E7%94%BB%E4%B8%AD%E6%96%87%E7%BB%84" alt="Discord"/>
    </a>
</p>
<p>
    <a href="https://t.me/StableDiffusion_CN">
        <img src="https://img.shields.io/badge/Telegram-Group-blue" alt="Telegram"/>
    </a>
</p>

## 声明

1. 如果本文档外链的内容中有不合适的内容，与本文档无关。
2. 引用或复制内容需要注明链接。
3. 其他声明请阅读 Readme

文档使用 GFDL 许可，

如果您需要在您自己的著作／文章／网站或其他出版物中使用本Wiki的材料，您必须遵守 GFDL

如果您创建了一个修改或添加了内容的派生版本，它将继承以下条款：

-   您的作品也必须以 GFDL 的形式发布
-   您必须注明文章的作者
-   您必须提供取得材料“透明版本”的方法
