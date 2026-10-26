let page1;

beforeEach(async () => {
  page1 = await browser.newPage();
  await page1.goto("https://github.com/team");
});

afterEach(async () => {
  await page1.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page1.$("header div div a");
    await firstLink.click();
    await page1.waitForSelector("h1", { timeout: 60000 });
    const title2 = await page1.title();
    expect(title2).toEqual(
      "GitHub · Change is constant. GitHub keeps you ahead. · GitHub · GitHub",
    );
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page1.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  // тест ожидаемо падает, т.к. github сменил верстку страницы
  test("The page contains Sign in button", async () => {
    const btnSelector = 'a.Primer_Brand__Button-module__Button[href*="/join"]';
    await page1.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page1.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 60000);
});

describe("GitHub page link tests", () => {
  let page2;
  beforeEach(async () => {
    page2 = await browser.newPage();
    await page2.setViewport({ width: 1280, height: 800 });
    await page2.goto("https://github.com", { timeout: 6000 });
  }, 6000);

  afterEach(async () => {
    await page2.close();
  }, 6000);

  test("Clicking Pricing link opens Pricing page", async () => {
    const expected = "GitHub · Plans & pricing for every developer and team";
    await page2.click('a[href="/pricing"]', { timeout: 60000 });
    await page2.waitForNavigation({ timeout: 60000 });

    const title = await page2.title();
    expect(title).toContain(expected);
  }, 60000);

  test("Clicking Enterprises link opens Enterprises page", async () => {
    const expected =
      "github enterprise - secure ai development at scale - github · github";
    await page2.waitForSelector('a[href="/enterprise"]', {
      visible: true,
      timeout: 60000,
    });
    await page2.click('a[href="/enterprise"]');
    await page2.waitForNavigation({ timeout: 60000 });

    const title = await page2.title();
    expect(title.toLowerCase()).toContain(expected);
  }, 60000);

  test("Clicking Features link opens Features page", async () => {
    const expected = "GitHub Features · GitHub";
    await page2.waitForSelector('a[href="/features"]', {
      visible: true,
      timeout: 60000,
    });
    await page2.click('a[href="/features"]');
    await page2.waitForNavigation({ timeout: 60000 });

    const title = await page2.title();
    expect(title).toContain(expected);
  }, 60000);
});
