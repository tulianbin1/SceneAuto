const helper = require("../helper");
const { chooseFields, saveButton, arrList, waitForSelectorLoad,saveButton1,selectorsNum } = require("../utils");
const {  fieldDropCombo, hasComboField, tableSelect, dataChange,resizeUnionField,resizeFilter,chooseConditionType } = require("./analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT,  SORT,SORT_SELECTOR,SATISFYTYPE } = require("./analysis_const");

//5、字段类型转换
async function typeConvert(n, field, newType) {
  await helper.page.click(`.hd-conf-analysis-field-type-conversion-item:nth-child(${n}) .bi-popper`);
  await helper.page.fill(`.hd-conf-analysis-field-type-conversion-item:nth-child(${n}) .bi-search-editor .bi-editor .bi-input`, field);
  await helper.page.click(`.hd-conf-analysis-field-type-conversion-item:nth-child(${n}) .bi-text:text("${field}")`);
  await helper.page.click(`.hd-conf-analysis-field-type-conversion-item:nth-child(${n}) .hd-components-field-type-combo`);
  await helper.page.click(`.hd-conf-analysis-field-type-conversion-item:nth-child(${n}) .hd-components-field-type-combo .bi-text:text("${newType}")`);
}
step('<operate>字段类型转换,将第<n>个字段<oldName>转换为<newType>类型', async (operate, n, field, newType) => {
  if (operate == "添加") {
    await helper.page.click(`.hd-conf-analysis-field-type-conversion .hd-components-simple-button`);
  }
  await typeConvert(n, field, newType);
});

step('删除第<n>个字段转换操作', async (n) => {
  await helper.page.click(`.hd-conf-analysis-field-type-conversion:nth-child(${n}) .delete-button`);
});

