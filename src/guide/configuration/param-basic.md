---
outline: [2, 3]
---

# 调参基础

## 横条参数说明

 - `Step` 迭代多少次，取值和 `sampling method` 有关，`DDIM` 采样方法收敛较快，具体差别见调参魔法 [Sampler vs. Steps Comparison (low to mid step counts)](https://www.reddit.com/r/StableDiffusion/comments/wwm2at/sampler_vs_steps_comparison_low_to_mid_step_counts/)。
 - `Batch count/Batch size` 决定生成的图片数量。`Batch size` 决定并发量，需要大量显存；`Batch count` 决定连续生成次数，不需要额外内存。得到的图片数量是两者之积。
 - `Sample Method` 采样方法。`DDIM`、`Euler a` 也挺好用。 (带 a 的是 Ancestral 的意思, step 增长出图不稳定)
 - `CFG scale` 符合 prompt 的程度, 值越高越会字面看待 prompt, 低则给模型较大的发挥空间, 但是实际模型表现上来看 cfg scale 低 (6-8) 饱和度低, 偏线稿, 偏杂乱, 高 (18-22) 则饱和度偏高, 偏 CG 风格.
   - 过高的 CFG 会引起颜色失真，CFG 应该在 5-15 之间
 - `Denoise strength` img2img 专属参数，从 0 到 1 取值，值越高 AI 对原图的参考程度就越低（同时增加迭代次数），个人喜欢低 cfg 高 denoise 重绘图, 高 cfg 低 denoise 改细节.

[一个小指南：RedditAbout](https://www.reddit.com/r/StableDiffusion/comments/xbeyw3/can_anyone_offer_a_little_guidance_on_the/)


## 生成图片发生BUG的自救

### 生成黑/绿图

[Green or Black screen](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-NVidia-GPUs)

如果是 GTX 16xx 系列，启动参数需要加 `--precision full --no-half`, 因此如果显存不足还要加 `--medvram`。

如果是其他显卡而且加载了 VAE 时出现黑图，加入 `--no-half-vae` 参数（见 [关于 AUTOMATIC1111 /stable-diffusion-webui 的 FAQ](https://gist.github.com/crosstyan/f912612f4c26e298feec4a2924c41d99)）。


### RuntimeError Sizes of tensors must match

(img2img) 如果你得到 `RuntimeError: Sizes of tensors must match`，你需要改变输入图像的分辨率


### 彩虹混乱图

如果 AI 输出了混乱的彩虹色图片，则生成分辨率被设置得太低


### 高分辨率出鬼图 / 低显存生成大分辨率图片

简单说就是使用低分辨率重新生成或者超分。见钩吻

你可以在下个章节看到具体操作流程。

### RuntimeError: Unable to find a valid cuDNN algorithm to run convolution

前面那节有相关的参数建议。

生成报错解释：显存不足

先检查 CUDA 是否可用，打开命令窗，输入 `python` 并分行输入

```python
import torch
print(torch.cuda.is_available())
```

### CUDA out of memory

原因：显存不足。`--lowvram` 和 `--medvram` 启动参数都可以改善此问题。

## ckpt 文件安全问题

见 [It's not a virus it's a checkpoint file](https://huggingface.co/Deltaadams/Hentai-Diffusion/discussions/12)

ckpt 文件被加载时基本上可以执行任何内容，盲目加载有安全风险。请检查来源是否可靠再加载。

如果杀毒软件拦截，有可能创建者向文件中注入了恶意的 Python 代码。

可以通过此脚本检查风险：<https://rentry.org/safeunpickle2>
