import { Experince95Page } from './app.po';

describe('experince95 App', () => {
  let page: Experince95Page;

  beforeEach(() => {
    page = new Experince95Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
