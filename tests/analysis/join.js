const helper = require("../helper");
const { chooseFields, saveButton, arrList, waitForSelectorLoad,saveButton1,selectorsNum } = require("../utils");
const {  fieldDropCombo, hasComboField, tableSelect, dataChange,resizeUnionField,resizeFilter,chooseConditionType } = require("./analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT,  SORT,SORT_SELECTOR,SATISFYTYPE } = require("./analysis_const");

/*左右合并+上下合并功能*/

//9、左右合并
//unionType为上下or左右合并-》新增选表
step('<unionType>-选中表<TableName>,选择字段<FieldsName>并<isSave>', async (unionType, TableName, FieldsName, isSave) => {
  await tableSelect(`.bi-popup-view`,TableName);
  if (unionType == "左右合并") {
    await chooseFields(FieldsName);
  }
  await saveButton1(isSave);

});
//切换、编辑来源表
//eg:  "左右合并"-"不切换表选择字段"并"确定"(合并表来源项目"XXXX/数据列表"，表"X"的字段"XXXX")
step('<unionType>-<edit>并<isSave>(合并表来源表<TableName>的字段<FieldsName>)', async (unionType, edit, isSave, TableName, FieldsName) => {
  if (unionType == "左右合并") {
    await dataChange(`.hd-conf-analysis-join-choose-button .bi-down-list-combo`, TableName, FieldsName, edit, unionType, isSave);
  }
  if (unionType == "上下合并") {
    if (edit == "选择表") {
      await dataChange(`.hd-conf-analysis-union .bi-text:text("选择表")`, TableName, FieldsName, edit, unionType, isSave);
    } else {
      await dataChange(`.hd-conf-analysis-union .bi-down-list-combo`, TableName, FieldsName, edit, unionType, isSave);
    }
  }
});


//左右合并设置合并方式：N种
step('设置合并方式<combination>', async (combination) => {
  await helper.page.click(`.hd-conf-analysis-join .bi-text:text("${combination}")`);
});

//左右合并-新增、删除、修改合并依据
step('<edit>第<n>个合并依据(合并结果<result>,左表<leftTable>,右表<rightTable>)', async (edit, n, result, leftTable, rightTable) => {
  switch (edit) {
    case "添加":
      await helper.page.click(`.hd-conf-analysis-join .bi-text:text("添加合并依据")`);
      await resizeUnionField(result, leftTable, rightTable, n);
      break;
    case "修改":
      await resizeUnionField(result, leftTable, rightTable, n);
      break;
    case "删除":
      await helper.page.click(`.hd-conf-analysis-join-item:nth-child(${n}) .delete-button`);
      break;
  }
});


//10、上下合并
step('设置合并结果<result>,上表<upTable>,下表<downTable>', async (result, upTable, downTable) => {
  const num = await selectorsNum(`.merge-operator .bi-v:nth-child(2) .bi-grid-table-cell`);
  await helper.page.fill(`.merge-operator .bi-v:nth-child(2) .bi-grid-table-cell:nth-child(${Number(n)}) .bi-editor .bi-input`, result);
  await helper.page.click(`.merge-operator .bi-v:nth-child(4) .bi-grid-table-cell:nth-child(${Number(n)}) .bi-popper`);
  await helper.page.click(`.merge-operator .bi-v:nth-child(4) .bi-grid-table-cell:nth-child(${Number(n)}) .bi-popup-view .bi-text:text("${upTable}")`);
  await helper.page.click(`.merge-operator .bi-v:nth-child(4) .bi-grid-table-cell:nth-child(${Number(n) + Number(num)}) .bi-popper`);
  await helper.page.click(`.merge-operator .bi-v:nth-child(4) .bi-grid-table-cell:nth-child(${Number(n) + Number(num)}) .bi-popup-view .bi-text:text("${downTable}")`);

});

