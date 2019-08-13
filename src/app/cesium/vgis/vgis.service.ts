import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare const Cesium;

@Injectable()
export class VgisService {
  constructor(
    private http: HttpClient
  ) { }

  viewerOption = {

  };

  // 初始化配置
  initOption(viewer) {
    // 去掉版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";

    //添加3D地形
    var terrainProvider = Cesium.createWorldTerrain({   //注入3d地形
      requestVertexNormals: true, //添加阳光3d地形
      requestWaterMask: true  //添加水3d地形
    });
    viewer.terrainProvider = terrainProvider;
    viewer.scene.globe.enableLighting = true;

    //显示坐标控制面板
    // viewer.extend(Cesium.viewerCesiumInspectorMixin);  

    // 设置相机位置  海坨山 （左下角 115.79 40.54  右上角115.82 40.56）
    viewer.camera.setView({
      destination: Cesium.Rectangle.fromDegrees(115.82, 40.54, 115.82, 40.56),  //西，南， 东， 北
      orientation: {
        heading: 0.0,
        pitch: -Cesium.Math.PI_OVER_TWO,
        roll: 0.0
      }
    });



    //显示坐标 
    var canvas = viewer.scene.canvas;
    var placeInfoDom = document.getElementById('placeInfo');
    var handler = new Cesium.ScreenSpaceEventHandler(canvas);
    handler.setInputAction(function (movement) {
      var cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
      var ellipsoid = viewer.scene.globe.ellipsoid;
      if (cartesian) { //能获取，显示坐标
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var coords = '经度:' + Cesium.Math.toDegrees(cartographic.longitude).toFixed(2) + ', ' + '纬度:' + Cesium.Math.toDegrees(cartographic.latitude).toFixed(2) + ', ' + '高度:' + Math.ceil(viewer.camera.positionCartographic.height);
        placeInfoDom.innerHTML = coords;
        placeInfoDom.style.display = '';
      } else { //不能获取不显示
        placeInfoDom.style.display = 'none';
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  }




















  // 3D model 搜索 Exton, PA
  model3d(viewer) {
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 0.0));
    var model = viewer.scene.primitives.add(Cesium.Model.fromGltf({
      // /GroundVehicle/GroundVehicle.glb 车  /CesiumMan/Cesium_Man.glb 人  /CesiumAir/Cesium_Air.glb 飞机
      url: '/assets/js/cesium/Apps/SampleData/models/CesiumAir/Cesium_Air.glb',
      modelMatrix: modelMatrix,
      scale: 200.0
    }));

    Cesium.when(model.readyPromise).then(function (model) {
      model.activeAnimations.addAll({
        loop: Cesium.ModelAnimationLoop.REPEAT,
        speedup: 0.5,
        reverse: true
      });
    });
  }



  //禁用相机默认事件
  disableCameraEvent(viewer) {
    var scene = viewer.scene;
    var canvas = viewer.canvas;
    canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
    canvas.onclick = function () {
      canvas.focus();
    };
    // disable the default event handlers
    scene.screenSpaceCameraController.enableRotate = false;
    scene.screenSpaceCameraController.enableTranslate = false;
    scene.screenSpaceCameraController.enableZoom = false;
    scene.screenSpaceCameraController.enableTilt = false;
    scene.screenSpaceCameraController.enableLook = false;

  }

  // 自定义相机事件
  customCameraEvents(viewer) {
    this.disableCameraEvent(viewer);
    // 待续......
  }




  getSiteInfo() {
    return this.http.get('./assets/data/siteInfo.json');
  }


}
