
# 其他

## 4GB 显卡支持

针对具有低 VRAM 的 GPU 的优化。这应该可以在具有 4GB 内存的视频卡上生成 512x512 图像。

`--lowvram` 是 basujindal 对优化思想的重新实现。模型被分成模块，GPU 内存中只保存一个模块；当另一个模块需要运行时，前一个模块将从 GPU 内存中卸载。这种优化的性质使处理速度变慢——与我的 RTX 3090 上的正常操作相比，速度慢了大约 10 倍。

`--medvram` 是另一个优化，通过不在同一批次中处理条件和无条件去噪，可以显着减少 VRAM 的使用。这种优化的实现不需要对原始的稳定扩散代码进行任何修改。

::: info
经过 10/10 的优化，RTX2050 的 4GB 显卡也可以使用 `--medvram` 。
:::

当然也可以减半精度，或者生成一张 64x64 图片清理显存。

## 不间断生成

在 WebUI 的生成键上右击即可出现 **不间断生成** 的选项。

## 图片信息 PNG info

生成的图片原图内嵌生成信息，拖放到 PNG Info 页面即可查看。

### NAI 4chan 简化版本

4chan 版本魔改官后程序，会动态分配，显存不够内存来凑。

## 在 WebUI 中使用 SD 2.0 模型

目前仅支持 Stable Diffusion 2.0-v 模型。

1. 将 WebUI 更新为最新版。
2. 下载 [768-v-ema.ckpt](https://huggingface.co/stabilityai/stable-diffusion-2/blob/main/768-v-ema.ckpt) 模型文件，放置在 `models/Stable-Diffusion` 目录中。
3. 下载 [v2-inference-v.yaml](https://raw.githubusercontent.com/Stability-AI/stablediffusion/main/configs/stable-diffusion/v2-inference-v.yaml)，改名为 `768-v-ema.yaml` 放置在 `models/Stable-Diffusion` 目录中。
4. 选择使用新的模型。

在使用 2.0 模型时，训练面板可能无法使用。
