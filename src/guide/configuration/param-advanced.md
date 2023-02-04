# 进阶配置

## X/Y 图

创建具有不同参数的图像网格。使用 X 类型和 Y 类型字段选择应由行和列共享的参数，并将这些参数以逗号分隔输入 X 值 / Y 值字段。支持整数、浮点数和范围。

### Simple ranges 简单范围

```text
1-5 = 1, 2, 3, 4, 5
```

### Ranges with increment in bracket 括号范围

```text
1-5 (+2) = 1, 3, 5
10-5 (-3) = 10, 7
1-3 (+0.5) = 1, 1.5, 2, 2.5, 3
```

### Ranges with the count in square brackets 方括号范围

```text
1-10 [5] = 1, 3, 5, 7, 10
0.0-1.0 [6] = 0.0, 0.2, 0.4, 0.6, 0.8, 1.0
```

### Prompt S/R 替换

S/R 是 X/Y 图的的一种高级操作模式。

S/R 是 搜索/替换 的意思，输入一个单词或短语的列表，它从列表中取第一个并将其视为关键词，并将该关键词的所有实例替换为列表中的其他条目的所有实例替换为列表中的其他条目。

例如，提示 `a man holding an apple, 8k clean` 和 S/R 提示 `an apple, a watermelon, a gun` 结合，你会得到三个提示。

-   `a man holding an apple, 8k clean`
-   `a man holding a watermelon, 8k clean`
-   `a man holding a gun, 8k clean`

列表使用的语法与 CSV 文件中的一行相同，所以如果你想在你的条目中加入逗号，你可以
在你的条目中加入逗号，你必须将文本放在引号中，并确保引号之间没有空格。
确保引号和分隔逗号之间没有空格。

-   `darkness, light, green, heat` - 4 items - `darkness`, `light`, `green`, `heat`
-   `darkness, "light, green", heat` - 错误示例 - 4 items - `darkness`, `"light`, `green"`, `heat`
-   `darkness,"light, green",heat` - 正确示例 - 3 items - `darkness`, `light, green`, `heat`

### 设置示例

引用官方 Wiki 的设置图：

![引用官方 Wiki 的设置图](../../assets/xy_grid-medusa-ui.webp){width=1559 height=1038 loading=lazy}

## Variations 变化种子

`Variation strength slider` 和 `Variation seed field` 允许您指定现有图片应更改多少以使其看起来不同。
在最大强度下，图片种子将完全取决于 Variation seed；在最小强度下，图片种子将完全取决于原始种子。（使用 Ancestral 采样器时除外）。

![引用官方 Wiki 的设置图](../../assets/seed-variations.webp){width=2432 height=2637 loading=lazy}

## 样式模板

`Save prompt as style` 按钮可将当前的提示词写入 `styles.csv` 作为模板使用。该文件包含所有保存的模板。

右侧的下拉框将允许您从以前保存的样式中选择任何样式，并自动将其 **附加** 到输入中

要删除样式，请从 `styles.csv` 中手动将其删除并重新启动程序。

## Face restoration 真人人脸修复

适用于修复真人图片的面部问题。对动漫图片效果较差。

[Face Restoration @ WebUI Wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#face-restoration)

## xformers

xformers 分辨率越高加速效果越好。使用 xformers 会引入一些随机性，稍微影响生成的图像。

如果你使用 Pascal、Turing 或者 Ampere 架构的卡（包括 GTX 1000，RTX 2000、3000 系列），将 `--xformers` 参数添加到 `webui-user.bat` 中的 `COMMANDLINE_ARGS`。

::: tip
有人说在 700 和 900 系列卡上使用 xformers 的性能明显较差，请注意这一点。
本人实测，2050 在启用 xformers 之后，速度慢了 50%
:::

::: warning
注意使用 xformers 优化加速将使得同种子生成的图片存在细微差异。
:::

通常不需要自行编译 xformers。如果需要编译，见 [在 Windows 上编译 xformers](other#在-windows-上编译-xformers)

## 使用 CPU 进行绘画

根据此 [PR](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/2597)

可以通过 `--use-cpu all` 尽可能的使用 CPU 进行生成，虽然慢 100 倍。

## 附加功能 Extras

SD-WebUI 的 Extras 页有一个自带的超分功能，可以使用 `ESRGAN_4x` 模型提升图片分辨率。

当然 `RealESRGAN` 或者 `RealCUGAN` 也可以。

::: tip 相关模型
文件统一下载到 `SDwebUI文件夹\models` 下

[LDSR](https://heibox.uni-heidelberg.de/f/578df07c8fc04ffbadf3/?dl=1)，文件大小为 1.9GB

[BSGRAN 4x](https://github.com/cszn/KAIR/releases/download/v1.0/BSRGAN.pth) ，文件大小为 63.9M

[ESRGAN_4x](https://github.com/cszn/KAIR/releases/download/v1.0/ESRGAN.pth)，文件大小为 63.8MB

[ScuNET GAN/PSNR](https://github.com/cszn/KAIR/releases/download/v1.0/scunet_color_real_gan.pth" to D:\stable-diffusio\models\ScuNET\ScuNET.pth)，文件大小为 68.6MB

[SwinIR 4x](https://github.com/JingyunLiang/SwinIR/releases/download/v0.0/003_realSR_BSRGAN_DFOWMFC_s64w8_SwinIR-L_x4_GAN.pth)，文件大小为 136MB
:::

### Upscaler 选择

`SD Upscaler` 在注重细节的同时还提升分辨率。

曾经有段时间，`LSDR` 被认为是最好的。有些人喜欢 `swinir`，有些喜欢 `esrgan4x`、`ymmv`，推荐使用 `ESRGAN_4x`

如果你要搞二次元，推荐使用 [Real-CUGAN](https://github.com/bilibili/ailab/tree/main/Real-CUGAN)

## 图像去噪

推荐使用 [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) 降噪。

![效果](../../assets/realesrgan-teaser.webp){width=1844 height=870 loading=lazy}

> 效果图

## 自定义.css

创建一个名为 user.css 的文件并放在 webui.py 旁，将自定义 CSS 代码放入 user.css 中。

下面的例子将设置画廊的最短长度：

```css
#txt2img_gallery,
#img2img_gallery {
    min-height: 768px;
}
```

## 更换提示音

如果在 webui.py 附近存在 `notification.mp3` 文件，它将在图片生成结束后播放。
