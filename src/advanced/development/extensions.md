---
outline: [2, 3]
---

# 插件

## 开发插件

WebUI 通过以下方式与插件交互：

-   如果存在 `install.py` 脚本，它将被执行。
-   插件 `scripts` 目录中的脚本将被执行，就好像它们只是普通的自定义脚本一样，除了：
    -   `sys.path` 被设为插件所在目录，因此您可以在其中导入任何内容而无需担心污染环境
    -   您可以使用 `scripts.basedir()` 来获取当前扩展的目录（因为用户可以将其命名为任何他想要的名称）
-   `javascript` 目录中的文件被添加到前端页面
-   `localizations` 目录中的语言文件将被添加到设置中；如果有两个同名的语言文件，它们将互相覆盖。
-   插件的 `style.css` 文件被添加到页面
-   如果插件在其根目录中有 `preload.py` 文件，则在解析命令行参数之前加载它
-   如果插件的 `preload.py` 有一个 preload 函数，它会被调用，命令行参数解析器会作为参数传递给它。这是一个如何使用它来添加命令行参数的示例：

```python
def preload(parser):
    parser.add_argument("--wildcards-dir", type=str, help="directory with wildcards", default=None)
```

关于如何开发自定义脚本（通常是插件的主要内容)，请参阅 [开发自定义脚本](./scripts.md#开发自定义脚本)。

详见 [Developing extensions](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Developing-extensions)

## 插件案例

安装完毕重启程序。目前 SD-WebUI 已经自带扩展管理器界面。

### DreamBooth extension

Dreambooth Extension for Stable-Diffusion-WebUI

https://github.com/d8ahazard/sd_dreambooth_extension

### training-picker

stable-diffusion-webui 的扩展，允许用户通过视频的关键帧进行复用，并自动从各个关键帧中挑选和导出训练示例。

https://github.com/Maurdekye/training-picker

### 随机艺术家插件

[项目地址](https://github.com/yfszzx/stable-diffusion-webui-inspiration)

```bash
cd extensions
git clone https://github.com/yfszzx/stable-diffusion-webui-inspiration.git extensions/stable-diffusion-webui-inspiration
```

### 美学权重插件

[项目地址](https://github.com/AUTOMATIC1111/stable-diffusion-webui-aesthetic-gradients)

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui-aesthetic-gradients.git extensions/aesthetic-gradients
```

### 历史记录画廊

[项目地址](https://github.com/yfszzx/stable-diffusion-webui-images-browser)

```bash
cd extensions
git clone https://github.com/yfszzx/stable-diffusion-webui-images-browser.git extensions/stable-diffusion-webui-images-browser
```

### Wildcards 通配符

[项目地址](https://github.com/AUTOMATIC1111/stable-diffusion-webui-wildcards)

允许使用类似 `__name__` 提示的语法，以从名为 `name.txt` 的文件中获取随机一行。

### Deforum

[项目地址](https://github.com/deforum-art/deforum-for-automatic1111-webui)

Deforum 的官方 API，一个用于 2D 和 3D 动画的扩展脚本，supporting keyframable sequences, dynamic math parameters (even inside the prompts), dynamic masking, depth estimation and warping.

### Video2Video

将 视频 投入 Img2Img,输出带有关键帧的视频。

https://github.com/Leonm99/Stable-Diffusion-Video2Video

### Img2img Video

https://github.com/memes-forever/Stable-diffusion-webui-video

### Artists To Study

把 https://artiststostudy.pages.dev 添加到 WebUI

https://github.com/camenduru/stable-diffusion-webui-artists-to-study

### 美学权重评分器

计算生成图像的美学分数

https://github.com/tsngo/stable-diffusion-webui-aesthetic-image-scorer

### Tokenizer

stable-diffusion-webui 的一个扩展，增加了一个标签，让你预览 CLIP 模型将如何标记你的文本。

https://github.com/AUTOMATIC1111/stable-diffusion-webui-tokenizer
