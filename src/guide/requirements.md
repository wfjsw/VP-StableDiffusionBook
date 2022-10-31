# 硬件要求与模型

## 我可以参加 Party 吗？

首先，很不幸地，因为需要用到 CUDA 加速，所以只有 **英伟达显卡** 支持良好。（AMD 可以用但速度明显慢于英伟达显卡，~~当然没显卡也可以用 CPU 花几百倍时间生成~~）

对于 **Linux 系统 + AMD 显卡** 请读 [AMD 安装指南](https://rentry.org/ayymd-stable-diffustion-v1_4-guide) 和 [AMD 安装 WebUI 指北](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-AMD-GPUs)

[对于支持 AMD GPU 方案相关讨论](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/1046)

::: danger 显卡保修
显卡厂家对于深度学习卡的保修政策等同于矿卡

过度玩耍(比如连续 3 天出图)，显卡会有坏掉的风险
:::

[各种显卡的稳定扩散性能测试报告](https://docs.google.com/spreadsheets/d/1Zlv4UFiciSgmJZncCujuXKHwc4BcxbjbSBg71-SdeNk/edit#gid=0)

## 目前的五种方案

<!-- TODO: 这个效果不是很对 -->

| 名称                    | 需求                           | 备注                                                                 |
| ----------------------- | ------------------------------ | -------------------------------------------------------------------- |
| SD-WebUI + NAI 4GB 模型 | 至少 3 GB 显存                 | 界面较复杂，需要相应调整配置才可达到官方效果。适用于出图。           |
| SD-WebUI + NAI 7GB 模型 | 至少 6 GB 显存                 | 与 4 GB 模型使用效果相差不大。适用于训练精调，须耗费较多内存与显存。 |
| NAIFU + NAI 4GB 模型    | 至少 8GB 内存 + 8GB 显存       | 与官方类似的界面，所需配置较少                                       |
| NAIFU + NAI 7GB 模型    | 至少 8 - 10 GB 显存            | 与官方类似的界面，所需配置较少                                       |
| 官方后端                | 16GBfp16/24GBfp32 & 服务器系统 |                                                                      |

部署 NAI 原版网页 UI + 后端是没有必要的。运行原版套件需要准备一台拥有 12GB 以上显存的 Linux 系统 GPU 服务器，但由于官方配置中启用了 EMA 权重，因此在使用更多显存的同时，模型输出效果与 4 GB 压缩模型并无差别。

SD-WebUI 是一个可以使用模型生产图片的**框架**。

NovelAI 是一个在线**服务**。

## 二次元之外

关于其他 Stable-Diffusion 模型，请看 [这个合集](https://space.bilibili.com/250989068/channel/collectiondetail?sid=660352)。

顺便贴一个 [最近发布的 1.5 模型](https://huggingface.co/runwayml/stable-diffusion-v1-5) 和 [稳定体积小的 1.4 模型](https://huggingface.co/CompVis/stable-diffusion-v1-4)
