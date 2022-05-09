const helper = require("../helper");
const { chooseFields, saveButton, arrList, waitForSelectorLoad,saveButton1,selectorsNum } = require("../utils");
const {  fieldDropCombo, hasComboField, tableSelect, dataChange,resizeUnionField,resizeFilter,chooseConditionType } = require("./analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT,  SORT,SORT_SELECTOR,SATISFYTYPE } = require("./analysis_const");

//3、分类汇总
//删除、重命名字段
step('<operate><area>第<n>个字段', async (operate, area, n) => {
  await fieldDropCombo(area, n);
  const field1 = await hasComboField(area, n);
  if (operate == "重命名") {
    await helper.page.click(`${field1} .bi-text:text("重命名")`);
  } else {
    await helper.page.click(`${field1} .bi-text:text("删除")`);
  }

});
//设置字段格式、计算方式
step('设置<area>第<n>个字段<dateFormat>', async (area, n, dateFormat) => {
  await fieldDropCombo(area, n);
  const field2 = await hasComboField(area, n);
  var format = new Array('季度', '月份', '月日', '周数', '星期', '日', '时', '分', '秒', '年月日时', '年月日时分');
  for (var i = 0; i < format.length; i++) {
    if (dateFormat == format[i]) {
      await helper.page.click(`${field2} .bi-text:text("更多分类")`);
      break;
    }
  }
  await helper.page.click(`${field2} .bi-text:text("${dateFormat}")`);

});

step('<operate>合并上一步数据，选取<FieldsName>字段并<isSave>', async (operate, FieldsName, isSave) => {
  if (operate == "编辑") {
    await helper.page.click(`.hd-conf-analysis-group-operator .edit-font`);
  } else if (operate == "点击按钮") {
    await helper.page.click(`.hd-conf-analysis-group-operator .checkbox-content`);
  }
  await chooseFields(FieldsName);
  await saveButton1(isSave);
});

step('取消合并上一步数据', async () => {
  await helper.page.click(`.hd-conf-analysis-group-operator .checkbox-content`);
});



