const helper = require("../helper");
const { chooseFields, saveButton, arrList, waitForSelectorLoad,saveButton1,selectorsNum } = require("../utils");
const {  fieldDropCombo, hasComboField, tableSelect, dataChange,resizeUnionField,resizeFilter,chooseConditionType } = require("./analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT,  SORT,SORT_SELECTOR,SATISFYTYPE } = require("./analysis_const");

//6、排序

step('<operate>排序,将第<n>个排序字段<field>设置为<sort>', async (operate, n, field, sort) => {
  if (operate == "添加") {
    await helper.page.click(`.hd-conf-analysis-sort-operator .hd-components-simple-button`);
    await helper.page.fill(`.hd-conf-analysis-sort-operator .bi-search-editor .bi-editor .bi-input`, field);
    await helper.page.click(`.hd-conf-analysis-sort-operator .hd-components-single-fields-list .bi-text:text("${field}")`);
  }
  if (n = 1) {
    await helper.page.click(SORT_SELECTOR.排序1);
    await helper.page.click(`${SORT_SELECTOR.排序1} .bi-text:text("${field}")`);
    await helper.page.click(`${SORT_SELECTOR.排序1} ${SORT[sort]}`);
  } else {
    await helper.page.click(`${SORT_SELECTOR.排序n}:nth-child[${n}]`);
    await helper.page.click(`${SORT_SELECTOR.排序n}:nth-child[${n}] .bi-text:text("${field}")`);
    await helper.page.click(`${SORT_SELECTOR.排序n}:nth-child[${n}] ${SORT[sort]}`);
  }

});

step('删除第<n>个排序操作', async (n) => {
  if (n = 1) {
    await helper.page.click(`${SORT_SELECTOR.排序1} .delete-button`);
  } else {
    await helper.page.click(`${SORT_SELECTOR.排序n}:nth-child[${n}] .delete-button`);
  }
});


