---
outline: [2, 4]
---

# 硬件要求

## 内存

建议使用不少于 16 GB 内存。在一些情况下，可能需要调高虚拟内存，以容纳模型文件。

## 存储

建议准备 40 GB 以上的可用硬盘空间。

## 显卡

::: warning
注意显卡温度，有报道称显卡太热炸了。
:::

### 显卡型号

首先，很不幸地，因为需要用到 CUDA 加速，所以只有 **英伟达显卡** 支持良好。（AMD 可以用但速度明显慢于英伟达显卡，~~当然没显卡也可以用 CPU 花几百倍时间生成~~）

对于 **Linux 系统 + AMD 显卡** 请读 [AMD 安装指南](https://rentry.org/ayymd-stable-diffustion-v1_4-guide) 和 [AMD 安装 WebUI 指北](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Install-and-Run-on-AMD-GPUs)

[对于支持 AMD GPU 方案相关讨论](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/1046)

::: danger 显卡保修
显卡厂家对于深度学习卡的保修政策等同于矿卡

过度玩耍(比如连续 3 天出图)，显卡会有坏掉的风险
:::

[各种显卡的稳定扩散性能测试报告](https://docs.google.com/spreadsheets/d/1Zlv4UFiciSgmJZncCujuXKHwc4BcxbjbSBg71-SdeNk/edit#gid=0)

### 检查配置

#### 检查显卡驱动

通过

```bash
nvidia-smi
```

判断 CUDA 是否可用。

#### 检查 PyTorch 是否成功载入 CUDA

打开命令窗，输入 `python` 进入，分行输入

```python
import torch
print(torch.__version__)
print(torch.cuda.is_available())
```

如果出现 `True` 字样则正常。

#### 查看 torch 对应的 CUDA 版本

```python
import torch
torch.version.cuda
```

输入 <kbd>Ctrl</kbd> + <kbd>Z</kbd> 退出

如果出现了任何错误，请询问他人或使用搜索引擎解决。

### 多 GPU 支持

最简单的模式就是实现一个多数据并行处理的方法，通过 `--device-id` 参数启动多个实例。每个 GPU 加载一个模型，然后给它们分配工作。

考虑到这个项目所提供的功能众多，我（作者）认为可能需要一段时间才能在并行的情况下使用所有的功能。

[作者的回应](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/156#issuecomment-1241218733)

> Using memory from between two GPUs is not simple. I only have one so I can't research/develop this.

### 16xx 系显卡使用半精度生成图片

[16xx 系显卡可以使用半精度生成图片的方式](https://t.me/StableDiffusion_CN/50749)

方案来自 [这个讨论](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/28#issuecomment-1241448049)

1. 激活 webui 使用的 venv，要在正确的虚拟环境里运行
2. 卸载掉现在所用的 torch 和 torchvision：

```bash
pip uninstall torch torchvision
```

3. 重新安装 `CUDA 11.6` 编译的 `torch` 和 `torchvision`。

```bash
pip install torch torchvision --extra-index-url https://download.pytorch.org/whl/cu116
```

4. 下载 `CUDNN_8.5` 备用。

使用下载工具下载，直接下载会跳转到 NVIDIA 的开发者注册界面

Windows:

<https://developer.nvidia.com/compute/cudnn/secure/8.5.0/local_installers/11.7/cudnn-windows-x86_64-8.5.0.96_cuda11-archive.zip>

其他版本：

<https://developer.nvidia.com/rdp/cudnn-archive>

5. 将 CUDNN 8.5 压缩包里的 bin 和 lib 文件夹里的所有文件复制到 `venv\Lib\site-packages\torch\lib` 里，覆盖所有文件。
6. 然后 16xx 系显卡也可以愉快地使用半精度生成图片了！大幅降低显存占用，6G 加载 Full 模型可以生成 1024x640 的图片。

但是，依然不能使用 `DDIM Sampling` ，但可以使用 `Euler a`

## 网络

安装时涉及到的大部分内容在国内的可访问性均不佳，建议自备加速手段。
