# 魔法入门

请先通过前文 [调参基础](../../guide/configuration/param-basic.md) 了解 SD-WebUI 网页应用提供的基本参数。

## 速度判定

注意区分 `it/s` 与 `s/it`。

终端的 `it/s` 速率是大致速率，在一秒钟可完成多次迭代时显示，代表每秒钟迭代次数。数字升高代表加速。

`s/it` 速率是上值的倒数，在一秒钟无法完成一次迭代时显示，代表每次迭代所需秒数。因此，数字降低代表加速。

## 提示词语法

NovelAI 用户可参照 [官网文档](https://docs.novelai.net/)。

### 表示方法

分隔：英文半角 `,` 做分隔符，在英文逗号前后存在一个或数个空格并不影响实际使用。

权重修改：SD-WebUI 可使用 `()` `[]` 嵌套的方式以每括号 1.10 倍系数对权重值进行修正，或通过 `(提示词:权重值)` 修改单个提示词的权重，权重值范围是 `0.1 ~:100`，允许小数。NovelAI 不提供直接数字指定权重的方法，但可以通过 `{}` 与 `[]` 嵌套的方式以每括号 1.05 倍系数对权重值进行修正。详见 [权重系数](#权重系数)。

::: tip
NovelAI 类后端与 SD-WebUI 类后端的提示词语法 **不通用**。

SD-WebUI 使用 `()` 增强权重，而 NovelAI 使用 `{}` 增强权重。两者对于权重值的修改亦不同。

注意 NovelAI 不支持通过数字直接指定权重。

如果你想便捷转换权重，可以使用 [Telegram 上的括号转换机器人](https://t.me/M2NM2NBot)
:::

::: warning
`a ((((farm))), daytime` 的语法可能会吃掉逗号
:::

混合：NovelAI 使用 `|` 分隔多个关键词以混合多个要素，字面意义上的混合，可以串联多个提示词。SD-WebUI 使用 ` AND ` 关键词（注意大小写）。混合组内单词可通过 `提示词 :权重值` 格式指示权重值。

::: warning
值得注意的是，`AND` 会将所有标签划分成段，括号对其并无作用。
:::

[渐变](advanced#渐变提示词)：使用 `[some1:some2:num]`
 - `[fantasy:cyberpunk:0.2]` 代表从 20% 的生成步数后，将 `fantasy` 标签替换为 `cyberpunk`
 - `[fantasy:cyberpunk:16]` 代表从第 16 步后，将 `fantasy` 标签替换为 `cyberpunk`
 - `[to:when]` 在 when 指示的生成步数后添加 `to` 到提示词中
 - `[from::when]` 在 when 指示的生成步数从提示中删除 `from` 提示词

转义：SD-WebUI 中如果提示词本身带有括号，如 `pig (animal)` 请在括号前使用 `\` 字符转义作 `pig \(animal\)`，避免出现意料之外的增强效果。

交替（[Alternate prompt](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/1733)）：混合机。这使您可以创建动物、人或风格的混合体，每生成一步即在列表中轮转切换一个提示词(一步一换)，轮回渲染。例如 `[alison brie|emma stone|elizabeth olsen|scarlett johansson|anne hathaway|emma roberts], still film`。该语法为 SD-WebUI 专有。

## 如何书写提示词

目前提示词的书写方式共有如下两种风格：

- 自然语言：  
  Stable-Diffusion 使用的 NLP 模型有能力直接处理自然语言。  
  但是，追求准确就不要用自然语言。
- 参数列表堆叠：  
  将你想要的相似的提示词组合在一起，并将这些按从最重要到最不重要的顺序排列。  
  可以使用 艺术家，工作室，摄影术语，角色名字，风格，特效等等。这些内容可以在上面提到的法术书(示例集)查看。
  可以使用部分 颜文字 (如 `(^_^)`) 和 emoji，甚至可以是一些日文。部分 emoji 在表达上尤为准确。

`(subject)(style), (action/scene), (artist), (filters)`

`(subject)` 作为画面的主题，锚定画面内容，这是任何提示的基本组成部分。`(style)` 是画面风格，可选。

`(action/scene)` 作为 动作/场景，描述了主体在哪里做了什么。

`(artist)` 则是可选的艺术家名字或者出品公司名字。

`(filters)` 是一些细节，补充。可以使用 艺术家，工作室，摄影术语，角色名字，风格，特效等等。

一种可能的堆叠顺序：
```
图片的质量
图片的主题
他们的外表
他们的情绪
他们的衣服
他们的姿势
图片的背景
```

详见：[为文字转图像 AI 提示编写指南：A Guide to Writing Prompts for Text-to-image AI](https://docs.google.com/document/d/1XUT2G9LmkZataHFzmuOtRXnuWBfhvXDAo8DkS--8tec/edit#)

### 提示词长度

**避免过长的提示词。**

由于提示词的权重值从前向后递减，放置在特别靠后的提示词已经对图片的实际生成影响甚微。

不堆叠 prompt 是一个好习惯，但是如果你确实有很多内容要写，可以适当提高 step 数量，以便在生成过程中更好地利用提示词。

新版本增加了一个选项 `Increase coherency by padding from the last comma within n tokens when using more than 75 tokens`

这个设置让程序试图通过查找最后 N 个标记中是否有最后一个逗号来缓解这种情况，如果有，则将所有经过该逗号的内容一起移动到下一个集合中。该策略可适当缓解提示词过多无法处理的问题，但可能破坏提示词之间的权重关系。

### 书写格式

可选的，为了方便书写改动，可采取多行提示词的书写方式。其中一种格式如下：

```text
masterpiece,
1girl,  hatsune miku, 
look at viewer,turning back,
blow wind, cyan hair, two side up, cyan eyes,eardrop,dress,
caustics, masterpiece, high resolution,
```

第一行指定作品风格类型，第二行指定人物，第三行指定动作，第四行指定场景和着装，第五放指定其他参数

以上顺序已经比较合理，但是你也可以调整提示词的顺序以产生不同的结果。 你可以手动调整，也可以 [使用 X/Y 图自动生成各种顺序](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/1607)。

据称，模型难以解析下划线，请将它们替换为空格。

### 调整提示词顺序

提示词放入的顺序就是优先级。

SD-WebUI 突破最多 75 个词组限制的方式是将每 20 + 55 个词分为一组。

出于提高可读性的目的，推荐主体往前放，接着描述装扮的词，画质提升词穿插在这些描述词之间，一般为了提高成品率要把动作、NSFW 词等改变构图的词往后放，或者手动调低权重。

以上排序对于每组提示词单独计算，因此需要合理调整顺序。

![图像生成的描述](../../assets/stable-diffusion-image-generation.webp)

> https://jalammar.github.io/illustrated-stable-diffusion/

## 否定提示词

SD-WebUI 网页应用会在生成时 **避免生成否定提示词提及的内容**。

否定提示是一种使用 Stable-Diffusion 的方式，允许用户指定他不想看到的内容，而不对模型本身做额外的要求。

通过指定 `unconditional_conditioning` 参数，在生成中采样器会查看去噪后符合提示的图像（城堡）和去噪后看起来符合负面提示的图像（颗粒状、雾状）之间的差异，并尝试将最终结果远离否定提示词。

```python
# prompts = ["a castle in a forest"]
# negative_prompts = ["grainy, fog"]

c = model.get_learned_conditioning(prompts)
uc = model.get_learned_conditioning(negative_prompts)

samples_ddim, _ = sampler.sample(conditioning=c, unconditional_conditioning=uc, [...])
```

比如使用以下提示词避免生成水印和文字内容

```text
lowres, bad anatomy, bad hands, text, error, missing fingers, 
extra digit, fewer digits, cropped, worst quality, low quality, 
normal quality, jpeg artifacts, signature, watermark, username, blurry
```

还如这个例子

```text
ugly, fat, obese, chubby, (((deformed))), [blurry], bad anatomy, 
disfigured, poorly drawn face, mutation, mutated, (extra_limb), 
(ugly), (poorly drawn hands fingers), messy drawing, morbid, 
mutilated, tranny, trans, trannsexual, [out of frame], (bad proportions), 
(poorly drawn body), (poorly drawn legs), worst quality, low quality, 
normal quality, text, censored, gown, latex, pencil
```

更多资料详见 [官方 Wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Negative-prompt#examples)

## 权重系数
 
"调参魔法" 的一个基本技能是设置权重。

更多资料详见：[Wiki:魔导师介绍](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#attentionemphasis)

具体规则如下（适用于 SD-WebUI）

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

指定权重仅适用于 `()` 而不是 `[]`，注意 `[]` 为权重削减语法，指定单个权重仅适用于 WebUI 且使用 `()`

```
> ( n ) = ( n : 1.1 )  
> (( n )) = ( n : 1.21 )  
> ((( n ))) = ( n : 1.331 )  
> (((( n )))) = ( n : 1.4641 )  
> ((((( n )))) = ( n : 1.61051 )  
> (((((( n )))))) = ( n : 1.771561 )  
```

::: info
权重增加通常会占一个提示词位，应当避免加特别多括号。

过多圆括号会导致 字符 被程序吃掉，`a ((((farm))), daytime`会变成 `a farm daytime` 而没有逗号。
:::
    
::: tip 关于 NovelAI
NovelAI 中不允许单独指定权重，但支持混合权重 `cat:1|happy:-0.2|cute:-0:3` 这样的语法。

因为 NAI 使用的是 WebUI 2022 年 9 月 29 日之前的实现，所以权重增强语法是旧的 `{}` ，新的 WebUI 更改为 `()`。

**换算关系**

NAI 的 `[word]` = WebUI 的 `(word:0.952)` (0.952 = 1/1.05)

NAI 的 `{word}` = WebUI 的 `(word:1.05)`

NAI 花括号权重为 1.05/个，WebUI 圆括号权重为 1.1/个。
:::

::: tip How It Works
每个单词都将被解析为 768 维度空间内的一个向量，该向量“指向”概念的方向。

如果你缩放这个向量，这个概念会变得更强或更弱。

详见 [Here](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/2905)
:::

## 风格化

NovelAI 出图风格受训练数据多样性影响并不固定。你可以通过训练风格模型，指定风格关键词等方法来创作带有特效或指定画风的图片。

参考资料：

[NovelAI 使用教程和魔咒课堂](https://space.bilibili.com/8612008/channel/collectiondetail?sid=787691)

[人偶教室的测试记录](https://www.yuque.com/longyuye/lmgcwy)

[风格化: 32种](https://www.bilibili.com/video/BV1TP411N71t/)

更全面的指南见页尾。

## Batch Count 与 Batch Size

`Batch Count` 指定共生成几个批次。

`Batch Size` 指定每个批次并行生产多少张图片。

批次之间属于串行关系，批次之间的图片并行生成。

对于显存极大的显卡而言，一次生成一张图片无法充分利用显卡计算容量，此时可将 `Batch Size` 提高以充分压榨算力。

### 标签契合度与降噪强度

#### CFG Scale 标签契合度

`cfg scale` 是图像与 prompt 的契合度，该值越高，提示词对最终生成结果的影响越大，契合度越高。

#### Denoising strength 降噪强度

`Denoising strength` 仅在 img2img 时被应用，其表征最后生成图片对原始输入图像内容的变化程度。通过调整该值，可以降低对画风的影响，但也会弱化 img2img 能力。值越高 AI 对原图的参考程度就越低 (同时增加迭代次数)。

对于以图做图来说，低 `denoising` 意味着修正原图，高 `denoising` 就和原图就没有大的相关性了。一般来讲阈值是 0.7 左右，超过 0.7 和原图基本上无关，0.3 以下就是稍微改一些。

实际执行中，具体的执行步骤为 Denoising strength * Sampling Steps。

## 从图片指纹提取提示词

程序默认会在图片中加入提示词，参数，模型信息，对于没有压缩的原图，可以拖入 `PNG Info` 选项卡，查看其内嵌的生成信息。

也可以使用 [在线工具](https://spell.novelai.dev/) 查看它。

## 逆向分析提示词

通过使用其他机器学习模型，可以从图片中提取相关元素。结果常常不准确。

[LenKiMo_Bot](https://t.me/LenKiMo_Bot)

[DeepDanbooru](https://github.com/KichangKim/DeepDanbooru)

## 提示词组合展示台 / 搜索引擎

你可以访问以下传送门获取一些优秀的参数实例！（当然，中文社区的测试群有 **大量素材**，一分钟20次）

[StableDiffusion_Show](https://t.me/StableDiffusion_Show)

[cyan_ai_sese](https://t.me/cyan_ai_sese)

[LEXICA搜索引擎](https://lexica.art/?q=Miku)

## Prompt matrix 参数矩阵

使用 `|` 分隔多个Tag，程序将为它们的每个组合生成一个图像。 例如，如果使用 `a busy city street in a modern city|illustration|cinematic lighting` ，则可能有四种组合（始终保留提示的第一部分）：

- a busy city street in a modern city
- a busy city street in a modern city, illustration
- a busy city street in a modern city, cinematic lighting
- a busy city street in a modern city, illustration, cinematic lighting

## 提示词冲突

比如 `sex` 包含较多姿势体位，在使用者想要特定姿势时，法术内单一的 `sex` tag就应该被删除。

同样地，`loli` Tag 附带了强画风属性，会很大地影响结果！改成 `female child` 会好一点。

默认我们使用(别人给你的)的消极提示中，有可能会出现会发生冲突的词汇，请务必注意。

## 渐变标签

详见 [Prompt Editing](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#prompt-editing)

允许您开始对一张图片进行采样，但在中间切换到其他图片。基本语法是：

```
[from:to:when]
```

其中from和to是任意文本，并且when是一个数字，用于定义应在采样周期多长时间内进行切换。越晚，模型绘制to文本代替from文本的能力就越小。如果when是介于 0 和 1 之间的数字，则它是进行切换之后的步数的一小部分。如果它是一个大于零的整数，那么这只是进行切换的步骤。

将一个提示编辑嵌套在另一个提示中不起作用。

**使用方法**

[to:when] 在固定数量的step后添加to到提示 ( when)

[from::when] 在固定数量的step后从提示中删除from( when)

例子： a [fantasy:cyberpunk:16] landscape

开始时，模型将绘制 `a fantasy landscape`。

在第 16 步之后，它将切换到绘图 `a cyberpunk landscape`，从幻想停止的地方继续。

比如 [male:female:0.0], 意味着你开始时就要求画一个女性。

## 注意 `尺寸`

比如出图尺寸宽了人可能会多

::: tip
要匹配好姿势，镜头和人物才不畸形，有时候需要限定量词，多人物时要处理空间关系和 prompt 遮挡优先级。人数->人物样貌->环境样式->人物状态
::: 

1024 之上的尺寸可能会出现不理想的结果！推荐使用 小尺寸 + 适量提高 Step 步数 + 图片超清分辨率。

## Step 迭代步数

::: info
迭代是重复反馈的动作，神经网络中我们希望通过迭代进行多次的训练以到达所需的目标或结果。
每一次迭代得到的结果都会被作为下一次迭代的初始值。
一个迭代 = 一个正向通过+一个反向通过
:::

更多的迭代步数可能会有更好的生成效果，更多细节和锐化，但是会导致生成时间变长。而在实际应用中，30 步和 50 步之间的差异几乎无法区分。

太多的迭代步数也可能适得其反，几乎不会有提高。

进行图生图的时候，正常情况下更弱的降噪强度需要更少的迭代步数(这是工作原理决定的)。你可以在设置里更改设置，让程序确切执行滑块指定的迭代步数。

## Samplers 采样器

目前好用的有 `Euler`，`Euler a`（更细腻），和 `DDIM`。

推荐 `Euler a` 和 `DDIM`，**新手推荐使用 `Euler a`**

`Euler a` 富有创造力，不同步数可以生产出不同的图片。

PS：调太高步数 (>30) 效果不会更好

`DDIM` 收敛快，但效率相对较低，因为需要很多 step 才能获得好的结果，**适合在重绘时候使用**

`LMS` 和 `PLMS` 是 `Euler` 的衍生，它们使用一种相关但稍有不同的方法（平均过去的几个步骤以提高准确性）。大概 30 step 可以得到稳定结果

`PLMS` 是一种有效的LMS（经典方法），可以更好地处理神经网络结构中的奇异性

`DPM2` 是一种神奇的方法，它旨在改进DDIM，减少步骤以获得良好的结果。它需要每一步运行两次去噪，它的速度大约是 DDIM 的两倍。但是如果你在进行调试提示词的实验，这个采样器效果不怎么样

`Euler` 是最简单的，因此也是最快的之一

[英文Wiki介绍](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#attentionemphasis)

[英文论坛介绍](https://www.reddit.com/r/StableDiffusion/comments/xbeyw3/can_anyone_offer_a_little_guidance_on_the/)

- 举个例子

不同 Step 和 采样器 的不同效果：

|预览一|预览二|
|--|--|
|![效果](../../assets/sampler-vs-steps-1.webp)|![效果](../../assets/sampler-vs-steps-2.webp)|

## 种子调试

理论上，种子决定模型在生成图片时涉及的所有随机性。
实际的种子整数并不重要。它只是初始化一个定义扩散起点的随机初始值。

在不使用 xformers 等会带来干扰的加速器并应用完全相同参数（如 Step、CFG、Seed、prompts）的情况下，生产的图片应当完全相同。

不同显卡由于微架构不同，可能会造成预料之外的不同结果。

GTX 10xx 系列存在此类问题。详见 [这里的讨论](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/2017#discussioncomment-3873467)。

