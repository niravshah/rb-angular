import { RbAngularPage } from './app.po';

describe('rb-angular App', () => {
  let page: RbAngularPage;

  beforeEach(() => {
    page = new RbAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
