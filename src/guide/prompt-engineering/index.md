---
outline: [2, 4]
---

# 提示词工程学

这节会介绍绘图所需要用到的提示词，和相关的 SD-WebUI 网页应用资源。如果你会画画，那么效果会更加稳定可观。

## 基本流程

![WorkFlow](../../assets/draw_workflow.svg){style="background-color: #fff;"}

这幅图演示了循环迭代的流程。

迭代方式，有循环迭代和线性迭代两种，线性迭代适用于多样性测试，而 **循环迭代** 是优化的更好选择。

来回改提示 + 固定种子并不是好选择。

目前研究基本方向是：

-   提示词 + PS/Inpaint(微修/嫁接)
-   提示词 + 3D 参考

关于生成时涉及到的参数配置，见 [参数介绍](../../guide/configuration/param-basic.md#参数介绍)。

## 提示词来源

提示词的来源主要取决于以下三个要素：

-   模型所采用的自然语言处理 (NLP) 方案支持的词汇表
-   模型初始训练材料标记词来源

::: tip
下文提供的词库、网站、Wiki 均主要适用于 NovelAI 泄露模型。使用其他模型时应当参照对应资料进行调整。
:::

以 NovelAI 泄露模型为例，该模型主要采用 [Danbooru](https://danbooru.donmai.us/) 网站上的用户标签参与训练，因此使用这些标签进行图像生成可获得最佳效果。使用 MidJourney 时则可参照 [MidJourney-Styles-and-Keywords-Reference](https://github.com/willwulfken/MidJourney-Styles-and-Keywords-Reference) 提供的参考数据，

Danbooru 网站的 Wiki 提供了一部分 [标签分类与说明](https://danbooru.donmai.us/wiki_pages/tag_groups)，这些文档可被视作权威来源。例如，笔触 / 绘画工具 / 风格化 / 绘画技术标签组可见下属对应的 [tag group:image composition 分区](https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition)。

部分热心网友整理了中文版的标签参考、模板共享与其他信息，见 [调参魔法书](https://docs.google.com/spreadsheets/d/e/2PACX-1vRa2HjzocajlsPLH1e5QsJumnEShfooDdeHqcAuxjPKBIVVTHbOYWASAQyfmrQhUtoZAKPri2s_tGxx/pubhtml) 和 [手抄魔法本](https://docs.google.com/spreadsheets/d/14Gg1kIGWdZGXyCC8AgYVT0lqI6IivLzZOdIT3QMWwVI/)

日本社区也整理一些标签用词，可以在 [NovelAI 5ch Wiki](https://seesaawiki.jp/nai_ch/d/%be%ec%bd%ea%a1%a6%c7%d8%b7%ca) 中进行检索。

同时，市面上存在多种提示词辅助构建工具，详见 [Danbooru 标签超市](https://tags.novelai.dev/) ([项目地址](https://github.com/wfjsw/danbooru-diffusion-prompt-builder)) 或 [魔咒百科词典](https://aitag.top/) (后者不支持负面 Tag)

Bilibili 上也发布了许多视频教程，如 [【开源调研】AI 绘画魔法の奥义 (只剩一瓶辣椒酱)](https://space.bilibili.com/35723238/channel/collectiondetail?sid=779851)，但需要了解 **通过 AI 模仿画风，特定镜头，增加特效，微修微调，PS 嫁接出图，通过 3D 特定姿势，重画，迭代** 等等操作的话，需要 **通读** 下面的内容。

::: warning
提前告知：WebUI 的设置页面需要按下 `Apply setting` 才能保存设置。
:::

## 考场速查

这里是打开页面就可以看到的工具箱

### 标签参考

-   [Danbooru Wiki - Tag Groups](https://danbooru.donmai.us/wiki_pages/tag_groups)
-   [MidJourney-Styles-and-Keywords-Reference](https://github.com/willwulfken/MidJourney-Styles-and-Keywords-Reference)
-   [手抄魔法本](https://docs.google.com/spreadsheets/d/14Gg1kIGWdZGXyCC8AgYVT0lqI6IivLzZOdIT3QMWwVI/)
-   [nai-anime-pure-negative-prompt docs](https://github.com/6DammK9/nai-anime-pure-negative-prompt)
-   [绘画技术分类](https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition)
-   [地点分类](https://danbooru.donmai.us/wiki_pages/tag_group%3Alocations)
-   [服装分类](https://danbooru.donmai.us/wiki_pages/tag_group%3Aattire)
-   [美学风格分类](https://aesthetics.fandom.com/wiki/List_of_Aesthetics)
-   [颜色列表](https://en.wikipedia.org/wiki/List_of_colors_by_shade)
-   [表情符号参考](https://unicode.org/emoji/charts/emoji-list.html)
-   [Danbooru 标签比例冰山图](https://icebergcharts.com/i/Danbooru_Tags)

### 工具

-   [快速分享-在线剪切板](https://netcut.cn/)
-   [PaintHua-无限外延画布的在线工具](https://www.painthua.com/)
-   [NAI<=>WebUI 权重转换 Telegram 服务](https://github.com/sudoskys/M2NM2NBot)
-   [NAI 的分词器，用来查看你的文本被识别为哪些](https://novelai.net/tokenizer)

#### 灵感

-   [Pic2Prompt0](https://www.latentspace.dev/)
-   [Pic2Prompt1](https://magicstudio.com/pic2prompt/editor)
-   [Pic2Prompt2](https://replicate.com/methexis-inc/img2prompt)
-   [Danbooru 标签超市](https://tags.novelai.dev/)
-   [AI 绘画 tag 生成器](https://aitag.top/)
-   [prompthero](https://prompthero.com/)
-   [Prompt Search Anime](https://www.ptsearch.info/home/)
-   [Prompt Search2](https://pagebrain.ai/promptsearch/?q=girl&page=1)
-   [midjourney haha](https://www.midjourney.com/showcase/)
-   [Social Generative AI](https://histre.com/integrations/generative/)

#### 后期

-   [PNGINFO 在线查看工具](https://spell.novelai.dev/)
-   [Real-ESRGAN 降噪提高分辨率神器](https://github.com/xinntao/Real-ESRGAN)
-   [DeepDanbooru 通过图像识别提示](https://github.com/KichangKim/DeepDanbooru)

### 作品参考

-   [arthub](https://arthub.ai/)
-   [NAI-NOVELAI.IO](https://novelai.io/)
-   [NAI-Pixai](https://pixai.art/)
-   [LEXICA](https://lexica.art/)
-   [Krea](https://www.krea.ai/)
-   [largest library of AI-generated images](https://libraire.ai/)

### 风格化

-   [稳定扩散的艺术家风格研究](https://proximacentaurib.notion.site/e28a4f8d97724f14a784a538b8589e7d?v=42948fd8f45c4d47a0edfc4b78937474)
-   [Top-sd-artists](https://www.urania.ai/top-sd-artists)
-   [artiststostudy](https://artiststostudy.pages.dev/)
-   [Stable Diffusion Artist Style Studies](https://proximacentaurib.notion.site/e28a4f8d97724f14a784a538b8589e7d?v=ab624266c6a44413b42a6c57a41d828c)
-   [Stable Diffusion Artist Study](https://docs.google.com/spreadsheets/d/1SRqJ7F_6yHVSOeCi3U82aA448TqEGrUlRrLLZ51abLg/htmlview#)
