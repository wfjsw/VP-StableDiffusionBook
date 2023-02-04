# 其他

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

## 4GB 显卡支持

针对具有低 VRAM 的 GPU 的优化。这应该可以在具有 4GB 内存的视频卡上生成 512x512 图像。

`--lowvram` 是 basujindal 对优化思想的重新实现。模型被分成模块，GPU 内存中只保存一个模块；当另一个模块需要运行时，前一个模块将从 GPU 内存中卸载。这种优化的性质使处理速度变慢——与我的 RTX 3090 上的正常操作相比，速度慢了大约 10 倍。

`--medvram` 是另一个优化，通过不在同一批次中处理条件和无条件去噪，可以显着减少 VRAM 的使用。这种优化的实现不需要对原始的稳定扩散代码进行任何修改。

::: info
经过 10/10 的优化，RTX2050 的 4GB 显卡也可以使用 `--medvram` 。
:::

当然也可以减半精度，或者生成一张 64x64 图片清理显存。

## 速度判定

注意区分 `it/s` 与 `s/it`。

终端的 `it/s` 速率是大致速率，在一秒钟可完成多次迭代时显示，代表每秒钟迭代次数。数字升高代表加速。

`s/it` 速率是上值的倒数，在一秒钟无法完成一次迭代时显示，代表每次迭代所需秒数。因此，数字降低代表加速。

## 在 WebUI 中使用 SD 2.0 模型

目前仅支持 Stable Diffusion 2.0-v 模型。

1. 将 WebUI 更新为最新版。
2. 下载 [768-v-ema.ckpt](https://huggingface.co/stabilityai/stable-diffusion-2/blob/main/768-v-ema.ckpt) 模型文件，放置在 `models/Stable-Diffusion` 目录中。
3. 下载 [v2-inference-v.yaml](https://raw.githubusercontent.com/Stability-AI/stablediffusion/main/configs/stable-diffusion/v2-inference-v.yaml)，改名为 `768-v-ema.yaml` 放置在 `models/Stable-Diffusion` 目录中。
4. 选择使用新的模型。

在使用 2.0 模型时，训练面板可能无法使用。

## 在 Windows 上编译 xformers

::: tip
你可以在 [这里](https://rentry.org/25i6yn) 下载预构建的 xformers！记得先查看 [GPU 架构](https://developer.nvidia.com/cuda-gpus)
:::

确保 Python 版本为 3.10 或更高版本(使用 `python --version` 查看)，然后安装下述应用：

<!-- TODO: 11.6 没问题 -->

-   安装 [VS Build Tools 2022](https://visualstudio.microsoft.com/zh-hans/downloads/?q=build+tools)，运行安装时只需要选择 `Desktop development with C++`
-   安装 [CUDA Toolkit](https://developer.nvidia.com/cuda-downloads)。可选择 `Custom` 安装方式，删除一些如 Nsight、Visual Studio 集成等无用组件。

1. 确认 nvcc 可用

```cmd
nvcc --version
```

2. 克隆 `xFormers` 存储库，在环境中激活它

```cmd
git clone https://github.com/facebookresearch/xformers.git
cd xformers
git submodule update --init --recursive
```

3. 创建虚拟环境且激活环境

```bash
python -m venv venv

#CMD
venv\Scripts\activate.bat
#Bash
source ./venv/bin/activate
#WindowsBash
source ./venv/Scripts/activate
```

4. 为避免获取 CPU 版本时出现问题，请单独安装 pyTorch：

```bash
pip install torch torchvision --extra-index-url https://download.pytorch.org/whl/cu113
```

5. 然后安装其余的依赖项

```bash
pip install -r requirements.txt
pip install wheel
pip install ninja
```

6. 如果使用 CUDA 11.6 之前的旧版本，需要强制启用它以在 MS Build Tools 2022 上构建。

在 CMD 设置

```cmd
set NVCC_FLAGS=-allow-unsupported-compiler"
```

或在 Bash 设置

```bash
export NVCC_FLAGS=-allow-unsupported-compiler
```

7. 查看你自己的 GPU 架构

[GPU 架构表](https://developer.nvidia.com/cuda-gpus)

比如说，如果你的 GPU 是 GTX 1070，基于该表，架构是 6.1

_CMD_

```cmd
set TORCH_CUDA_ARCH_LIST=6.1
```

_BASH_

```bash
export TORCH_CUDA_ARCH_LIST=6.1
```

8. 构建 xFormers，请注意构建将需要很长时间（可能需要 10-20 分钟），它最初可能会抱怨一些错误，但它仍然应该可以正确编译。

9. 在环境中安装

```bash
python setup.py build
python setup.py bdist_wheel
```

找到 dist 文件夹并将文件 `*.whl` 复制到 `stable-diffusion-webui`

在 `stable-diffusion-webui` 目录中安装`.whl`。

如果构建的 whl 名称不同，请在下面的安装命令中更改文件名

```bash
#CMD
./venv/scripts/activate
#Bash
source ./venv/bin/activate
#WindowsBash
source ./venv/Scripts/activate
pip install xformers-0.0.14.dev0-cp310-cp310-win_amd64.whl
```

30 系显卡正常启动，在 `COMMANDLINE_ARGS=` 加 `--xformers` 参数, 其他显卡加 `--force-enable-xformers` 参数

### Windows 编译错误自查

> 错误:`Filename too long` 和 `fatal error C1083: Cannot open compiler generated file: '': Invalid argument`

说明你的路径太长了。

> RuntimeError: CUDA error: no kernel image is available for execution on the device

现在更多 GPU 架构是自动支持的，尝试重新安装并使用 --xformers 参数。

如果你移动了 xformers，那么应该删除里面的 venv 目录。

[Windows](https://github.com/C43H66N12O12S2/stable-diffusion-webui/releases) (30 系之外要自己编译)

自己编译指路 [wiki/Xformers](https://rentry.org/sdg_faq#xformers-increase-your-its-more-cards-supported) 还有 [这个 Post](https://www.reddit.com/r/StableDiffusion/comments/xz26lq/automatic1111_xformers_cross_attention_with_on/)

## 修剪模型

见 [Voldy Retard Guide - Pruning a .CKPT](https://rentry.co/voldy#-pruning-a-ckpt-)。

将要修剪的 `.ckpt` 文件放在 `/stable-diffusion-webui` 文件夹，把 [脚本](https://raw.githubusercontent.com/harubaru/waifu-diffusion/main/scripts/prune.py) 另存本地，删除第 6 行和 第 8 行。然后在 prune.py 中的最后一行编辑 ckpt 的名称。

比如，`prune_it('wd-v1-2-full-emma.ckpt')`

然后运行这个脚本，修剪过程可能需要几分钟。
