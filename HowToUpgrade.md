# Kivicube插件 2.0 迁移指南

## 值得注意的新特性

2.0 中需要关注的一些新特性包括:

- 统一了技术插件的使用方式，比如创建 3d 对象和添加场景的方式
- 新增了更加稳定的图像追踪 tracking2 版本
- 支持更多的 3d 类型和 api 方法
- 新增AR画面录制
- 修改了 license 的使用方式
- 移除了 `kivi-cloudar` 组件，如果需要使用，请使用新版[弥知AI识别插件](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wxf51acd2cc2b1c978)

## api 的修改

v1 版本的插件中，通过 view 对象创建的 3d 对象会直接加入到场景之中，然而新版的 api 会直接返回创建的 3d 对象（不再默认加入到场景），由开发者自己控制加入场景的时机和更自由地对 3d 对象进行组合。

以下为修改 `view` 对象中 api 对应列表

`addModel` 改为 `createGltfModel`
`addImage` 改为 `createImage`
`addVideo` 改为 `createVideo`
`addAlphaVideo` 改为 `createAlphaVideo`
`addAudio` 改为 `createAudio`
`addImageSprite` 改为 `createImageSprite`
`addBackgroundPanorama` 改为 `createPanorama`
`generateEnvMapByCubeMap` 改为 `createEnvMapByCubeMap`
`generateEnvMapByPanorama` 改为 `createEnvMapByPanorama`
`generateEnvMapByHDR` 改为 `createEnvMapByHDR`

以上修改的方法见 README 文档说明。

## 新增的 api

view 对象提供了新的 api 以供开发者更加方便和自由的对场景的元素进行操作
`createGroup`: 创建一个组，可以将多个 3d 对象加入其中，进行统一的操作，例如 位移，旋转，缩放
`add`: 将创建的 3d 对象加入到场景中
`clone`: 克隆一个3d对象
`createSkyBox`: 创建天空盒对象
`createPanoramaVideo`: 创建全景视频
`createDirectionalLight`: 创建平行光
`createAmbientLight`: 创建环境光
`defaultDirectionalLightLeft`: 获取默认的左平行光
`defaultDirectionalLightRight`: 获取默认的右平行光
`defaultAmbientLight`: 获取默认环境光
`createRecorder`: 创建3d场景录制器
`setToneMapping`: 设置色调映射

更多内容敬请期待中...
