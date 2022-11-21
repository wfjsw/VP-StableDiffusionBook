# API

## 启用 API 

使用 `--api` 参数运行程序。

如果使用 `webui-user.bat`，可以设置 

```cmd
set COMMANDLINE_ARGS=--api
```

## 使用 API

在浏览器访问 `{WebUI 启动网址}/docs` (如 http://127.0.0.1:7860/docs) 就可以查看到 WebUI 的 [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/tree/master/modules/api) 文档。

详见 [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API)。

[Basic Documentation and Examples for using API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/3734)

下面是一个同步类实现。

```python
import time
import json
import requests
import io
import base64
from PIL import Image, PngImagePlugin

class WebUIApi(object):
    def __init__(url):
        self.url=url

    def txt2img(payload,outpath:str=None,infotie:bool=True):
        payload_json = json.dumps(payload)
        response = requests.post(url=f'{self.url}/sdapi/v1/txt2img', data=payload_json).json()
        # response 响应包含 images、parameters 和 info,image 可能会含有多个图像。
        for i in response['images']:
            # 解码 base64
            image = Image.open(io.BytesIO(base64.b64decode(i)))
            # 元信息输出
            pnginfo = PngImagePlugin.PngInfo()
            if infotie:
               pnginfo.add_text("parameters", str(response['info']))
            # 保存，因为本地不会自动生成文件。
            if not outpath:
               print("Random file name")
               outpath=f"{str(time.time())}.png"
            image.save(outpath, pnginfo=pnginfo)

payload = {
    "prompt": "1girl",
    "steps": 20
}
# 其他参数会使用默认值
WebUIApi(url="http://127.0.0.1:7860").txt2img(payload=payload,outpath="1145.png",infotie=True)
```

## 覆盖生成设置

关于 `override_settings`，此参数的目的是覆盖单个请求的 WebUI 设置，例如 CLIP Skip 等。可以传递到此参数的设置项列表可在文档中找到。

## 附录

- 跨平台多后端项目 [novelai-bot](https://github.com/koishijs/novelai-bot)
- Discord 机器人项目 [aiyabot](https://github.com/Kilvoctu/aiyabot/blob/main/core/stablecog.py)
