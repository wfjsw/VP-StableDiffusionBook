---
outline: [2, 4]
---

# 文字转图片

请先通过前文 [调参基础](../../guide/configuration/param-basic.md) 了解 SD-WebUI 网页应用提供的基本参数。

## 如何书写提示词

这是一个通用的指南，内容是基本通用的，可能有例外情况，请读对应的章节了解不同应用的特性。

### 写什么？

::: tip
提示词是提示而不是判定依据，比如你输入质量判定词汇的时候，其实是在限制数据的范围，而不是 “要求” AI 出一张很好的图片。
:::

#### 单词标签

对于在标签单词上特化训练的模型，建议使用逗号隔开的单词作为提示词。

普通常见的单词，例如是可以在数据集来源站点找到的著名标签（比如 Danbooru)。单词的风格要和图像的整体风格搭配，否则会出现混杂的风格或噪点。

避免出现拼写错误。NLP 模型可能将拼写错误的单词拆分为字母处理。

#### 自然语言

对于在自然语言上特化训练的模型，建议使用描述物体的句子作为提示词。

取决于训练时使用的数据集，可以使用英文，日文，特殊符号或一些中文。大多数情况下英文较为有效。

避免 `with` 之类的连接词或复杂的语法，大多数情况下 NLP 模型只会进行最简单的处理。

避免使用重音符（如 é 和 è）和德语 umlauts（如 ä 和 ö），它们可能无法被映射到正确的语义中。

不建议随意套用现成模板，尤其是无法经过人类理解的模板。

#### Emoji

Emoji (💰,💶,💷,💴,💵,🎊,🪅🪄,🎀,👩‍🚀) 表情符号也是可以使用并且 **非常准确** 的。

Emoji 因为只有一个字符，所以在语义准确度上表现良好。

Emoji 在构图上有影响，比如 `💐☺️💐`。

