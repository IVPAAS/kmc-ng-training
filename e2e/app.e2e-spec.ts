import { KmcNgTrainingPage } from './app.po';

describe('kmc-ng-training App', () => {
  let page: KmcNgTrainingPage;

  beforeEach(() => {
    page = new KmcNgTrainingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
