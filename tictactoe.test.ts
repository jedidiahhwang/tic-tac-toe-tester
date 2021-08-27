import { Builder, Capabilities, By } from "selenium-webdriver"
import { textChangeRangeIsUnchanged } from "typescript"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
    
});

// Added tests

// Using find by id
test("I can click the upper left square to add an X", async() => {
    let upperLeftSquare = await driver.findElement(By.id("cell-0"))
    upperLeftSquare.click();
    expect(await upperLeftSquare.getText()).toEqual("X");
    await driver.sleep(1000);
})

// Using xpath
test("Clicking the upper right square to add an X", async function() {
    let squares = await driver.findElements(By.xpath("//td"));
    let upperRightSquare = squares[2];
    upperRightSquare.click();
    expect(await upperRightSquare.getText()).toEqual("X");
    await driver.sleep(1000);
})

// Using CSS
test("Clicking the lower right square adds an X to the square", async function() {
    let lowerRightSquare = await driver.findElement(By.css("#cell-8")) // argument = html element
    lowerRightSquare.click();
    await driver.sleep(1000);
})

// Computer adds an O
test("Computer adds an O after clicking on a square", async function() {
    // Refresh the game, this is built into Selenium
    driver.navigate().refresh();
    await driver.sleep(1000);

    // Start a new game
    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();

    // Grab references to squares
    let upperLeftSquare = await driver.findElement(By.id("cell-0"));
    let upperRightSquare = await driver.findElement(By.id("cell-2"));
    let middleCenterSquare = await driver.findElement(By.id("cell-4"));

    // Click buttons for turns
    upperLeftSquare.click();
    await driver.sleep(1000);
    upperRightSquare.click();
    await driver.sleep(1000);
    middleCenterSquare.click();
    await driver.sleep(1000);

    // Find number of O's on the board, it should equal the number of X's
    const oMoves = await driver.findElements(By.xpath('//td[text()="O"]'));
    const xMoves = await driver.findElements(By.xpath('//td[text()="X"]'));

    expect(oMoves.length === xMoves.length).toBeTruthy();
})