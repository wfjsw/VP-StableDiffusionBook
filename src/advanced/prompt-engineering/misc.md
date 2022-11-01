# 杂项

## 参数

为什么不去 [这里](https://danbooru.donmai.us/wiki_pages/howto%3Atag_checklist) 看[原始数据站点](https://danbooru.donmai.us/wiki_pages/tag_groups)的参数呢？

[E 站标签翻译项目](https://github.com/EhTagTranslation)

### NAI 在使用的出图参数

- 使用全量模型(官方的GPU云特别强悍)

- CLIP layer = 2

- 使用 ema 权重加载，将yaml 配置其中的 `use_ema` 设置为 true

- 将 ` sigma noise/strength` 重置为默认值 1

- 设定 `eta noise seed delta` 为 31337（使 ` sigma noise/strength` 无需使用 0.69 / 0.67）

- 如果 prompt 有权重，转换权重（ WebUI 占比 1.1 ，NAI 占比 1.05）

- 使用 `--no-half` 参数启动程序（次要）


**NAI 默认的模型设置**

```
steps": 28, "sampler": "[sampler]", "seed": [seed], "strength": 0.69, "noise": 0.667, "scale": 11.0,

Strength ， noise 是 eta 和 sigma

scale 就是 CFG scale
```

**NAI 默认的 `SFW` 消极提示词为**
```
lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry
```


**其他**

将所有提示词前面加入 `masterpiece, best quality`


Clip 跳过 0，其他一切都很好（afaik 不要使用超网络、v2、yaml、VAE）


### 转换——NAI和WebUI(SD)的增强语法不同

**Prompts 参数括号转换**

在 NAI 和 Webui 之间转换加强参数，相关的机器人服务 [M2NM2NBot](https://t.me/M2NM2NBot)

相关的 [网页JS](https://github.com/naisd5ch/novel-ai-5ch-wiki-js)

权重增强标识：NAI 是 `{}` ，WebUI(SD) 是 `()`


### 元素法典

元素法典提供了一个即查即用的模板库(类比作文大全)，里面有Tag的调试记录，方便快捷。

[元素法典一卷](https://docs.qq.com/doc/DWHl3am5Zb05QbGVs)

[元素法典第一点五卷](https://docs.qq.com/doc/DWGh4QnZBVlJYRkly)

[元素法典制作委员会](https://space.bilibili.com/1981251194)


### 良好参数(风格趋向插画)[^4]

```
an extremely delicate and beautiful
```

[绘画媒介全分类](https://danbooru.donmai.us/wiki_pages?commit=Search&search%5Btitle_normalize%5D=%2A_%28medium%29)

[动漫人物/艺术家/风格化列表/Pt文件](https://rentry.org/anime_and_titties)

[风格化：人偶教室](https://www.yuque.com/longyuye/lmgcwy)

[风格化，日语Wiki](https://seesaawiki.jp/nai_ch/d/%b2%e8%c9%f7%a1%a6%b9%bd%bf%de)

[风格化: 32种](https://www.bilibili.com/video/BV1TP411N71t/)

[艺术家列表/SD1.4](https://rentry.org/artists_sd-v1-4)

[艺术家列表/SD1.4/1,833 位艺术家](https://www.urania.ai/top-sd-artists)

[艺术家博物馆](https://gallerix.asia/storeroom/)

#### 草图风格

| 词                                                            | 描述                                               |
|---------------------------------------------------------------|----------------------------------------------------|
| sketch                                                        | 可以让图片看起来像随手画的草稿                     |
| lineart                                                   | 可以让线条变得很粗                                 |
| posing sketch, monochrome                           | 黑白草图                                           |
| rough sketch                                                | 上了颜色的草图                                     |
| monochrome+lineart                                            | 情况下一般只会让眼睛上色，强调发色后头发也可以上色 |
| monochrome, gray scale, pencil sketch lines | 做出的铅笔速写的感觉                               |


利用sketch，pastel color，lineart的tag模拟一张图的绘画过程


#### 艺术风格

| 词                                                                  | 描述                                   |
|---------------------------------------------------------------------|----------------------------------------|
| chibi                                                               | 可以画出低头身比的效果(二头身, 三头身) |
| watercolor pencil                                               | 可以生成彩铅画                         |
| faux traditional media                                       | 可以做出签绘的风格                     |
| anime screeshot，                                                   | 可以让画面变成动画风格                 |
| retro artstyle                                               | 赛璐璐风                               |
| photorealistic, painting, realistic, sketch, oil painting | 厚涂                                   |
| pastel color和sketch                                                | 搭配会有速涂的质感                     |


#### 杂志/设定集 风格

| 词                                                             | 描述                                                           |
|----------------------------------------------------------------|----------------------------------------------------------------|
| official art                                                   | 变得更加官方一点                                               |
| three views from front, back and side和costume setup materials | 可以用来生成设定图                                             |
| multiple views                                                 | 会出现类似设定图                                               |
| character sheet                                              | 会出现设定图                                                   |
| magazine cover                                                 | 会把背景换成杂志封面, 配合office art更像真实杂志(虽然字没法看) |
| magazine scan                                                  | 类似杂志内页的风格                                             |
| posing                                                         | 会强调有一个动作, 不至于出现混乱的动作(露出有六个手指头的手)   |
| caustics                                                       | 画面向主题聚焦, 类似海报                                       |


### 常用参数:SFW

| 人物数量 | 描述                                                                  |
| ----------- | ----------------------------------------------------------------------- |
| 数量      | , one boy , one girl , two boy ,two girl,one_boy_one_girl(这是错误的) |


| 人物画风                                         | 描述 |
| -------------------------------------------------- | ------ |
| 质量提升参数 |   , masterpiece, best quality   |
| 原神                             |   , Genshin Impact   |
| 萝莉                  |    , female child , loli画风差  |

| 人物样貌                           | 描述                                                           |
| ------------------------------------ | ---------------------------------------------------------------- |
| 头发                               | hair                                                           |
| 长发                               | longhair                                                       |
| 短发                               | shorthair                                                      |
| 眼睛                               | eyes                                                           |
| 渐变颜色长发                       | gradient pink longhair                                         |
| 渐变颜色眼睛                       | gradient pink eyes                                             |
| 粗眉毛                             | thick eyebrows                                                 |
| 猫尾巴                             | cat tail                                                       |
| 猫耳朵                             | cat ears                                                       |
| 动物耳朵                           | animal ears                                                    |
| 毛茸茸的动物耳朵                   | animal ear fluff                                               |
| 刘海                               | bangs                                                          |
| 两眼之间的头发                     | hair between eyes                                              |
| 眉毛后面的头发                     | eyebrows behind hair                                           |
| 锁骨                               | collarbone                                                     |
| 斗篷(要在很前面才有效)             | cape                                                           |
| 乳房尺寸                           | small breasts                                                  |
| 出汗                               | sweating                                                       |
| 颜色丝袜(和长丝袜冲突)             | white stockings , black stockings                              |
| 长丝袜                             | thighhighs                                                     |
| 女仆                               | maid                                                           |
| 发带                               | ribbon                                                         |
| 爱心眼                             | heart-shaped pupils                                            |
| 御姐/JK/辣妹?                      | gyaru                                                          |
| 肌肉发达                           | muscular                                                       |
| 天使翅膀(要是形容人的第一个才正常) | angel wings                                                    |
| 颜色内裤(赠内衣)                   | pink underpants                                                |
| 肚脐                               | navel                                                          |
| 颈部颜色项圈                       | white collar                                                   |
| 黑色皮肤                           | dark skin                                                      |
| 撕裂的衣服                         | torn clothes                                                   |
| 撕裂的裤子                         | torn legwear                                                   |
| 开襟夹克(配合叉开腿特色)           | open jacket                                                    |
| 异色瞳                             | heterochromia_blue_red                                         |
| 吊袜带(会和内衣冲突)               | garter straps                                                  |
| 靴子                               | boots                                                          |
| 眼罩                               | blindfold                                                      |
| 流泪                               | tears                                                          |
| 项链                               | necklace                                                       |
| 眼镜                               | glasses                                                        |
| 比基尼                             | bikini                                                         |
| 湿衣服                             | wet clothes                                                    |
| 透明衣物                           | transparent raincoat , transparent jacket , transparent tshirt |
| 唾液(自动伸舌头)                   | saliva                                                         |
| 流口水(和唾液冲突)                 | drooling                                                       |
| 水手服                             | sailor dress                                                   |

| 环境样式                                                                 | 描述                           |
| -------------------------------------------------------------------------- | -------------------------------- |
| 在床上                                                                   | on bed                         |
| 光线反射                                                                 | reflection light               |
| 赛博朋克                                                                 | cyberpunk, city, kowloon, rain |
| 在地毯上                                                                 | on carpet                      |
| 在瑜伽垫上(它分不清什么是瑜伽垫，只知道色块比较大，所以要配合one girl用) | on_yoga_mats                   |

| 人物视角     | 描述        |
| -------------- | ------------- |
| 正面视角     | from viewer |
| 从上到下视角 | from below  |
| 全身         | full body   |

| 人物状态           | 描述                                                 |
| -------------------- | ------------------------------------------------------ |
| 叉开腿             | spread leg                                           |
| 露出腋下           | armpits                                              |
| 举起手             | hands up , arms up                                   |
| 爪子手             | paw pose                                             |
| 站立               | standing                                             |
| 行走               | walking                                              |
| 吐舌头             | tongue out                                           |
| 抬起腿             | legs up                                              |
| 手放背后           | arms behind back , hidden hands                      |
| 衬衫               | shirt                                                |
| 长袖               | long sleeves                                         |
| 连帽衫             | hoodie                                               |
| 褶边               | frills                                               |
| 喇叭裤             | bloomers                                             |
| 白色连衣裙         | white dress                                          |
| 捆绑               | bondage , bondage body , bondage foot , bondage hand |
| 蹲下               | crouch , squatting                                   |
| 真画风           | photorealistic                                       |
| 跪下               | kneel down                                           |
| 湿身               | wet body                                             |

