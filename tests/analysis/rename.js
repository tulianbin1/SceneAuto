const helper = require("../helper");
const { chooseFields, saveButton, arrList, waitForSelectorLoad,saveButton1,selectorsNum } = require("../utils");
const {  fieldDropCombo, hasComboField, tableSelect, dataChange,resizeUnionField,resizeFilter,chooseConditionType } = require("./analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT,  SORT,SORT_SELECTOR,SATISFYTYPE } = require("./analysis_const");


//4、字段重命名
async function fieldRename(n, oldName, newName) {
  const content = `.hd-conf-analysis-field-rename-item:nth-child(${n})`;
  await helper.page.click(`${content} .bi-popper`);
  await helper.page.fill(`${content} .bi-search-editor .bi-editor .bi-input`, oldName);
  await helper.page.click(`${content} .bi-text:text("${oldName}")`);
  await helper.page.fill(`${content} .bi-editor .bi-input`, newName);
}
//
step('<operate>重命名,将第<n>个字段<oldName>重命名为<newName>', async (operate, n, oldName, newName) => {
  if (operate == "添加") {
    await helper.page.click(`.hd-conf-analysis-rename .hd-components-simple-button`);
  }
  await fieldRename(n, oldName, newName);
});

step('删除第<n>个重命名操作', async (n) => {
  await helper.page.click(`.hd-conf-analysis-field-rename-item:nth-child(${n}) .delete-button`);
});



