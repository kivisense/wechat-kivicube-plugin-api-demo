# Kivicube插件高级API使用说明文档

## 源码目录

### 场景

#### 一、[基础【如何获取高级API】](../../tree/master/pages/base/scene/)

#### 二、素材对象【如何使用高级API】

##### 1、[素材对象共有API【修改素材位置/大小/旋转、隐藏/显示、监听点击事件】](../../tree/master/pages/api/common/)

##### 2、[视频/透明视频独有API【控制视频播放，监听相关事件】](../../tree/master/pages/api/video/)

##### 3、[模型独有API【控制动画播放，监听相关事件】](../../tree/master/pages/api/model/)

##### 4、[音乐独有API【控制音乐播放，监听相关事件】](../../tree/master/pages/api/audio/)

##### 5、[将3d素材指定为遮罩](../../tree/master/pages/api/mask/)

#### 三、特殊素材(与编辑器后台无关)【如何使用高级API】

##### 1、[自定义环境贴图](../../tree/master/pages/api/envMap/)

##### 2、[精灵图序列](../../tree/master/pages/api/imageSprite/)

#### 四、场景【如何使用高级API】

##### 1、[云识别/陀螺仪场景主动跳过云识别阶段【不依赖后台配置】](../../tree/master/pages/api/skipCloudar/)

##### 2、[自动开始播放音乐、视频和模型动画【不依赖后台配置】](../../tree/master/pages/api/autoPlay/)

##### 3、[动态增删改场景素材](../../tree/master/pages/api/manage/)【**如何使用外部素材**】

##### 4、[简单的自定义动画](../../tree/master/pages/api/simpleAnimation/)

##### 5、[实现缓动动画](../../tree/master/pages/api/tweenAnimation/)

##### 6、[拍照处理](../../tree/master/pages/api/photo/)

##### 7、[动态切换前后摄像头](../../tree/master/pages/api/camera/)

##### 8、[穿透自定义UI点击到模型](../../tree/master/pages/api/penetrateUI/)

##### 9、[使用license去除图像追踪水印](../../tree/master/pages/api/image2d-tracking/)

### 合辑

#### 一、[基础【如何获取高级API】](../../tree/master/pages/base/collection/)

#### 二、合辑【如何使用高级API】

##### 1、[云识别类型合辑 - 自定义返回扫描功能](../../tree/master/pages/api/backToScan/)

##### 2、[云识别开启与关闭](../../tree/master/pages/api/cloudar/)

##### 3、[场景的打开与关闭](../../tree/master/pages/api/scene/)

##### 4、[拍照处理](../../tree/master/pages/api/collectionPhoto/)

## 高级API对象

阅读了上述合辑、场景的基础代码(即如何获取高级API)之后，会发现两个组件皆会通过ready事件，传递出一个拥有各种API、信息的对象【称之为高级API对象】。

**两个组件传递出的高级API对象，是完全不一样的。两者拥有完全不相同的API和信息。**

我们一般将kivicube-scene组件传递出的高级API对象命名为view，将kivicube-collection组件传递出的高级API对象命名为collection。

**重要：kivicube-collection组件还会通过特有的sceneReady事件，传递出和kivicube-scene组件一样的view对象。**

