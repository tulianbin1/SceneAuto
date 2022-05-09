const { expect } = require("chai");
const helper = require("./helper")
const { DRAGTYPE, AREAS, ISSAVE_LIST, PUBLIC_FORM } = require("./const")
const { tableSelect } = require("./analysis/analysis_utils")

async function drag(from_x, from_y, to_x, to_y) {
    await helper.page.mouse.move(from_x, from_y, { steps: 5 });
    await helper.page.mouse.down();
    await helper.page.mouse.move(to_x, to_y, { steps: 5 });
    await helper.page.mouse.up();
};


async function dragField(dragType, fieldName) {
    var targetField = await helper.page.locator(`${DRAGTYPE[dragType]} .bi-text:text("${fieldName}")`);
    return targetField;
}


async function targetDragField(area) {
    return helper.page.locator(`${AREAS[area]}`);
}


async function chooseFields(FieldsName) {
    //选择字段 <全选> or <指定字段>
    switch (FieldsName) {
        case "所有":
            await helper.page.click(`.hd-components-multi-fields-list .bi-abs .bi-v-tape .bi-basic-button .bi-text:text("全选")`);
            break;
        default:
            //搜索字段并选择
            // await helper.page.fill(`.hd-components-multi-fields-list .bi-editor .bi-input`, FieldsName);
            // await helper.page.waitForTimeout(1000);
            //await helper.page.waitForSelector(`.bi-components-multi-fields-list-item:nth-child(1) .bi-text:text("${FieldsName}")`);
            // await helper.page.click(`.bi-components-multi-fields-list-item`);
            await tableSelect(`.hd-components-multi-fields-list`, FieldsName);
            break;
    }
};
//为了使selector里包含targetClass：若selector不包含targetClass，点击
async function toHasClass(selector, targetClass) {
    await helper.page.waitForSelector(selector);
    const hasClass = await helper.page.evaluate(([selector, targetClass]) => document.querySelector(selector).classList.contains(targetClass), [selector, targetClass]);
    if (!hasClass) {
        await helper.page.click(selector);
    }
};

//为了使selector里不包含targetClass：若selector包含targetClass，点击
async function toExcludeClass(selector, targetClass) {
    await helper.page.waitForSelector(selector);
    const hasClass = await helper.page.evaluate(([selector, targetClass]) => document.querySelector(selector).classList.contains(targetClass), [selector, targetClass]);
    if (hasClass) {
        await helper.page.click(selector);
    }
};

//从下往上查找目标class
async function theClass(widgetPop) {
    const calssLength = await selectorsNum(widgetPop);
    for (let i = 1; i <= calssLength; i++) {
        await helper.page.waitForFunction(selector => !!document.querySelector(selector), `${widgetPop}:nth-last-of-type(${i})`);
        let display = await helper.page.$eval(`${widgetPop}:nth-last-of-type(${i})`, el => el.style.display);
        if (display === '') {
            return `${widgetPop}:nth-last-of-type(${i})`;
        }
    }
}

async function childrenNum(selector) {
    const tabNum = await helper.page.evaluate((selector) => {
        return $(selector).children().length;
    }, selector);
    return tabNum;
}

async function selectorsNum(selector) {
    const tabNum = await helper.page.evaluate((selector) => {
        return $(selector).length;
    }, selector);
    return tabNum;
}


async function saveButton(selector, isSave) {
    await helper.page.click(`${selector} ${ISSAVE_LIST[isSave]}`);
}
async function saveButton1(isSave) {
    await helper.page.click(`${ISSAVE_LIST[isSave]}`);
}

async function arrList(element, arr, selector) {
    for (var i = 0; i < arr.length; i++) {
        if (element == arr[i]) {
            await helper.page.click(selector);
            break;
        }
    }
}

async function waitForSelectorLoad(selector) {
    await helper.page.waitForSelector(PUBLIC_FORM[selector]);
}

async function openNewPage(url) {
    helper.page = await helper.browser.newPage();
    await helper.page.goto(url);
}

async function blur() {
    await helper.page.evaluate(() => {
        document.activeElement.blur();
    });
};

module.exports = {
    drag,
    chooseFields,
    theClass,
    childrenNum,
    selectorsNum,
    toHasClass,
    dragField,
    targetDragField,
    saveButton,
    saveButton1,
    arrList,
    waitForSelectorLoad,
    toExcludeClass,
    openNewPage,
    blur,
}

