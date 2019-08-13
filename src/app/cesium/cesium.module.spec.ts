import { CesiumModule } from './cesium.module';

describe('CesiumModule', () => {
  let cesiumModule: CesiumModule;

  beforeEach(() => {
    cesiumModule = new CesiumModule();
  });

  it('should create an instance', () => {
    expect(cesiumModule).toBeTruthy();
  });
});