当合辑打开新场景，关闭旧场景时，仍会通过sceneReady事件传递出新场景的view对象。每个新打开的场景都拥有新的view对象，且和旧场景的view对象是不一样的实例(console.log(oldView === newView); // 输出false)。

如果合辑中，对同一个场景打开了两次，那获取到的view对象也是不一致的。

**注意：不能用其他场景的view对象，去控制当前场景的内容，否则会出现无法预料的问题。**

### collection

合辑的collection对象，拥有以下字段：

| 字段 | 类型 | 说明 | 示例代码(了解API的传参和返回值定义) |
| ---- | ------- | --- | ------- |
| collectionInfo | Object | 合辑的基本信息，该对象详细的字段定义见示例代码。 | [pages/base/collection/](../../tree/master/pages/base/collection/) |
| backToScan | Function | 调用后，会关闭当前打开的场景，和开启扫描功能，可去扫描合辑下的所有场景识别图。【只有“云识别”类型的合辑支持】 | [pages/api/backToScan/](../../tree/master/pages/api/backToScan/) |
| startCloudar | Function | 开启云识别扫描功能。可扫描当前合辑下的所有场景识别图 | [pages/api/cloudar/](../../tree/master/pages/api/cloudar/) |
| stopCloudar | Function | 停止云识别扫描功能 | [pages/api/cloudar/](../../tree/master/pages/api/cloudar/) |
| openScene | Function | 打开指定的场景。【注意：有场景正在打开过程中(sceneStart事件触发之前)，则调用无效】 | [pages/api/scene/](../../tree/master/pages/api/scene/) |
| closeCurrentScene | Function | 关闭当前已打开的场景 | [pages/api/scene/](../../tree/master/pages/api/scene/) |
| takePhoto | Function | 拍照 | [pages/api/collectionPhoto/](../../tree/master/pages/api/collectionPhoto/) |

### view

场景的view对象，拥有以下字段：

| 字段 | 类型 | 说明 | 示例代码(了解API的传参和返回值定义) |
| ---- | ------- | --- | ------- |
| sceneInfo | Object | 场景的基本信息，该对象详细的字段定义见示例代码。 | [pages/base/scene/](../../tree/master/pages/base/scene/) |
| skipCloudar | Function | 跳过场景的扫描阶段，直接呈现场景内容。 | [pages/api/skipCloudar/](../../tree/master/pages/api/skipCloudar/) |
| getObject | Function | 获取素材内容对象。**【注意： 只能在loadSceneEnd及之后的事件触发后，才能获取到素材对象。ready事件中无法获取到素材对象。】** | [pages/base/scene/](../../tree/master/pages/base/scene/) |
| getAllObject | Function | 获取场景中所有的素材内容对象 | [pages/base/scene/](../../tree/master/pages/base/scene/) |
| dispatchTouchEvent | Function | 手动触发一个touch点击事件 | [pages/api/penetrateUI/](../../tree/master/pages/api/penetrateUI/) |
| switchCamera | Function | 切换前后摄像头 | [pages/api/camera/](../../tree/master/pages/api/camera/) |
| takePhoto | Function | 拍照 | [pages/api/photo/](../../tree/master/pages/api/photo/) |
| generateEnvMapByCubeMap | Function | 生成一个6张图组成天空盒的环境贴图对象 | [pages/api/envMap/](../../tree/master/pages/api/envMap/) |
| generateEnvMapByPanorama | Function | 生成一个全景图的环境贴图对象 | [pages/api/envMap/](../../tree/master/pages/api/envMap/) |
| addModel | Function | 动态增加一个模型素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |
| addImage | Function | 动态增加一个图片素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |
| addVideo | Function | 动态增加一个视频素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |
| addAlphaVideo | Function | 动态增加一个透明视频素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |
| addAudio | Function | 动态增加一个音频素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |
| addImageSprite | Function | 动态增加一个精灵图(动图)素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |
| addBackgroundPanorama | Function | 动态增加一个全景图背景素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |
| remove | Function | 移除场景中的某个素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |
| clear | Function | 清空场景中所有的素材内容 | [pages/api/manage/](../../tree/master/pages/api/manage/) |

## 常见问题【重要，需仔细阅读】

### 如何在合辑组件中通过高级API管理(增删改)场景内容？

**重要：kivicube-collection的ready事件传递出来的不是view对象，而是collection对象。**

合辑不直接提供场景内容(比如模型、图片、视频等)管理的API，合辑只是个集合概念，它的作用是管理(打开与关闭)场景。对于具体的3D内容增删改，需要间接通过场景的高级API达到目的。

如果想在合辑中增加一个3D模型，需要先打开一个具体的场景(collection.openScene)，然后通过合辑的sceneReady事件拿到该场景的view对象，之后再用view对象操作内容。
