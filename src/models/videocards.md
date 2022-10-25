# 关于显卡

!!! tip
    注意显卡温度，有报道称显卡太热炸了。

先判断 cuda 是否可用。

打开命令窗，输入 python 进入，分行输入

```
import torch
print(torch.__version__)
print(torch.cuda.is_available())
```


**查看 torch 对应的 cuda 版本**

```
torch.version.cuda
```

输入 ctrl + z 退出


## 多 GPU 支持

Easiest mode would be implementing a ~data parallel approach, in which we have one model per GPU and you distribute the workload among them.

Given the amount of features this repo provides I think it could take some time to have em all supported in the parallel version.

[查看此 issue 页面](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/156)

## 16xx系显卡使用半精度生成图片[^3]

方案来自 [这个讨论](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/28#issuecomment-1241448049)

1. 激活webui使用的venv,要在正确的虚拟环境里运行

2. 卸载掉现在所用的 torch 和 torchvision:

```
pip uninstall torch torchvision
```

3. 重新安装 `cuda 11.6`编译的 `torch` 和 `torchvision`。

```
pip install torch torchvision --extra-index-url https://download.pytorch.org/whl/cu116
```

4. 下载 `Cudnn_8.5` 备用。

使用下载工具下载，直接下载会跳转到 Nvidia 的开发者注册界面

Windows: <https://developer.nvidia.com/compute/cudnn/secure/8.5.0/local_installers/11.7/cudnn-windows-x86_64-8.5.0.96_cuda11-archive.zip>

其他版本：<https://developer.nvidia.com/rdp/cudnn-archive>

5. 将Cudnn 8.5压缩包里的bin和lib文件夹里的所有文件复制到 `venv\Lib\site-packages\torch\lib` 里，覆盖所有文件。

6. 然后16xx系显卡也可以愉快地使用半精度生成图片了！大幅降低显存占用，6G加载Full模型可以生成1024x640的图片。

但是，依然不能使用 `DDIM Sampling` ，但可以使用 `Euler a`
