const helper = require("./helper");
const { dragField, targetDragField } = require("./utils");
const { DRAGTYPE, AREAS, ISSAVE_LIST, PUBLIC_FORM } = require("./const")

//拖拽仪表板组件、图表字段、分类汇总字段 到区域内
step("拖拽<dragType><fieldName>到<area>中", async (dragType, fieldName, area) => {
    const originLocator = await dragField(dragType, fieldName);
    const targetLocator = await targetDragField(area);
    await originLocator.dragTo(targetLocator, { force: true, targetPosition: { x: 10, y: 10 } });
})
//3.一键删除字段:数据框
step("一键删除<area>字段", async (area) => {
    await helper.page.click(`${AREAS[area]} .clear-select-font i`);
})



