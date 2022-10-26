# 调参魔法

>此页面等待精修

>Todo 
>修复混乱的逻辑
>


这节会介绍 参数 和 相关的 WebUI(SD)  网页应用资源。如果你会画画，那么效果会更加稳定可观。

标签参考应该使用 [Danbooru wiki Tag](https://danbooru.donmai.us/wiki_pages/help:home) 和 [MidJourney-Styles-and-Keywords-Reference](https://github.com/willwulfken/MidJourney-Styles-and-Keywords-Reference) ，因为它们都比较原生。 

如果需要中文的标签参考，请看[调参魔法书](https://docs.google.com/spreadsheets/d/e/2PACX-1vRa2HjzocajlsPLH1e5QsJumnEShfooDdeHqcAuxjPKBIVVTHbOYWASAQyfmrQhUtoZAKPri2s_tGxx/pubhtml)和 [手抄魔法本](https://docs.google.com/spreadsheets/d/14Gg1kIGWdZGXyCC8AgYVT0lqI6IivLzZOdIT3QMWwVI/)

如果你习惯阅读日语的标签参考和技巧，可以在 [日语Wiki](https://seesaawiki.jp/nai_ch/d/%be%ec%bd%ea%a1%a6%c7%d8%b7%ca) 中进行检索。

如果你觉得查表很麻烦，可以打开 [Danbooru 标签超市](https://tags.novelai.dev/),[项目地址](https://github.com/wfjsw/danbooru-diffusion-prompt-builder) 或者[AI绘画tag生成器](https://aitag.top/)(后者不支持负面Tag)

如果你不想读文字，可以打开 [推荐的视频教程](https://space.bilibili.com/35723238/channel/collectiondetail?sid=779851)，但需要了解 **通过 AI 模仿画风，特定镜头，增加特效，微修微调，PS嫁接出图，通过3D特定姿势，重画，迭代** 等等操作的话，需要**通读**下面的内容。


>提前告知：WebUI 的设置页面需要按下 `Apply setting` 才能保存设置。


## 基本流程

![WorkFlow](https://raw.githubusercontent.com/sudoskys/StableDiffusionBook/main/resource/draw_workflow.svg)

这幅图演示了循环迭代的流程
迭代方式，有循环迭代和线性迭代两种，线性迭代适用于多样性测试，而 **循环迭代** 是优化的更好选择。

来回改提示+固定种子并不是好选择。

目前研究基本方向是

- 提示词 + PS/Inpaint(微修/嫁接)

- 提示词 + 3D 参考

### 迭代草图[^8]

这里讨论一下如何将**手绘草图**通过 Ai 绘画优化，*注意不是二次元*。

在第一次迭代中，您不需要太多 Steps，CFG 可以非常低（以获得更好的多样化结果），如果不想完全丢失草图，Denoising 应该在 0.3-0.4 左右。

在最后的迭代中，增加 Steps 和 Denoising 强度（但不超过 0.8，否则图像将被破坏，尤其是在大于 512*512 时）请参见[这里](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/2213#issuecomment-1274137775)，同时根据需要提高 CFG 和尺寸。

你可以随时修复提示（添加或删除出现的细节）并尝试不同的采样器。

另外，你不应该在初次生成使用一个固定不变的种子？

如果你提供一个种子（而不是随机的 -1），你的图像很快就会变得过饱和、过度锐化、过度像素化..... 当然如果想微调，可以使用固定种子。



## 魔法入门

请先在前面了解一下 WebUI(SD) 网页应用的参数。


### 提示词语法简介

对于NAI用户，请阅读[官网Docs](https://docs.novelai.net/image/promptmixing.html)

!!! tip
    两方的提示词语法**不通用**
    用 `()`在WebUI做增强，而在NAi用 `{}` 做增强，注意NAI不支持单个词语指定权重

    如果你想便捷转换权重，可以使用[转换服务](https://t.me/M2NM2NBot)

**表示方法**

分隔，英文半角 `,` 做分隔符，在英文逗号前后存在一个或数个空格并不影响实际使用。

混合，WebUI 使用 `|` 分隔多个关键词以混合多个要素，字面意义上的混合，可以多个使用。

增强，用 `(提示词:权重)` 在 WebUI 权重增强，增强的范围是 `0.1 ~:100`，允许小数。NAI使用 `{}`

!!! tip
    `a ((((farm))), daytime` 的语法可能会吃掉逗号

渐变，使用 `[some1:some2:num]`

`[fantasy:cyberpunk:16]` 代表从第 16 step 后，使用 `cyberpunk` 标签替换 `fantasy`

`[to:when]` 在固定数量的step后添加 `to` 到提示 ( when)

`[from::when]` 在固定数量的step后从提示中删除 `from`( when)

转义，WebUI 对于带括号的参数，`a (word)`  请在参数中使用 `\` 字符转义为 `a \(word\)`。

降低权重，`[]` 或者 `(word:0.952)`。NAI 仅能使用 `[]`

交替（alternate prompt）[^7]，这使您可以创建动物、人或风格的混合体，每一个 step 切换一个项，`[alison brie|emma stone|elizabeth olsen|scarlett johansson|anne hathaway|emma roberts], still film` 这是WebUI 语法，在 NAI 中是混合。

!!! tip "NAI"

    NAI中不允许单独指定权重，但支持混合权重 `cat:1|happy:-0.2|cute:-0:3` 这样的语法。
    
    因为NAI使用的是 WebUI 2022 年 9 月 29 日之前的实现，所以权重增强语法是旧的 `{}` ，新的 WebUI 更改为 `()`。
    
    **换算关系**
    NAI的 [word] = WebUI(word:0.952)(0.952 = 1/1.05)

    NAI的{word} = WeUi的(word:1.05)

    NAI花括号权重为1.05/个，WebUI圆权重为1.1/个
    


### 如何书写提示词(提示)

结合法术书编写它。

- 自然语言

可以直接使用自然语言，WebUI(SD) 有自然语言处理能力(英文句子),也可以使用 颜文字 和 emoji

- 参数[^6]

将你想要的相似的提示词组合在一起，并将这些按从最重要到最不重要的顺序排列。

可以使用 艺术家，工作室，摄影术语，角色名字，风格，特效等等。这些内容可以在 上面提到的法术书(示例集)查看，这些项目在关于中可以看到。

```
图片的质量
图片的主题
他们的外表
他们的情绪
他们的衣服
他们的姿势
图片的背景
```

[为文字转图像Ai提示编写指南：A Guide to Writing Prompts for Text-to-image AI](https://docs.google.com/document/d/1XUT2G9LmkZataHFzmuOtRXnuWBfhvXDAo8DkS--8tec/edit#)

**书写长度**

- 提示不要太长，超过 100 就有失败风险。

根据 手抄本的Tip，由于GPT-3模型限制，prompt 并不是无限的，positive token 在 75-80 之间，negative 大概65，加太多会提示你 xxx of xxx are truncated，所以别人那边的圣经不要照抄，太长的咒语后半都没有意义了，所以用简易反咒就足够，除非你有特定想屏蔽的东西。

当提示超过75个`token`（比如150个`token`）时，WebUI 将分组提示词，提交多组75个 `token`。标记只具有同一集合中其他内容的上下文。这意味着您可能在第一组和第二组之间的边界处有`bule hair`，标记`blue`将在第一组中，`hair`将在第二组中。这导致了结果的不准确，因为这两个词是分开的。

新版本增加了一个选项 `Increase coherency by padding from the last comma within n tokens when using more than 75 tokens`

这个设置让程序试图通过查找最后N个标记中是否有最后一个逗号来缓解这种情况，如果有，则将所有经过该逗号的内容一起移动到下一个集合中。

!!! tip "比如"

    有词条为 `...,Comma,blue hair,PADDING,...`

    第75个词为 `blue`

    使用该选项前

    集合1:{[74]=Comma，[75]=blue}，集合2:{[76]=hair, [77]=PADDING}

    使用该选项后

    集合1:{[074]=Comma，[75]=PADDING}，集合2:{[76]=blue，[77]=hair}

    如果您的提示小于等于75个标记，不会发生分组。

**书写格式**

为了方便书写改动，多行书写的建议格式如下

```
masterpiece,
1girl,  hatsune miku, 
look at viewer,turning back,
blow wind, cyan hair, two side up, cyan eyes,eardrop,dress,
caustics, masterpiece, high resolution,
```

第一行指定作品风格类型，第二行指定人物，第三行指定动作，第四行指定场景和着装，第五放指定其他参数

以上顺序已经比较合理，但是你也可以调整提示词的顺序以产生不同的结果。 你可以手动调整，也可以 [使用 X/Y 图自动生成各种顺序](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/1607)

Ai 难以解析下划线，请少用。

**风格化**

Nai 出图默认是一种风格，你可以通过 训练风格模型，指定风格关键词等方法来创作带有特效或指定画风的图片。

[NovelAI使用教程和魔咒课堂](https://space.bilibili.com/8612008/channel/collectiondetail?sid=787691)

[人偶教室的测试记录](https://www.yuque.com/longyuye/lmgcwy)

[风格化: 32种](https://www.bilibili.com/video/BV1TP411N71t/)

更全面的指南在页尾。

### 调序编译

提示词放入的顺序就是优先级~

webui 突破 tag 75 个限制的方式是把 75 个分为一组。

出于提高可读性的目地，推荐主体往前放，接着描述装扮的词，画质提升词穿插在这些描述词之间，一般为了提高成品率要把动作、nsfw 词等改变构图的词往后放，或者手动调低权重。

以上排序是每组tag都要遵守的，所以如果后面的tag超过 75 了就应该把前面的分一部分过来。


### Batch count&batch size

`batch count` 指定训练几批次图像。

`batchsize` 中文翻译为批大小（批尺寸）

简单点说，批量大小将决定我们一次训练的样本数目。 batch_size将影响到模型的优化程度和速度。

还要注意 `batch size` 是为了在`内存效率`和`内存容量`之间寻找最佳平衡，因为单个 512x512 图像生成中，GPU 资源没有被充分利用。更大的图像从中获得的收益更少。

!!! info
    迭代是重复反馈的动作，神经网络中我们希望通过迭代进行多次的训练以到达所需的目标或结果。
    每一次迭代得到的结果都会被作为下一次迭代的初始值。
    一个迭代 = 一个正向通过+一个反向通过


### (提示词)影响因子[^6]
 
"调参魔法" 的一个基本技能是设置权重。

[Wiki:魔导师介绍](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#attentionemphasis)

具体规则如下

```
a (word) - 将权重提高 1.1 倍

a ((word)) - 将权重提高 1.21 倍（= 1.1 * 1.1），乘法的关系。

a [word] - 将权重减少 1.1 倍

a (word:1.5) - 将权重提高 1.5 倍

a (word:0.25) - 将权重减少 4 倍 (= 1 / 0.25)

a \(word\) - 在提示中使用文字 () 字符
```

必须使用 `()`指定，可以像这样指定权重：(text:1.4)

如果未指定权重，则假定为 `1.1`

指定权重仅适用于 `()` 而不是 `[]`，注意 `[]` 削减语法，指定单个权重仅适用于WebUI 且使用 `()`

```
> ( n ) = ( n : 1.1 )  
> (( n )) = ( n : 1.21 )  
> ((( n ))) = ( n : 1.331 )  
> (((( n )))) = ( n : 1.4641 )  
> ((((( n )))) = ( n : 1.61051 )  
> (((((( n )))))) = ( n : 1.771561 )  
```

`(cat :2 | dog)` 也就是更像猫的狗

在 WebUI 中需要使用 `()`指定权重！可以像这样指定权重：(text:1.4)。如果未指定权重，则假定为 1.1。



!!! info
    权重增加通常会占一个提示词位。在token紧张的情况下没有必要加特别多括号。
    
    过多圆括号会导致 字符 被程序吃掉，`a ((((farm))), daytime`会变成 `a farm daytime` 而没有逗号。
    
!!! tip "NAI"

    NAI中不允许单独指定权重，但支持混合权重 `cat:1|happy:-0.2|cute:-0:3` 这样的语法。
    
    因为 NAI 使用的是 WebUI 2022 年 9 月 29 日之前的实现，所以权重增强语法是旧的 `{}` ，新的 WebUI 更改为 `()`。
    
    **换算关系**
    NAI的 [word] = WebUI(word:0.952)(0.952 = 1/1.05)

    NAI的{word} = WeUi的(word:1.05)

    NAI花括号权重为1.05/个，WebUI圆权重为1.1/个

??? tip "How It Work"
    每个单词都有一个768个值的相关向量，该向量“指向”概念的方向（在768维空间中）。
    
    如果你缩放这个向量，这个概念会变得更强或更弱。

    From [Here](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/2905)

### 消极提示词

WebUI(SD)网页应用会在生成时**拒绝消极提示词有关的内容**。

比如使用以下提示词削除水印和文字内容

```
lowres, bad anatomy, bad hands, text, error, missing fingers, 
extra digit, fewer digits, cropped, worst quality, low quality, 
normal quality, jpeg artifacts, signature, watermark, username, blurry
```

还如这个例子

```
ugly, fat, obese, chubby, (((deformed))), [blurry], bad anatomy, 
disfigured, poorly drawn face, mutation, mutated, (extra_limb), 
(ugly), (poorly drawn hands fingers), messy drawing, morbid, 
mutilated, tranny, trans, trannsexual, [out of frame], (bad proportions), 
(poorly drawn body), (poorly drawn legs), worst quality, low quality, 
normal quality, text, censored, gown, latex, pencil
```


### 渐变标签

渐变标签，指示 WebUI 在训练中替换 Token，语法使用 `[some1:some2:num]`

`[fantasy:cyberpunk:16]` 代表从第 16 step 后，使用 `cyberpunk` 标签替换 `fantasy`

`[to:when]` 在固定数量的step后添加 `to` 到提示 ( when)

`[from::when]` 在固定数量的step后从提示中删除 `from`( when)

![sample_Gradient](https://raw.githubusercontent.com/sudoskys/StableDiffusionBook/main/resource/sample_Gradient.jpg)

### 重现提示词

对于没有压缩的原图，我们可以将文件拖入 `PNG Info` 选项卡，进行提示词(Token)查看。

或者使用 [网页工具](https://spell.novelai.dev/)


### 逆向提示词

这里有一些 **Image 逆向参数服务**，可以从图片中提取相关参数，不一定准确。

[LenKiMo_Bot](https://t.me/LenKiMo_Bot)

[DeepDanbooru](https://github.com/KichangKim/DeepDanbooru)


### 已知提示词(Token)组合 / 搜索引擎

你可以访问以下传送门获取一些优秀的参数实例！（当然，中文社区的测试群有**大量素材**，一分钟20次）

[StableDiffusion_Show](https://t.me/StableDiffusion_Show)

[cyan_ai_sese](https://t.me/cyan_ai_sese)

[LEXICA搜索引擎](https://lexica.art/?q=Miku)


### Prompt matrix 参数矩阵/要素混合

使用 | 分隔多个Tag，程序将为它们的每个组合生成一个图像。 例如，如果使用 `a busy city street in a modern city|illustration|cinematic lighting` ，则可能有四种组合（始终保留提示的第一部分）：

- a busy city street in a modern city
- a busy city street in a modern city, illustration
- a busy city street in a modern city, cinematic lighting
- a busy city street in a modern city, illustration, cinematic lighting

可以进一步在关键词后添加 :x 来指定单个关键词的权重，x 的取值范围是 0.1~100，默认为 1。

`cat :2 | dog` 也就是更像猫的狗


### 提示词原理

咒语的科学原理。

![prompt_draw](https://raw.githubusercontent.com/sudoskys/StableDiffusionBook/main/resource/prompt_draw_fix.png)

> By RcINS

在程序中，提示词的解析由 CLIP 处理

[WebUI的prompt_parser](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/prompt_parser.py) 实现了渐变等功能

CLIP 无法处理中文，中文字符会被分解。

**关于权重的实现**：权重增加通常会占一个提示词位。


**关于渐变的实现**：到了指定 Step ，WebUI 程序会替换对应 提示词，达到渐变效果。

其他以此类推。

WebUI prompt 语法会转换为相应时间的 prompt,然后通过 embedding 交给 Ai 处理。


### 参数冲突(提示词)

比如 `sex` 包含较多姿势体位，在使用者想要特定姿势时，法术内单一的 `sex` tag就应该被删除。

同样地，`loli` Tag 附带了强画风属性，会很大地影响结果！改成 `female child` 会好一点。



### Step 迭代步数

更多的迭代步数可能会有更好的生成效果，更多细节和锐化，但是会导致生成时间变长。

太多的 steps 也可能适得其反，几乎不会有提高。


### Samplers 采样器

目前好用的有 `eular`，`eular a`，更细腻，和`Ddim`。

推荐 `eular a` 和 `Ddim`，**新手推荐使用 `eular a`**

`eular a` 富有创造力，不同步数可以生产出不同的图片。
PS：调太高步数(>30)效果不会更好

`DDIM` 收敛快，但效率相对较低，因为需要很多 step 才能获得好的结果，**适合在重绘时候使用**

`LMS`和`PLMS`是`eular`的衍生，它们使用一种相关但稍有不同的方法（平均过去的几个步骤以提高准确性）。大概 30 step 可以得到稳定结果

`PLMS`是一种有效的LMS（经典方法），可以更好地处理神经网络结构中的奇异性


`DPM2`是一种神奇的方法，它旨在改进DDIM，减少步骤以获得良好的结果。它需要每一步运行两次去噪，它的速度大约是 DDIM 的两倍。但是如果你在进行调试提示词的实验，这个采样器效果不怎么样

`Euler` 是最简单的，因此也是最快的之一

[英文Wiki介绍](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#attentionemphasis)

[英文论坛介绍](https://www.reddit.com/r/StableDiffusion/comments/xbeyw3/can_anyone_offer_a_little_guidance_on_the/)

- 举个例子


|预览一|预览二|
|--|--|
|<img src="https://user-images.githubusercontent.com/22421310/187063145-3d4f16d7-7bd6-4804-be1c-acf228ed2507.jpg" width="400" alt="效果">|<img src="https://raw.githubusercontent.com/sudoskys/StableDiffusionBook/main/resource/raw_sample.jpg" width="400" alt="效果">|

>不同 step 和 采样器 的不同效果


### 种子调试

实际的种子整数并不重要。它只是初始化一个定义扩散起点的随机数生成器，是一个随机初始值。

一个好的种子可以在各种提示、采样器和CFG中执行成分和颜色等内容。但是它现在作用有限。

在相同 Step ，cfg ，Seed,参数（prompts） 的情况下，生产的图片基本相同！

在同一模型和后端实现中，保持所有参数一致的情况下，相同的种子会产生同样的图片。取决于其他参数。

但是注意，**不同显卡可能会造成预料之外的不同结果**（比如精度这样的东西）

10xx 系列看起来与其他所有卡如此不同,见[这里](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/2017#discussioncomment-3873467)

### 插件

安装完毕重启程序。

#### 随机艺术家插件

[项目地址](https://github.com/yfszzx/stable-diffusion-webui-inspiration)

```bash
cd extensions
git clone https://github.com/yfszzx/stable-diffusion-webui-inspiration
```

#### 美学权重插件

[项目地址](https://github.com/AUTOMATIC1111/stable-diffusion-webui-aesthetic-gradients)

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui-aesthetic-gradients extensions/aesthetic-gradients
```

#### 历史记录画廊

[项目地址](https://github.com/yfszzx/stable-diffusion-webui-images-browser)

```bash
cd extensions
git clone https://github.com/yfszzx/stable-diffusion-webui-images-browser 
```



###  方位调参

竖着看

|人物|场景|数据限定|事件|
|----|------|-----|-----|
|表情| | | |
|头发|广狭选择|绘画类型|缩写词|
|眼睛|光影选择|评价限定|sfw/nsfw|
|衣着|背景主体|联想元素||
|状态|人物事件地|||
|姿势位||||
|镜头位||||

#### 关于多人物生成

多人最好使用草稿/有色3d + 图生图。

人数超过三个就难以控制效果，人数大于6的图像模型里没有。


#### 使用 Ai 进行立绘设计

<iframe src="//player.bilibili.com/player.html?aid=559362671&bvid=BV14e4y1U7r9&cid=869144379&page=1" scrolling="no" allowfullscreen="true" width="100%" />

> BV14e4y1U7r9



## 魔法进阶

调参基本原理模糊的说是：限定好的数据范围内相似样本越多，越稳定。

!!! tip
    请阅读前面章节的模型进阶1,了解具体的 Img2Img 和 inpaint 介绍操作。


### Img2Txt

生成按钮下有一个 `Interrogate CLIP`，点击后会下载 `CLIP`，用于生成当前图片框内图片的 Tag 并填充到提示词。

CLIP 询问器有两个部分：一个是 BLIP 模型，它从图片中创建文本描述。另一种是 CLIP 模型，它会从列表中挑选出与图片相关的几行

!!! tip 
    本文件为 [model_base_caption_capfilt_large.pth](https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_base_caption_capfilt_large.pth)
    
    大小为855MB


### Img2Img 介绍

一般我们有两种途径对图像进行修复：**PS 和 InPaint**，使用方法也十分多样。

WebUI 使用 `--gradio-img2img-tool color-sketch` 启动会带入一个插件对图片进行颜色涂抹(这里不是 Inpaint)

!!! tip "不同之处"
    PS 重新绘画投入 Img2Img 的话，会导致画风的变动，而 Inpaint 就不会。


#### 横条参数

**CFG Scale**

`cfg scale` 就是符合 prompt 的程度,Scale越高，程序对提示词越忠诚，越符合。

**Denoising strength 降低噪声**

`Denoising strength` 决定算法对图像内容的保留程度,可以减少对画风的变得，但也会弱化img2img能力。值越高 AI 对原图的参考程度就越低 (同时增加迭代次数)。

对于以图做图来说，低 `denoising` 意味着修正原图，高 `denoising` 就和原图就没有大的相关性了。一般来讲阈值是 0.7 左右，超过 0.7 和原图基本上无关，0.3 以下就是稍微改一些。


#### 图形参数

Just resize : 将图像调整为目标分辨率。除非高度和宽度完全匹配，否则图片会被挤压

Crop and resize：调整图像大小，使整个目标分辨率都被图像填充。裁剪多余部分。

Resize and fill：调整图像大小，使整个图像在目标分辨率内。用图像的颜色填充空白区域。


###  Img2Img 三渲二

调整3D模型骨架比寻找样图更容易。

可以结合 **3D建模** 摆 Pose,可以使用 MMD 相关软件。

如果是真人图片，需要适当提高 `CFG Scale`。

推荐使用 [DAZ](https://www.daz3d.com/get_studio) 或者 [blender](https://www.blender.org/) 或者 Unity ，在对 3D 模型的测试中，**色彩主要影响 AI 的绘画效果**，所以你的模型需要有纹理。

不知道 VRchat 怎么样。


### Img2Img PS重绘画/嫁接修复

使用PS软件增删元素，然后重新生产。这可以解决画手的问题。

比如我们可以通过 PS 给角色移植一个手让Ai来润色它，或者为没有下半身的半身像嫁接其他作品的下半身让 AI 润色它。

或者涂鸦特定部位指定形状动作(比如衣料的覆盖率或者形状)

![info](https://raw.githubusercontent.com/sudoskys/StableDiffusionBook/main/resource/00119_136826557_masterpiece%2C_best_quality%2C_1girl%2C_black_hair%2C_hat1.jpg)

>一张图片[^5]展现WebUI下img2img中不同参数下效果的详细对比图（prompt、steps、scale、各种seed等参数均保持一致）

纵轴是Denoising strength（线上版的strength），横轴是Variation strength

#### 关于差分

如果你想了解一些差分的实例，[5CH日语Wiki](https://seesaawiki.jp/nai_ch/d/%c7%ed%a4%ae%a5%b3%a5%e9%a5%c6%a5%af) 提供了一个实例。



#### 重绘画技巧/去除/替换

- 首先要对人物描线，然后打上色块（如果有阴影，取亮色皮肤）。
- 变动强度，选择较低的 0.3 左右的去噪。
- 然后使用 Img2Img Inpaint + 相关提示词修复，不满意可以再改，直到满意。
- 然后对图像进行超分，降噪(去除图像纹理)。

### Img2Img **Outpainting 外部修补**


Outpainting 扩展原始图像并修复创建的空白空间。
您可以在底部的 img2img 选项卡中找到该功能，在 Script -> Poor man's outpainting 下。


> Outpainting, unlike normal image generation, seems to profit very much from large step count. A recipe for a good outpainting is a good prompt that matches the picture, sliders for denoising and CFG scale set to max, and step count of 50 to 100 with Euler ancestral or DPM2 ancestral samplers.
