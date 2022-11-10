# 新闻

::: tip
目前 Stable Diffusion WebUI 迭代非常快，每天都会有大量更新，因此建议每天都拉取最新代码。
:::

以下是该领域的最新消息。

英文原版见 [sdupdates @ rentry](https://rentry.org/sdupdates)

## 11/09

 - 新的基于 Latent Diffusion 的超分方法由 StabilityAI 员工发布：  
   https://twitter.com/StabilityAI/status/1590531946026717186
   - Colab：https://colab.research.google.com/drive/1o1qYJcFeywzCIdkfKJy7cTpgZTCM2EI4
 - 有人发现了 NovelAI 中 Variation 的作用：  
   Variation 与 Enhance 类似。他将图片以写死的 0.8 强度送给 img2img，并对于每张图片将种子加 1。没有什么非常特殊的。
 - 发现了 NovelAI 中 Enhance 的作用：  
   首先将图片使用 Lanczos 算法缩放（默认最大 1.5 倍），然后送给 img2img 运行50步，降噪强度设为 0.2 至 0.6 （对应 NAI 中 Magnitude 的 1 至 5 的值）。这像是 SD 超分的一个更消耗显存的类型。
 - 美国对 NVIDIA 输出中国的产品施加了新的出口限制

## 11/08

 - Google 发布 AI 视频：https://www.youtube.com/clip/Ugkx_p77cvDSUkXBXRlVuq2sHVTu5YTwGiFB
 - 使用 Stable Diffusion 压缩图片：https://pub.towardsai.net/stable-diffusion-based-image-compresssion-6f1f0a399202
 - 非官方的 单词绘画 实现：https://github.com/cloneofsimo/paint-with-words-sd
 - 风格转移脚本：https://github.com/nicolai256/Few-Shot-Patch-Based-Training
 - Dreambooth 插件发布：https://github.com/d8ahazard/sd_dreambooth_extension
 - 融合模型 anything.ckpt 发布 (v3 6569e224; v2.1 619c23f0) ：https://www.bilibili.com/read/cv19603218

## 11/07

 - DreamBooth WebUI 插件  
   https://github.com/d8ahazard/sd_dreambooth_extension
 - Unprompted 插件中出现了广告  
   https://www.reddit.com/r/StableDiffusion/comments/ynshup/ds_are_starting_to_appear_in_our_foss/
 - ddetailer 发布：  
   https://github.com/dustysys/ddetailer
  - 物体检测与自动标记。可以用于无需手动标记的脸部修复。

## 11/06

- 新的采样高阶算法

DPM-Solver (and the improved version DPM-Solver++) is a fast dedicated high-order solver for diffusion ODEs with the convergence order guarantee.

[Add support for the new DPM-Solver++ samplers added to k-diffusion](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/4304)

[dpm-solver](https://github.com/LuChengTHU/dpm-solver)

论文 https://arxiv.org/abs/2211.01095

### NovelAI

![exp](./assets/200149887-935a6f95-0bfa-4f8e-b6b1-0fb0bfe0b39e.webp){ align=left loading=lazy}

Test From [Here](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/4363)

*生成过程中使用了本地训练的超网络*

### Stable Diffusion 1.5

![exp](./assets/200134579-dc31f8d4-abd6-4ef0-9d2c-1582a53ec1b0.webp){loading=lazy}

Test From [Here](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/4304#issuecomment-1304602296)

DPM-Solver++ 只需 15 到 20 个步骤即可实现出色的样本质量，尤其是 2M 和 2M Karras。从 15 步开始，所有步数的结果都非常详细，而且速度很快。

### 其他

 - 很多关于训练 DreamBooth 时浪费钱的问题：  
   https://www.reddit.com/r/StableDiffusion/comments/ynb6h1/dont_overpay_for_dreambooth_training/
   - 简单来说（来自 dreambooth ui 作者）：  
     你不应该花费超过 10 美元在模型训练上。在购买服务器之前，确保你可以下载训练好的模型。
 - 有人说如果对 k-diffusion 做一些调整，DPM++ 2M Karras 可在更少步数中获得更佳效果
   - https://rentry.org/wf7pv
   - 理由：https://github.com/crowsonkb/k-diffusion/issues/43#issuecomment-1304916783
   - ![](./assets/1667784374378916.webp)
 - 独立 Dreambooth 插件：https://github.com/d8ahazard/sd_dreambooth_extension
   - https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/3995
 - stable-diffusion-webui 添加了另一层模型安全性过滤器：  
 https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/safe.py
 - UMI AI 变成了插件：  
 https://www.patreon.com/posts/74267457
 - stable-diffusion-webui 添加了本地化插件支持：  
 https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/a2a1a2f7270a865175f64475229838a8d64509ea
   - 备注：https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/9cd1a66648b4c19136687100f9705d442f31e7f9
 - 模型安全扫描器：  
   https://github.com/zxix/stable-diffusion-pickle-scanner

## 11/05

 - WebUI 发布 [tokenizer插件](https://github.com/AUTOMATIC1111/stable-diffusion-webui-tokenizer)，可以查看分词情况。
 - 新的模型分析工具：https://github.com/lopho/pickle_inspector
   - 来自 Discord 服务器 ML research labs

## 11/04

 - DiffusionBee 新版发布：  
   https://www.reddit.com/r/StableDiffusion/comments/ylmtsz/new_version_of_diffusionbee_easiest_way_to_run/
   - https://github.com/divamgupta/diffusionbee-stable-diffusion-ui
 - AI艺术走红赚钱：一位AI艺术家的自白  
   https://www.reddit.com/r/StableDiffusion/comments/yh8j0a/ai_art_is_popular_and_makes_money_confessions_of/
 - 据称美国版权局认为由人类制作的视觉作品才能获得版权
   - Pt. 1: https://www.reddit.com/r/COPYRIGHT/comments/xkkh3d/us_copyright_office_registers_a_heavily/
   - https://www.reddit.com/r/StableDiffusion/comments/yhdyc0/artist_states_that_us_copyright_office_intends_to/
   - https://www.reddit.com/r/COPYRIGHT/comments/yhdtnb/artist_states_that_us_copyright_office_intends_to/
 - 来自 DreamBooth 的一位原始作者：停止使用 `SKS` 作为初始化词
   - `SKS` 在模型的认知中是一把枪
   - ![Twitter](./assets/tFA0Vy1.webp)
   - https://www.reddit.com/r/StableDiffusion/comments/yju5ks/from_one_of_the_original_dreambooth_authors_stop/
 - Unprompted 插件中出现广告
   - 显然可以被修改去除
 - NVIDIA 发布新模型 eDiffi：  
   具有专家降噪器集合的文本到图像扩散模型 
   - 由于需要超过 40G 显存，在消费级硬件中运行这个模型将会相当困难。
   - https://arxiv.org/abs/2211.01324
   - https://www.reddit.com/r/StableDiffusion/comments/ykqfql/nvidia_publishes_paper_on_their_own_texttoimage/
   - https://deepimagination.cc/eDiffi/
 - stable-diffusion-webui 现添加插件管理器
 - NovelAI 提供的支持多个模型的在线分词器：https://novelai.net/tokenizer
 - 批量模型合并脚本发布：https://github.com/lodimasq/batch-checkpoint-merger
 - 可从 Krea.ai 与 Lexica.art 搜索提示词的脚本发布：https://github.com/Vetchems/sd-lexikrea
 - 深度图脚本发布：https://github.com/thygate/stable-diffusion-webui-depthmap-script
   - 可将生成的图片转换为深度图
   - 输出结果可以使用 3D 或 VR 设备查看。可以在游戏引擎中使用或被 3D 打印
 - 视频训练素材提取插件发布：https://github.com/Maurdekye/training-picker
   - 从视频中提取关键帧用于训练
 - 来自 StabilityAI CEO Emad 的说法
   - 下一个模型将在重新训练部分内容后发布
   - 比 1.5 版更好的新的开源模型将由其他组在接下来几个月发布
   - 优化了模型训练流程
   - 2.0 模型快了
   - ![Discord](./assets/1038223793279217734.webp)


## 11/03

 - 经过测试，我发现 emoji 真的很好用。对于场景效果总是有惊喜。

```text
masterpiece,best quality,1girl,
,light blue hair,solo,(anime coloring:1.1),
(🌻☀️🌈:1.2),hug Sunflower,

lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, bad feet
```

 - 将模型转换为 Safetensors 格式
   - Safetensors 无法被投毒，无需担心安全问题
   - https://huggingface.co/spaces/safetensors/convert
   - https://github.com/huggingface/safetensors
 - Zeipher AI f222 模型发布：https://ai.zeipher.com/#tabs-2
 - NovelAI 发布用于训练非 512x512 尺寸图片的源码与文档 (Aspect Ratio Bucketing).
   - https://github.com/NovelAI/novelai-aspect-ratio-bucketing
   - https://blog.novelai.net/novelai-improvements-on-stable-diffusion-e10d38db82ac
   - https://www.reddit.com/r/NovelAi/comments/ykgns6/novelai_aspect_ratio_bucketing_source_code/
   - https://twitter.com/novelaiofficial/status/1587907133643034624

## 11/02

 - 为 Krita 插件等添加自定义后端 API  
   https://github.com/Interpause/auto-sd-paint-ext
 - 在 [这个 PR](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/4142) 中，WebUI 修复了 IMG2IMG 处理后不释放 RAM 的问题
 - Zeipher AI 的 f222 模型将在周五发布 （f111 模型提供了更好的女性人体，这可能是第二个版本）
   - Discord：https://discord.gg/hqbrprK6
   - 站点：https://ai.zeipher.com/
 - Auto-SD-Krita 作为插件发布：https://github.com/Interpause/auto-sd-paint-ext
 - MMD + NAI 作品展示（UC = 反向标签）：  
   https://twitter.com/8co28/status/1587238661090791424?t=KJmJhfkG6GPcxS5P6fADgw&s=19
   - 创作者们发现把 `3d` 放在反向标签里可以让输出更像插图：https://twitter.com/8co28/status/1587004598899703808

## 11/01

 - disable access to extension stuff for non-local servers  
   https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/dc7425a56e7a014cbfa3b3d44ad2321e519fe378  
   社区反映：共享链接可能会导致风险，攻击者可以访问系统上的所有文件。
 - Dreambooth 可能不会直接合并到 stable-diffusion-webui 中。它将更可能作为一个插件实现：https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/3995#issuecomment-1298741868
 - 在 xformers 存在的情况下使用 6 GB 显存训练 Textual Inversion 的方法已被合并：https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/4056
 - 出现 AI 作品盗贼（上传其他人的 AI 作品） 
   - https://www.reddit.com/r/StableDiffusion/comments/yipeod/my_sdcreations_being_stolen_by_nftbros/

## 10/31

 - Unprompted 插件发布：https://github.com/ThereforeGames/unprompted
   - 支持通配符
   - 强大的脚本语言
   - 可创建标签模板
   - 可创建简称
   - “您可以从文件中提取文本、设置自己的变量、通过条件函数处理文本，等等等等”
 - 开源创作工具发布
   - https://github.com/carefree0910/carefree-creator
   - 支持本地与云端
 - PaintHua.com - 专注于图片修补的界面
   - https://www.reddit.com/r/StableDiffusion/comments/ygp0iv/painthuacom_new_gui_focusing_on_inpainting_and/
   - ![](./assets/Hua-Demo.gif)


## 10/30

 - 在 [这次提交中](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/9f4f894d74b57c3d02ebccaa59f9c22fca2b6c90) ，WebUI 添加了 `allow skip current image in progress api`，跳过当前流程的 API 方法。
 - 在 [这次合并](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/3722) 中，WebUI 添加了原生的进度 Api

## 10/29

[讨论](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/3889) 有人认为，通过在 Windows 设置上禁用硬件加速 GPU 调度，WebUI 性能提高了大约 10-50%

## 10/27

文档增加了 API 内容

## 10/26

 - [中文翻译上线](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/dde8c435987dcd071c63d16f247ae832bce0101f)
 - [法语翻译上线](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/3653)
 - [土耳其翻译上线](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/3631)
 - WebUI 在 [这次提交](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/1e428238db4e399b7a06ad5251cb16eef23a014d) 中将 `override_settings` 添加到 API
 - 在 [这次提交](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/cb49800c08a9f6619733250401952e5571dc12f8) 后，img2img 使用了手机照片的 EXIF 方向。
 - WebUI 在 [这次提交](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/de096d0ce752c96e45508dcc7b9e84f7dbe10cca) 中添加了权重初始化和更多激活函数。
 - WebUI 在 [这次提交](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/cbb857b675cf0f169b21515c29da492b513cc8c4) 中允许了在 `--medvram` 下创建 embedding 的情况。  
   `Hint:will send cond model to GPU if lowvram/medvram is active`

## 10/25

 - [集成 Tag 工具 / 支持超网络的 Web](https://git.hudaye.work/MiuliKain/Kamiya-OpenUI) 开源项目说他们缺人。
 - 在 [此次提交](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/3624) 中，从 `--use-cpu` 中删除了 `BSRGAN`，将 `SwinIR` 添加到 `--use-cpu` 并修复 MPS 上的 `upscalers`。
   - 你可以在[这里](https://upscale.wiki/wiki/Official_Research_Models) 找到 `BSRGAN`，下载的模型放到 `esrgan` 文件夹就可以使用。
 - [#3505](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/3505) 之后超网络训练不稳定。

## 10/24

 - Colab 称昨天的封号是 [错误的滥用判定](https://github.com/googlecolab/colabtools/issues/3181)
 - WebUI [移除了图像浏览器](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/3537)，转换为 [插件](https://github.com/yfszzx/stable-diffusion-webui-images-browser)

## 10/23

 - 在 [这次提交](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/070fda592bf80fb348ffe8e17b7c71cc288db729) 中，WebUI增加了日本语翻译。
 - 在 [这次提交](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/be748e8b086bd9834d08bdd9160649a5e7700af7) 中，WebUI 增加了设置锁定启动参数。

```python
parser.add_argument("--freeze-settings", action='store_true', help="disable editing settings", default=False)
```

有网友称，最近发布的的 Stable diffusion 1.5 偏向 *三次元* 一些。

WebUI 增加了俄语翻译，添加了 img2img API。

在 [这次请求](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/2067) 中，WebUI 更新了 ESRGAN 架构和模型以支持所有 ESRGAN 模型。

Colab 开始反滥用，[协议](https://research.google.com/colaboratory/faq.html#limitations-and-restrictions)禁止穿透。但是有人指出 [Colab并没有计划封禁 SD](https://github.com/googlecolab/colabtools/issues/3147)，确认误封。

Colab的 [协议](https://research.google.com/colaboratory/faq.html?hl=zh-CN) 不允许利用多个帐号绕过访问权限或资源使用情况限制。

有人反映，某度好像会封锁 NAI 的模型。


## 10/22

 - 在 [这次提交](https://github.com/AUTOMATIC1111/stable-diffusion-webui/commit/2b91251637078e04472c91a06a8d9c4db9c1dcf0) 中，仓库移除了美学权重。
   - 这项功能已经被转为 [插件](https://github.com/AUTOMATIC1111/stable-diffusion-webui-aesthetic-gradients)。

## 10/21

Implementation of Stable Diffusion with Aesthetic Gradients 美学权重

https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/2585


## 10/20

激活函数

https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/3199

SD v1.5

https://huggingface.co/runwayml/stable-diffusion-v1-5


## 10/19

各种模型链接正在失效，有余力可以分流备链。

## 10/14

[Rce 漏洞曝光](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/2571)，但是新版本中得到修复，请为实例设置密码。

## 10/13

automatic1111 的 repo 从 r/stablediffusion 的固定指南中删除

## 10/12

StabilityAI 从现在开始只发布 SFW 模型，from [Here](https://www.reddit.com/r/StableDiffusion/comments/y2dink/qa_with_emad_mostaque_formatted_transcript_with/is32y1d/)


## 10/11

新版本 Webui 增加了 Eta noise seed delta ，设为 31337 后会贴近NAI官方

现在可以训练 **Hypernetworks**

## 10/10 

测试发现,新版本 WebUI 优化显存占用(20xx—>10xx)，关闭浏览器和TG的硬件加速后，即使是4GB的  RTX2050 也可以启动 --medvram 模式！而且很快.

[Q & A](https://github.com/brycedrennan/imaginAIry/blob/master/docs/emad-qa-2020-10-10.md)

## 背景故事

NovelAI 是一个使用 AI 生成故事文本和**通过描述文字生成图片**的服务，而 Stable Diffusion 是由 Stability AI 发布的透过文字等生成图片的模型。

开发者 [AUTOMATIC](https://github.com/AUTOMATIC1111) 是 Stable-Diffusion-Webui 的主要开发者：此项目可以用于在使用 Stable Diffusion 等模型时调整参数，极大地方便了尤其是没有计算机背景或 AI/ML 背景的模型用户。

前几日 NovelAI [称其部分软件和源码泄露](https://old.reddit.com/r/NovelAi/comments/xydjc6/)。在模型泄露后， AUTOMATIC 在 Webui 项目中添加了对 **Hypernetwork** 模型的支持，使得此项目可以和泄露模型共用。

此 Reddit 贴称， Stability AI 创始人 Emad Mostaque 谴责 AUTOMATIC 此行为，并称后者窃取了代码；

AUTOMATIC 则称自己没有窃取代码，并解释说他编写的代码是基于很久以前已经完成的研究和开发，并且是开源的。有问题的函数于 2021 年 12 月 21 日在 [此处](https://github.com/CompVis/latent-diffusion/commit/e66308c7f2e64cb581c6d27ab6fbeb846828253b) 发布，并称反倒是 NovelAI 使用了自己的代码(https://imgur.com/a/Z2QsOEw)。

Stable Diffusion 社群管理员后又要求 AUTOMATIC 移除项目中的 Hypernetwork 支持，称 NovelAI 核心开发者认为相关代码必然与泄露源码有联系；但被以代码原创且 Hypernetwork **并非泄露模型独创** 的理由回绝。

而后， AUTOMATIC 被从 Stable Diffusion 的（Slack?）社群服务器中封禁。

来自 https://rentry.org/sd-tldr
