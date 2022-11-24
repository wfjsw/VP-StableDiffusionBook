---
outline: [2, 3]
---

# 自定义脚本

此主题的内容可能不会即时更新到此处，[源地址](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Custom-Scripts#prompt-interpolation)

## 开发自定义脚本

你可以在 `modules/scripts.py` 中找到Script类。

如果要创建你自己的自定义脚本，请创建一个实现类的 python 脚本，并将其放到 `scripts` 文件夹中，使用以下示例或文件夹中已有的其他脚本作为指导。

Script 类有四个主要方法，这里通过一个简单的[示例脚本](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Developing-custom-scripts)进行更详细的描述，这个脚本可以旋转和/或翻转生成的图像。

[这里](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Custom-Scripts) 有很多社区共享的脚本，可以将文件添加到 `scripts/` 文件夹中。

## 自定义脚本案例

### sd-dynamic-prompts

实现用于随机提示语生成的微型模板语言。 

https://github.com/adieyal/sd-dynamic-prompts

### Depth Maps for Stable Diffusion

从生成的图像中创建深度图。

https://github.com/thygate/stable-diffusion-webui-depthmap-script

### sd-lexikrea

Automatic1111 Stable Diffusion 的脚本，用于从 krea 和 lexica 中提取提示。 

https://github.com/Vetchems/sd-lexikrea

### Advanced prompt matrix

https://github.com/GRMrGecko/stable-diffusion-webui-automatic/blob/advanced_matrix/scripts/advanced_prompt_matrix.py

安装后可以使用以下语法

```
<cyber|cyborg|> cat <photo|image|artistic photo|oil painting> in a <car|boat|cyber city>
```

### XYZ 绘图脚本 

生成一个 .html 文件以交互浏览图像集。 使用滚轮或箭头键在 Z 维度中移动。

https://github.com/xrpgame/xyz_plot_script

### Embedding to PNG

将一个已经存在的 Embeddings 转换为 PNG 表示。

https://github.com/dfaker/embedding-to-png-script

### Random Steps and CFG

https://github.com/lilly1987/AI-WEBUI-scripts-Random

