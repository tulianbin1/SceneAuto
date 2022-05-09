const helper = require("../helper");
const { chooseTableEdit, tableSelect } = require("../analysis/analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT } = require("../analysis/analysis_const");
const { selectorsNum, saveButton1 } = require("../utils");


step("新建分析表并使用表名为<TableName>的数据表并<isSave>", async (TableName, isSave) => {
  await helper.page.click("text=JSY_AutoTest");
  await helper.page.click(`.bi-bubble-combo:nth-child(2)`);
  await tableSelect(`.bi-popup-view`, TableName);
  await saveButton1(isSave);
})


step('点击分析表标题栏<header>', async (header) => {
  switch (header) {
    case "添加图表":
      await helper.page.click(ANALYSIS_HEADER.图表);
      await helper.page.click(ANALYSIS_HEADER[header]);
      break;
    case "创建副本":
      await helper.page.click(ANALYSIS_HEADER.更多);
      await helper.page.click(ANALYSIS_HEADER[header]);
      break;
    case "自动监控":
      await helper.page.click(ANALYSIS_HEADER.更多);
      await helper.page.click(ANALYSIS_HEADER[header]);
      break;
    default:
      await helper.page.click(ANALYSIS_HEADER[header]);
      break;
  }
});


step('悬浮查看<tooltip_type><name>的提示', async (tooltip_type, name) => {
  //tooltip_type:分析表(标题栏、历史步骤、数据...)、仪表板...
  //name:名称
  switch (tooltip_type) {
    case "分析表标题栏右侧":
      await helper.page.click(`.bi-tooltip ${ANALYSIS_HEADER[name]}`);
      break;
    case "分析表标题栏左侧":
      await helper.page.click(`.bi-tooltip ${LAYOUT.标题栏左侧} ${ANALYSIS_STEP[name]}`);
      break;
    case "分析表右侧栏":
      await helper.page.click(`.bi-tooltip ${LAYOUT.右侧栏} ${ANALYSIS_STEP[name]}`);
      break;
    default:
      //其他提示这边加
      break;
  }

});

step('分析表<name>的主页<edit><previewButton>', async (name, edit, previewButton) => {
  const num = await selectorsNum(`.hd-datalist-table-view`);
  await chooseTableEdit(`.hd-datalist-table-view`, name, previewButton, edit,num)
});