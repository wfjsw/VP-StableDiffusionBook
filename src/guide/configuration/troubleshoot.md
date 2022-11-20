# 疑难解答

本章主要描述生成图片时遇到的各类问题。安装运行时常见问题见 [SD-WebUI 方案 - 错误处理](../install/sd-webui.md#错误处理-troubleshooting) 章节。

## 生成黑/绿图

[Green or Black screen](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-NVidia-GPUs)

如果是 GTX 16xx 系列，启动参数需要加 `--precision full --no-half`, 因此如果显存不足还要加 `--medvram`。

如果是其他显卡而且加载了 VAE 时出现黑图，加入 `--no-half-vae` 参数（见 [关于 AUTOMATIC1111 /stable-diffusion-webui 的 FAQ](https://gist.github.com/crosstyan/f912612f4c26e298feec4a2924c41d99)）。


## RuntimeError Sizes of tensors must match

(img2img) 如果你得到 `RuntimeError: Sizes of tensors must match`，你需要改变输入图像的分辨率


## 彩虹混乱图

如果 AI 输出了混乱的彩虹色图片，则生成分辨率被设置得太低


## 高分辨率出鬼图 / 低显存生成大分辨率图片

简单说就是使用低分辨率重新生成或者超分。见钩吻

你可以在下个章节看到具体操作流程。

## RuntimeError: Unable to find a valid cuDNN algorithm to run convolution

前面那节有相关的参数建议。

生成报错解释：显存不足

先检查 CUDA 是否可用，打开命令窗，输入 `python` 并分行输入

```python
import torch
print(torch.cuda.is_available())
```

## CUDA out of memory

见 [显存不足](../install/sd-webui.md#显存不足cuda-out-of-memory)