[表情符号参考](https://unicode.org/emoji/charts/emoji-list.html)

#### 颜文字

对于使用 Danbooru 数据的模型来说，可以使用颜文字在一定程度上控制出图的表情。

例如：

`:-)` 微笑 `:-(` 不悦 `;-)` 使眼色 `:-D` 开心 `:-P` 吐舌头 `:-C` 很悲伤 `:-O` 惊讶 张大口 `:-/` 怀疑

仅支持西方颜文字，详细内容请见 [Danbooru 颜文字部分](https://danbooru.donmai.us/wiki_pages/tag_group%3Aface_tags) 或 [维基百科](https://zh.wikipedia.org/wiki/%E8%A1%A8%E6%83%85%E7%AC%A6%E8%99%9F%E5%88%97%E8%A1%A8?oldformat=true)

#### 空格

逗号前后的少量空格并不影响实际效果。

开头和结尾的额外空格会被直接丢弃。词与词之间的额外空格也会被丢弃。

#### 标点符号

用逗号、句号、甚至是空字符（`\0`）来分隔关键词，可以提高图像质量。目前还不清楚哪种类型的标点符号或哪种组合效果最好。当有疑问时，只要以一种使提示更容易被阅读的方式来做。

对于部分模型，建议将下划线（`_`）转换为空格。

#### 艺术风格词

可以通过指定风格关键词来创作带有特效或指定画风的图片。

参考资料：

[NovelAI 使用教程和魔咒课堂](https://space.bilibili.com/8612008/channel/collectiondetail?sid=787691)
[人偶教室的测试记录](https://www.yuque.com/longyuye/lmgcwy)
[风格化: 32 种](https://www.bilibili.com/video/BV1TP411N71t/)

或通过使用 [微调模型](../finetuning/index.md) 来创作图片。

#### 运动和姿势

如果没有很大要求的话，选择只与少数姿势相关的提示。

这里的姿势是指某一事物的物理配置：图像主体相对于摄像机的位置和旋转，人类/机器人关节的角度，果冻块被压缩的方式，等等。你试图指定的事物中的差异越小，模型就越容易学习。

因为运动就其定义而言涉及到主体姿势的巨大变化，与运动相关的提示经常导致身体的扭曲，如重复的四肢。另外，因为人类的四肢，特别是人类的手和脚有很多关节，他们可以采取许多不同的、复杂的姿势。这使得他们的可视化特别难学，对于人类和神经网络都是如此。

简而言之：人类站着/坐着的好形象很容易，人类跳着/跑着的好形象很难。

### 如何写？

#### 模板

先想一下要画什么，例如 主题，外表，情绪，衣服，姿势，背景 一类，然后参考数据集标签表（如果有的话，比如 Danbooru, Pixiv 等）。

然后将想要的相似的提示词组合在一起，请使用英文半角 `, ` 做分隔符，并将这些按从最重要到最不重要的顺序排列。

一种模板示例如下：

```
(quality), (subject)(style), (action/scene), (artist), (filters)
```

-   `(quality)` 代表画面的品质，比如 `low res` 结合 `sticker` 使用来 “利用” 更多数据集， `1girl` 结合 `high quality` 使用来获得高质量图像。
-   `(subject)` 代表画面的主题，锚定画面内容，这是任何提示的基本组成部分。
-   `(style)` 是画面风格，可选。
-   `(action/scene)` 代表动作/场景，描述了主体在哪里做了什么。
-   `(artist)` 代表艺术家名字或者出品公司名字。
-   `(filters)` 代表一些细节，补充。可以使用 艺术家，工作室，摄影术语，角色名字，风格，特效等等。

#### 大小写

CLIP 的标记器在标记之前将所有单词转为小写。其他模型，如 BERT 和 T5，将大写的单词与非大写的单词区别对待。

但避免涉及特殊语法，以防被解释为其他语义，例如 `AND`。

#### 词汇顺序

[demystifying_prompting_what_you_need_to_know/](https://www.reddit.com/r/StableDiffusion/comments/yjwuls/demystifying_prompting_what_you_need_to_know/)

似乎 VAE 使用了一种称为贝叶斯定理的统计方法。在计算标记的去向时，前几个单词似乎锚定了其余单词标记在潜在空间中的分布。

早期的标记具有更一致的位置，因此神经网络更容易预测它们的相关性。在贝叶斯推理中，矩阵中的第一个标记或证据很重要，因为它设置了初始概率条件。但是后面的元素只是修改了概率条件。因此，至少在理论上，最后的令牌不应该比前面的令牌具有更大的影响。

但是解析器理解事物的方式是不透明的，因此没有办法**确切**地知道词法顺序是否具有“锚”效应。

可以 [使用 X/Y 图自动生成各种顺序](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/1607) 进行尝试。

#### 提示词长度

**避免过长的提示词。**

提示词放入的顺序就是优先级。由于提示词的权重值从前向后递减，放置在特别靠后的提示词已经对图片的实际生成影响甚微。

不堆叠提示词是一个好习惯，但是如果你确实有很多内容要写，可以适当提高生成步数，以便在生成过程中更好地利用提示词。

SD-WebUI 突破最多 75 个词组限制的方式是将每 20 + 55 个词分为一组。选项 `Increase coherency by padding from the last comma within n tokens when using more than 75 tokens` 让程序试图通过查找最后 N 个标记中是否有最后一个逗号来缓解这种情况，如果有，则将所有经过该逗号的内容一起移动到下一个集合中。该策略可适当缓解提示词过多无法处理的问题，但可能破坏提示词之间的权重关系。

除了 WebUI 对此情况进行了特殊处理外，由于 GPT-3 模型限制，提示词处理空间并不是无限的，大多在在 75-80 之间，75 字符后的内容会被截断。

### 特异性

问题体现在语义偏移上。对于神经网络的训练来说，特征的质量很重要：输入和输出之间的联系越强，神经网络就越容易学习这种联系。

换句话说，如果一个关键词有非常具体的含义，那么学习它与图像之间的联系要比一个关键词有非常广泛的含义容易得多。

这样一来，即使是像 "Zettai Ryouiki" 这样很少使用的关键词也能产生非常好的结果，因为它只在非常具体的情况下使用。另一方面，"动漫" 即使是一个比较常见的词，也不会产生很好的结果，这可能是因为它被用于许多不同的情况，即使是没有字面意思的动漫。如果你想控制你的图片的内容，选择具体的关键词尤其重要。另外：你的措辞越不抽象越好。如果可能的话，避免留下解释空间的措辞，或需要 "理解" 不属于图像的东西。甚至像 "大" 或 "小" 这样的概念也是有问题的，因为它们与物体离相机近或远是无法区分的。理想情况下，使用有很大可能逐字出现在你想要的图像标题上的措辞。

### 语义失衡

每一个提示词就像染料一样，它们的 “亲和性“ 不同，如果更常见的提示词，比如 `loli` (和其他提示词并列放置)的影响就大于其他提示词。

比如，如果你想生成动漫图片，使用了 星空 `startrail` 标签，相比你期望出现的动漫星空，会有更多来自真实照片的星空元素。

许多词汇在基准上的权重就不一样，所以要根据效果进行合理调节。

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

## 提示词语法

以下内容主要适用于 SD-WebUI。NovelAI 用户可参照 [官网文档](https://docs.novelai.net/)。

### 权重系数

权重系数可改变提示词特定部分的比重。

更多资料详见 [Wiki:Attention Emphasis](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#attentionemphasis)

对于 SD-WebUI，具体规则如下：

-   `(word)` - 将权重提高 1.1 倍
-   `((word))` - 将权重提高 1.21 倍（= 1.1 \* 1.1），乘法的关系。
-   `[word]` - 将权重降低 90.91%
-   `(word:1.5)` - 将权重提高 1.5 倍
-   `(word:0.25)` - 将权重减少为原先的 25%
-   `\(word\)` - 在提示词中使用字面意义上的 () 字符

使用数字指定权重时，必须使用 `()` 括号。如果未指定数字权重，则假定为 `1.1`。指定单个权重仅适用于 SD-WebUI。

::: info
权重增加通常会占一个提示词位，应当避免加特别多括号。
:::

```
> ( n ) = ( n : 1.1 )
> (( n )) = ( n : 1.21 )
> ((( n ))) = ( n : 1.331 )
> (((( n )))) = ( n : 1.4641 )
> ((((( n )))) = ( n : 1.61051 )
> (((((( n )))))) = ( n : 1.771561 )
```

::: tip 关于 NovelAI
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

无论使用何种具体的脚本，重复某个关键词似乎都会增加其效果。

值得注意的是，你的提示中存在越多的提示词，任何单一提示词的影响就越小。你还会注意到，由于这个原因，在增加新的提示词时，风格会逐渐消失。强烈建议随着提示符长度的增加改变风格词的强度，以便保持一致的风格。

### 标签替换

详见 [Prompt Editing](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#prompt-editing)

允许您开始先使用一个提示词，但在生成过程中间切换到其他提示词。基本语法是：

-   `[to:when]` 在指定数量的 step 后添加 to 到提示
-   `[from::when]` 在指定数量的 step 后从提示中删除 from
-   `[from:to:when]` 在指定数量的 step 后将 from 替换为 to

其中 `from` 与 `to` 是替换前后的提示词，`when` 表示替换时机。

如果 `when` 是介于 0 和 1 之间的数字，则它是进行切换的步数的百分比。如果它是一个大于零的整数，那么这代表进行切换字面步数。

替换标签可无限嵌套。

示例：对于 `a [fantasy:cyberpunk:16] landscape`

-   开始时，模型将绘制 `a fantasy landscape`。
-   在第 16 步之后，它将采用 `a cyberpunk landscape` 继续生成。

### 标签轮转

详见 [Alternating Words](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#prompt-editing)

允许您在生成过程中每步轮换使用多个提示词。基本语法是：

```
[a|b|c] 
```

生成的第一步将使用 `a`，第二步将使用 `b`，第三步将使用 `c`，第四步将使用 `a`，依此类推。

### 多组提示词生成

详见 [Composable-Diffusion](https://energy-based-model.github.io/Compositional-Visual-Generation-with-Composable-Diffusion-Models/)

::: warning
`AND` 的语法优先级最高，因此试图使用 `AND` 分离单个提示词的操作是错误的。注意甄别部分公开教程中的错误示例。
:::

允许在生成时同时使用多组提示词，并将结果直接相加。基本语法是：

```
a, b, c AND d, e, f
```

这将使用两组提示词 `a, b, c` 和 `d, e, f` 生成，并将它们的结果相加。

## 标签契合度与降噪强度

### CFG Scale 标签契合度

`cfg scale` 是图像与 prompt 的契合度，该值越高，提示词对最终生成结果的影响越大，契合度越高。

### Denoising strength 降噪强度

`Denoising strength` 仅在 img2img 时被应用，其表征最后生成图片对原始输入图像内容的变化程度。通过调整该值，可以降低对画风的影响，但也会弱化 img2img 能力。值越高 AI 对原图的参考程度就越低 (同时增加迭代次数)。

对于以图做图来说，低 `denoising` 意味着修正原图，高 `denoising` 就和原图就没有大的相关性了。一般来讲阈值是 0.7 左右，超过 0.7 和原图基本上无关，0.3 以下就是稍微改一些。

实际执行中，具体的执行步骤为 Denoising strength \* Sampling Steps。

## Prompt matrix 参数矩阵

使用 `|` 分隔多个 Tag，程序将为它们的每个组合生成一个图像。 例如，如果使用 `a busy city street in a modern city|illustration|cinematic lighting` ，则可能有四种组合（始终保留提示的第一部分）：

-   a busy city street in a modern city
-   a busy city street in a modern city, illustration
-   a busy city street in a modern city, cinematic lighting
-   a busy city street in a modern city, illustration, cinematic lighting
