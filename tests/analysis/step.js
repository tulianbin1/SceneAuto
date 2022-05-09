const helper = require("../helper");
const { chooseFields, saveButton, arrList, waitForSelectorLoad,saveButton1,selectorsNum } = require("../utils");
const {  fieldDropCombo, hasComboField, tableSelect, dataChange,resizeUnionField,resizeFilter,chooseConditionType } = require("../analysis/analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT,  SORT,SORT_SELECTOR,SATISFYTYPE } = require("../analysis/analysis_const");

/*添加历史步骤其余用到的方法 */

async function stepUse(layout, step) {
  if (step == "左右合并" || step == "上下合并") {
    await helper.page.click(`${LAYOUT[layout]} ${ANALYSIS_STEP.合并表}`);
  }
  if (step == "新增字段-公式/函数" || step == "新增字段-分类赋值" || step == "新增字段-累积值" || step == "新增字段-排名") {
    await helper.page.click(`${LAYOUT[layout]} ${ANALYSIS_STEP.新增字段}`);
  }
  if (step == "行转列" || step == "列转行" || step == "删除重复字段") {
    await helper.page.click(`${LAYOUT[layout]} ${ANALYSIS_STEP.更多}`);
  }
  //其他剩余
  await helper.page.click(`${LAYOUT[layout]} ${ANALYSIS_STEP[step]}`);
  if (step == "左右合并" || step == "上下合并") {
    await waitForSelectorLoad("字段弹框");
  }
}


step('点击<layout>添加历史步骤<step>', async (layout, step) => {
  //1、右侧栏vs标题栏
  if (layout == "右侧栏") {
    //添加历史步骤+按钮
    await helper.page.click(`.hd-history-flow-add-combo .bi-basic-button`);
    await helper.page.waitForSelector(`${LAYOUT[layout]}`);
    await stepUse(layout, step);
  }
  else if (layout == "标题栏左侧") {
    var step1 = new Array('筛选', '排序', '左右合并', '上下合并', '字段类型转换', '字段重命名', '重新选字段', '行转列', '列转行', '删除重复字段', '分析表');
    arrList(step, step1, ANALYSIS_HEADER.更多步骤);

    var step2 = new Array('新增字段-公式/函数', '新增字段-分类赋值', '新增字段-累积值', '新增字段-排名');
    arrList(step, step2, ANALYSIS_HEADER.新增字段);
    await stepUse(layout, step);
  }

});

//1、选字段：选择字段 <全选> or <指定字段>
step('选取<FieldsName>字段', async (FieldsName) => {
  await chooseFields(FieldsName);
});

//2、重新选字段
step('重新选择字段<FieldsName>', async (FieldsName) => {
  await chooseFields(FieldsName);
});

