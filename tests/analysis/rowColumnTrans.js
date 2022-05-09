const helper = require("../helper");
const { chooseFields, saveButton, arrList, waitForSelectorLoad,saveButton1,selectorsNum } = require("../utils");
const {  fieldDropCombo, hasComboField, tableSelect, dataChange,resizeUnionField,resizeFilter,chooseConditionType } = require("./analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT,  SORT,SORT_SELECTOR,SATISFYTYPE } = require("./analysis_const");


//7、列转行
step('列转行-待转换字段为<field>并<isSave>', async (field, isSave) => {
  await helper.page.click(`.bi-multi-select-trigger`);
  await helper.page.click(`.bi-value-chooser-combo .bi-text:text("${field}")`);
  await saveButton(`.bi-multi-select-popup-view`, isSave);

});

//8、行转列
step('行转列-<field1>列字段<content>转化为第<n>个值字段', async (field1, content, n) => {
  await helper.page.click(`.bi-search-text-value-combo .pull-down-font`);
  await helper.page.click(`.bi-search-text-value-combo .bi-button-group .bi-text:text("${field1}")`);
  await helper.page.click(`.hd-conf-analysis-pivot-list .bi-text:text("${content}")`);
  await helper.page.click(`.hd-conf-analysis-pivot-item:nth-child(${n}) .bi-basic-button`);
});
