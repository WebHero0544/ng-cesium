import { SameModule } from './same.module';

describe('SameModule', () => {
  let sameModule: SameModule;

  beforeEach(() => {
    sameModule = new SameModule();
  });

  it('should create an instance', () => {
    expect(sameModule).toBeTruthy();
  });
});
