---
outline: [2, 3]
---

# 调参基础

本章内容大多基于 Stable Diffusion WebUI 前端。NovelAI 原始界面只开放了所有设置的一小部分。

## 横条参数说明

 - `Step` 迭代多少次，取值和 `sampling method` 有关，`DDIM` 采样方法收敛较快，具体差别见调参魔法 [Sampler vs. Steps Comparison (low to mid step counts)](https://www.reddit.com/r/StableDiffusion/comments/wwm2at/sampler_vs_steps_comparison_low_to_mid_step_counts/)。
   - 注意：在 DDIM 采样方法下，`Step` 不宜超过 30，否则可能出现报错。
 - `Batch count/Batch size` 决定生成的图片数量。`Batch size` 决定并发量，需要大量显存；`Batch count` 决定连续生成次数，不需要额外内存。得到的图片数量是两者之积。
 - `Sample Method` 采样方法。`DDIM`、`Euler a` 也挺好用。 (带 a 的是 Ancestral 的意思, step 增长出图不稳定)
 - `CFG scale` 符合 prompt 的程度, 值越高越会字面看待 prompt, 低则给模型较大的发挥空间, 但是实际模型表现上来看 cfg scale 低 (6-8) 饱和度低, 偏线稿, 偏杂乱, 高 (18-22) 则饱和度偏高, 偏 CG 风格.
   - 过高的 CFG 会引起颜色失真，CFG 应该在 5-15 之间
 - `Denoise strength` img2img 专属参数，从 0 到 1 取值，值越高 AI 对原图的参考程度就越低（同时增加迭代次数），个人喜欢低 cfg 高 denoise 重绘图, 高 cfg 低 denoise 改细节.
 - `Width` & `Height` 设置输出图片的长宽大小。如设置过大可能出现显存不足问题。同时，过大的分辨率通常不会产生更好的效果。建议使用滑条，手动输入长宽数值可能出现报错。

[一个小指南：RedditAbout](https://www.reddit.com/r/StableDiffusion/comments/xbeyw3/can_anyone_offer_a_little_guidance_on_the/)

## ckpt 文件安全问题

见 [It's not a virus it's a checkpoint file](https://huggingface.co/Deltaadams/Hentai-Diffusion/discussions/12)

ckpt 文件被加载时基本上可以执行任何内容，盲目加载有安全风险。请检查来源是否可靠再加载。

如果杀毒软件拦截，有可能创建者向文件中注入了恶意的 Python 代码。

可以通过此脚本检查风险：<https://rentry.org/safeunpickle2>

## 使用 WebUI 复现 NAI 官网结果

[相关讨论，应该读一读！](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/2017)

::: tip
由于 xformers 在优化过程中引入的抖动与部分显卡微架构差异，尝试完全复原在不同机器上生成的图片是不明智的。所以不要纠结一些细节不能复现。
:::


### 需要做的事情

* 如果使用 7G 模型，需要将 config.yml 改名为 `模型名.yml` 与模型文件放置在一起。这种加载方式可能消耗大量显存。如果使用 4G 模型，无需进行任何操作。
* 启用 xformers
* 加载 `animevae.pt` 模型（将该模型文件改名为 `模型名.vae.pt` 与模型文件放置在一起）
* Settings 中将 `Stop At last layers of CLIP model` 设为 `2`
* `Eta noise seed delta` 设置为 `31337`
* 使用 NovelAI 自动填充的正反标签
  * 正向标签：`masterpiece, best quality`
  * 反向标签：`lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry`
* 如果使用大括号，将大括号翻译为权重数字（每个大括号 105%）

### 不需要做的事情

* hypernetwork。官网默认并不使用 hypernetwork

设置 `Stop At last layers of CLIP model` 是为了匹配 NAI 的一个[优化](https://blog.novelai.net/novelai-improvements-on-stable-diffusion-e10d38db82ac)。
