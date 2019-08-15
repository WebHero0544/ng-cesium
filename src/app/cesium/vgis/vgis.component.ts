import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VgisService } from './vgis.service';

declare const Cesium;

@Component({
  selector: 'app-vgis',
  templateUrl: './vgis.component.html',
  styleUrls: ['./vgis.component.scss'],
  providers: [VgisService]
})
export class VgisComponent implements OnInit, AfterViewInit {

  constructor(
    private vgisService: VgisService
  ) { }

  viewer = null;



  ngOnInit() {

  }

  ngAfterViewInit() {

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NTcxMzFiYS04NmQ2LTRhOWEtOWU0OS0zNWNlODdiYWYxODYiLCJpZCI6MzEzNywiaWF0IjoxNTM2MTQyNTc3fQ.g5qWOspOnxCNXPUoTzWyxQDjWqicNLOwJ9QaQUWRzAA';



    this.viewer = new Cesium.Viewer('cesiumContainer', this.vgisService.viewerOption);

    this.vgisService.initOption(this.viewer);

    this.draw();

    this.cs()

  }


  draw() {
    this.vgisService.getSiteInfo().subscribe(
      (data: any) => {

        const placeList = []
        data.list.SiteInfo.forEach(el => {
          const zb = [+el.longitude, +el.latitude]
          placeList.push(...zb);
          this.point(zb, el.name)
        });
        // console.log(placeList);
        this.polyline(placeList);
      },
      err => {
        console.error(err);
      }
    )
  }


  point(place: number[] = [], text: string = '') {

    var citizensBankPark = this.viewer.entities.add({
      name: text,
      position: Cesium.Cartesian3.fromDegrees(...place),
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      },
      label: {
        text: text,
        font: '14pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -9),
        showBackground: true,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    });
  }



  polyline(placeList: number[] = []) {

    var orangeOutlined = this.viewer.entities.add({
      name: 'xxx赛道',
      description: '\
      <img\
        width="50%"\
        style="float:left; margin: 0 1em 1em 0;"\
        src="//cesiumjs.org/tutorials/Visualizing-Spatial-Data/images/Flag_of_Wyoming.svg"/>\
      <p>\
        Wyoming is a state in the mountain region of the Western \
        United States.\
      </p>\
      <p>\
        Wyoming is the 10th most extensive, but the least populous \
        and the second least densely populated of the 50 United \
        States. The western two thirds of the state is covered mostly \
        with the mountain ranges and rangelands in the foothills of \
        the eastern Rocky Mountains, while the eastern third of the \
        state is high elevation prairie known as the High Plains. \
        Cheyenne is the capital and the most populous city in Wyoming, \
        with a population estimate of 62,448 in 2013.\
      </p>\
      <p>\
        Source: \
        <a style="color: WHITE"\
          target="_blank"\
          href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
      </p>',
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray(placeList),
        width: 10,
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.ORANGE,
          outlineWidth: 2,
          outlineColor: Cesium.Color.BLACK
        }),
        clampToGround: true
      }
    });

    this.viewer.flyTo(this.viewer.entities);
  }









  // 矩形
  rectangle() {
    var instance = new Cesium.GeometryInstance({
      geometry: new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(-100.0, 20.0, -90.0, 30.0),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
      })
    });


    this.viewer.scene.primitives.add(new Cesium.Primitive({
      geometryInstances: instance,
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: Cesium.Material.fromType('Stripe')
      })
    }));

    // setInterval(function () {
    //   var attributes = primitive.getGeometryInstanceAttributes('circle');
    //   attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.fromRandom({ alpha: 1.0 }));
    // }, 2000);
  }


  // 无棒棒棒糖
  lollipop() {
    var instances = [];
    for (var lon = -180.0; lon < 180.0; lon += 5.0) {
      for (var lat = -85.0; lat < 85.0; lat += 5.0) {
        instances.push(new Cesium.GeometryInstance({
          geometry: new Cesium.RectangleGeometry({
            rectangle: Cesium.Rectangle.fromDegrees(lon, lat, lon + 5.0, lat + 5.0),
            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({ alpha: 0.5 }))
          }
        }));
      }
    }

    this.viewer.scene.primitives.add(new Cesium.Primitive({
      geometryInstances: instances,
      appearance: new Cesium.PerInstanceColorAppearance()
    }));
  }



  cs() {
    let index = -1
    const cb = () => {
      index++
      index = index % 6
      return require(`../../../assets/img/bj${index}.png`)
    }

    var redRectangle = this.viewer.entities.add({
      name: 'Red translucent rectangle',
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-110.0, 20.0, -95.0, 25.0),
        // material: Cesium.Color.RED.withAlpha(0.5)
        material: new Cesium.ImageMaterialProperty({
          image: new Cesium.CallbackProperty(cb, false)
        })
      }
    })
  }

}
