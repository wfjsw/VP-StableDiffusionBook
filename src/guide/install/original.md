---
outline: [2, 3]
---

# 安装 NovelAI 原版后端

详见此教程: [NovelAI 原版网页UI+后端部署教程](https://telegra.ph/NovelAI-%E5%8E%9F%E7%89%88%E7%BD%91%E9%A1%B5UI%E5%90%8E%E7%AB%AF%E9%83%A8%E7%BD%B2%E6%95%99%E7%A8%8B-10-10)

## 硬件需求

一台拥有一张至少有 11G 显存的 NVIDIA GPU 的 Linux 系统的 x86 设备。

建议显存低于 24G 不要尝试使用官方版本前后端.

## 软件需求

- NVIDIA CUDA 驱动 (CUDA Toolkit 11.6)
- Docker 19+
- nvidia-container-toolkit

### 安装 Docker

```bash
curl -fsSL https://get.docker.com | bash

# 国内镜像

curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

### 驱动相关

**安装显卡驱动**

使用 `nvidia-smi` 查看显卡状态。

使用 `docker run --help | grep -i gpus` 确认nvidia-container-toolkit安装成功。

### 运行相关

#### 容器状态

查询出容器 ID `docker ps`

查看容器日志 `docker logs [Container ID]`

出现 “Application startup complete.” 即代表程序已经就绪

**请求 API**

参考代码，具体参照leak的前端后端项目，以及其中的 `sd-private\hydra-node-http\main.py`

`prompt` 中 `masterpiece, best quality`, 开头对应原版 `Add Quality Tags` 选项，不建议删除，后面直接跟自己 `prompt` 即可

`uc` 部分对应 *Undesired Content*，建议保留默认

`sampler` 是采样方法，可选 `plms/ddim/k_euler/k_euler_ancestral/k_heun/k_dpm_2/k_dpm_2_ancestral/k_lms`

`seed` 是种子，自己随机一个整数数字，不然一直会出一样的结果

n_samples 代表要生成几张图片

```python
import requests
import json
import base64
import random

endpoint = "http://10.10.12.67/generate"
data = {
  "prompt": "masterpiece, best quality, brown red hair,blue eyes,twin tails,holding cat",
  "seed": random.randint(0,2**32),
  "n_samples": 1,
  "sampler": "ddim",
  "width": 512,
  "height": 768,
  "scale": 11,
  "steps": 28,
  "uc": "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
}


req = requests.post(endpoint, json=data).json()
output = req["output"]

for x in output:
  img = base64.b64decode(x)

  with open("output-" + str(output.index(x)) + ".png", "wb") as f:
    f.write(img)
```
