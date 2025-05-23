# Kivicube插件高级API使用说明文档V2

此文档针对 kivicube插件 2.0 版本，1.x 版本文档请见[链接](https://github.com/kivisense/wechat-kivicube-plugin-api-demo/tree/v1);

kivicube 2.0 迁移指南请见[链接](./HowToUpgrade.md);

## 源码目录

**声明：所有的示例代码仅供大家开发参考，若移植到自己的项目后有任何问题，请先自行检查和确认问题来源。确实为组件问题的，请创建Issues反馈。**

### 场景

#### 一、快速开始

##### 1.[如何获取高级API](./miniprogram/pages/quick-start/scene/)

#### 二、基础 素材管理和使用

##### 1.[3D对象共有API【基类】- 包含子对象处理、点击事件、渲染钩子函数、显示隐藏等的示例](./miniprogram/pages/base/common/)

##### 2.[glb模型](./miniprogram/pages/base/model/)

##### 3.[组合容器](./miniprogram/pages/base/group/)

##### 4.[将素材指定为遮罩](./miniprogram/pages/base/mask/)

##### 5.[精灵图](./miniprogram/pages/base/imageSprite/)

##### 6.[音频](./miniprogram/pages/base/audio/)

##### 7.[AR视频/透明视频](./miniprogram/pages/base/video/)

##### 8.[全景图](./miniprogram/pages/base/panorama/)

##### 9.[全景视频](./miniprogram/pages/base/panorama-video/)

##### 10.[天空盒子](./miniprogram/pages/base/sky-box/)

##### 11.[灯光](./miniprogram/pages/base/light/)

##### 12.[自定义环境贴图](./miniprogram/pages/base/env-map/)

##### 13.[素材管理 包含自定义增删改素材](./miniprogram/pages/base/manage/)

#### 三、其他

##### 1.[自定义动画播放和控制](./miniprogram/pages/others/play-animation/)

##### 2.[动态切换前后摄像头](./miniprogram/pages/others/camera/)

##### 3.[自动播放](./miniprogram/pages/others/autoPlay/)

##### 4.[自定义UI 穿透自定义UI点击到模型](./miniprogram/pages/others/penetrateUI/)

##### 5.[拍照处理 自定义拍照按钮](./miniprogram/pages/others/photo/)

##### 6.[简单的自定义动画](./miniprogram/pages/others/simpleAnimation/)

##### 7.[使用TWEEN 实现缓动动画](./miniprogram/pages/others/tweenAnimation/)

##### 8.[AR画面录制](./miniprogram/pages/others/recorder/)

##### 9.[设置色调映射](./miniprogram/pages/others/tone-mapping/)

##### 10.[设置各向异性](./miniprogram/pages/others/set-anisotropy/)

##### 11.[加载量化(优化三角形/网格/材质/纹理/顶点/动画)后的模型](./miniprogram/pages/others/load-compressed-gltf/)

##### 12.[camera - 获取位置、3D素材放置屏幕上](./miniprogram/pages/others/screen/)

##### 13、[简单判断模型是否在相机画面内](./miniprogram/pages/others/model-render/)

#### 四、云识别/陀螺仪场景

##### 1.[云识别/陀螺仪场景主动跳过云识别阶段【不依赖后台配置】](./miniprogram/pages/cloudar/skipCloudar/)

#### 五、图像AR场景

##### 1.[使用license去除图像追踪水印](./miniprogram/pages/image-tracking/image2d-tracking/)

##### 2.[手动设置图像追踪版本](./miniprogram/pages/image-tracking/tracking-version/)

#### 六、平面AR场景

##### 1.[使用指示器点击放置](./miniprogram/pages/plane/indicator/)

##### 2.[检测到平面自动放置](./miniprogram/pages/plane/auto-locate/)

#### 七、漫游AR场景

##### 1.[漫游AR场景示例](./miniprogram/pages/roam/roam-ar/)

#### 八、世界AR场景

##### 1.[世界AR场景示例](./miniprogram/pages/world/world-ar/)

##### 2.[世界AR场景 自定义 marker示例](./miniprogram/pages/world/world-marker/)

##### 3.[世界AR场景 多图识别示例（模拟合辑功能）](./miniprogram/pages/world/multiple/simple/)

#### 九、合辑

##### 1.[基础【如何获取高级API】](./miniprogram/pages/collection/collection/)

##### 2.[云识别类型合辑 - 自定义返回扫描功能](./miniprogram/pages/collection/backToScan/)

##### 3.[云识别开启与关闭](./miniprogram/pages/collection/cloudar/)

##### 4.[场景的打开与关闭](./miniprogram/pages/collection/scene/)

##### 5.[拍照](./miniprogram/pages/collection/collectionPhoto/)

## 高级API对象

阅读了上述合辑、场景的基础代码(即如何获取高级API)之后，会发现两个组件皆会通过ready事件，传递出一个拥有各种API、信息的对象【称之为高级API对象】。

**两个组件传递出的高级API对象，是完全不一样的。两者拥有完全不相同的API和信息。**

我们一般将kivicube-scene组件传递出的高级API对象命名为view，将kivicube-collection组件传递出的高级API对象命名为collection。

**重要：kivicube-collection组件还会通过特有的sceneReady事件，传递出和kivicube-scene组件一样的view对象。**

当合辑打开新场景，关闭旧场景时，仍会通过sceneReady事件传递出新场景的view对象。每个新打开的场景都拥有新的view对象，且和旧场景的view对象是不一样的实例`(console.log(oldView === newView); // 输出false)`。

如果合辑中，对同一个场景打开了两次，那获取到的view对象也是不一致的。

**注意：不能用其他场景的view对象，去控制当前场景的内容，否则会出现无法预料的问题。**

### collection

合辑的collection对象，拥有以下字段：

| 字段 | 类型 | 说明 | 示例代码(了解API的传参和返回值定义) |
| ---- | ------- | --- | ------- |
| collectionInfo | Object | 合辑的基本信息，该对象详细的字段定义见示例代码。 | [pages/collection/collection/](./miniprogram/pages/collection/collection/) |
| backToScan | Function | 调用后，会关闭当前打开的场景，和开启扫描功能，可去扫描合辑下的所有场景识别图。【只有“云识别”类型的合辑支持】 | [pages/collection/backToScan/](./miniprogram/pages/collection/backToScan/) |
| startCloudar | Function | 开启云识别扫描功能。可扫描当前合辑下的所有场景识别图 | [pages/collection/cloudar/](./miniprogram/pages/collection/cloudar/) |
| stopCloudar | Function | 停止云识别扫描功能 | [pages/collection/cloudar/](./miniprogram/pages/collection/cloudar/) |
| openScene | Function | 打开指定的场景。【注意：有场景正在打开过程中(sceneStart事件触发之前)，则调用无效】 | [pages/collection/scene/](./miniprogram/pages/collection/scene/) |
| closeCurrentScene | Function | 关闭当前已打开的场景 | [pages/collection/scene/](./miniprogram/pages/collection/scene/) |
| takePhoto | Function | 拍照 | [pages/collection/collectionPhoto/](./miniprogram/pages/collection/collectionPhoto/) |

### view

场景的view对象，拥有以下字段：

| 字段 | 类型 | 说明 | 示例代码(了解API的传参和返回值定义) |
| ---- | ------- | --- | ------- |
| sceneInfo | Object | 场景的基本信息，该对象详细的字段定义见示例代码。 | [pages/quick-start/scene/](./miniprogram/pages/quick-start/scene/) |
| skipCloudar | Function | 跳过场景的扫描阶段，直接呈现场景内容。 | [pages/cloudar/skipCloudar/](./miniprogram/pages/cloudar/skipCloudar/) |
| getObject | Function | 获取素材内容对象。**【注意： 只能在loadSceneEnd及之后的事件触发后，才能获取到素材对象。ready事件中无法获取到素材对象。】** | [pages/quick-start/scene/](./miniprogram/pages/quick-start/scene/) |
| getAllObject | Function | 获取场景中所有的素材内容对象 | [pages/quick-start/scene/](./miniprogram/pages/quick-start/scene/) |
| dispatchTouchEvent | Function | 手动触发一个touch点击事件 | [pages/others/penetrateUI/](./miniprogram/pages/others/penetrateUI/) |
| switchCamera | Function | 切换前后摄像头 | [pages/others/camera/](./miniprogram/pages/others/camera/) |
| takePhoto | Function | 拍照 | [pages/others/photo/](./miniprogram/pages/others/photo/) |
| createGltfModel | Function | 创建一个模型素材对象 | [pages/base/manage/](./miniprogram/pages/base/manage/) |
| createImage | Function | 创建一个图片素材对象 | [pages/base/manage/](./miniprogram/pages/base/manage/) |
| createVideo | Function | 创建一个视频素材对象 | [pages/base/manage/](./miniprogram/pages/base/manage/) |
| createAlphaVideo | Function | 创建一个透明视频素材对象 | [pages/base/manage/](./miniprogram/pages/base/manage/) |
| createPanorama | Function | 创建一个全景图对象 | [pages/base/panorama/](./miniprogram/pages/base/panorama/) |
| createPanoramaVideo | Function | 创建一个全景视频素材对象 | [pages/base/panorama-video/](./miniprogram/pages/base/panorama-video/) |
| createAudio | Function | 创建一个音频素材对象 | [pages/base/manage/](./miniprogram/pages/base/manage/) |
| createImageSprite | Function | 创建一个精灵图（动图）素材对象 | [pages/base/manage/](./miniprogram/pages/base/manage/) |
| createGroup | Function | 创建一个组合3D对象。可用来装载其他3D对象(包括组合) | [pages/base/group/](./miniprogram/pages/base/group/) |
| createSkyBox | Function | 创建一个天空盒对象 | [pages/base/sky-box/](./miniprogram/pages/base/sky-box/) |
| createEnvMapByCubeMap | Function | 创建一个基于6张图组成天空盒的环境贴图对象 | [pages/base/env-map/](./miniprogram/pages/base/env-map/) |
| createEnvMapByPanorama | Function | 创建一个基于全景图的环境贴图对象 | [pages/base/env-map/](./miniprogram/pages/base/env-map/) |
| createEnvMapByHDR | Function | 创建一个基于HDR文件的环境贴图对象 | [pages/base/env-map/](./miniprogram/pages/base/env-map/) |
| createEnvMapByImage | Function | 创建一个基于图片的环境贴图对象 | [pages/base/env-map/](./miniprogram/pages/base/env-map/) |
| createAmbientLight | Function | 创建一个环境光3D对象 | [pages/base/light/](../../tree/master/pages/base/light/) |
| createDirectionalLight | Function | 创建一个平行光3D对象 | [pages/base/light/](../../tree/master/pages/base/light/) |
| defaultAmbientLight | Object | 获取默认的环境光3D对象 | [pages/base/light/](./miniprogram/pages/base/light/) |
| defaultDirectionalLightLeft | Object | 获取默认的左平行光3D对象 | [pages/base/light/](./miniprogram/pages/base/light/) |
| defaultDirectionalLightRight | Object | 获取默认的右平行光3D对象 | [pages/base/light/](./miniprogram/pages/base/light/) |
| clone | Function | 克隆一个3d对象。 | [待新增](./miniprogram/pages/) |
| add | Function | 将上述创建好的3D对象，增加进组件之中去呈现。 | [pages/base/sample/](./miniprogram/pages/base/sample/) |
| remove | Function | 移除场景中的某个素材内容 | [pages/base/manage/](./miniprogram/pages/base/manage/) |
| destroyObject | Function | 销毁创建的某个3D对象。(回收内存) | [pages/base/sample/](./miniprogram/pages/base/manage/) |
| clear | Function | 清空场景中所有的素材内容 | [pages/base/manage/](./miniprogram/pages/base/manage/) |
| isTracking1 | Boolean | 是否是图像追踪版本1 | [待新增](./miniprogram/pages/) |
| isTracking2 | Boolean | 是否是图像追踪版本2 | [待新增](./miniprogram/pages/) |
| createRecorder | Function | 创建AR内容录制器, 插件版本 | [pages/others/record/](./miniprogram/pages/others/recorder/) |

## 常见问题【重要，需仔细阅读】

### 如何在合辑组件中通过高级API管理(增删改)场景内容？

**重要：kivicube-collection的ready事件传递出来的不是view对象，而是collection对象。**

合辑不直接提供场景内容(比如模型、图片、视频等)管理的API，合辑只是个集合概念，它的作用是管理(打开与关闭)场景。对于具体的3D内容增删改，需要间接通过场景的高级API达到目的。

如果想在合辑中增加一个3D模型，需要先打开一个具体的场景(collection.openScene)，然后通过合辑的sceneReady事件拿到该场景的view对象，之后再用view对象操作内容。
