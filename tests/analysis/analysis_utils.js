const helper = require("../helper");
const { chooseFields, saveButton, saveButton1, selectorsNum } = require("../utils");
const { AREAS,ISSAVE_LIST } = require("../const");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT, DROP_LIST_COMBO, EDIT_BUTTON } = require("../analysis/analysis_const");
const A = require('../utils');

async function tableSelect(selector, TableName) {
  // await helper.page.click(`.bi-popover .hd-component-table-folder-path .bi-text:text("${projectName}")`);
  await helper.page.fill(`${selector} .bi-search-editor .bi-editor .bi-abs .bi-input`, TableName);
  await helper.page.click(`.bi-keyword-red-mark`);
  // await helper.page.waitForTimeout(2000);
  await helper.page.waitForLoadState();
}

async function dataChange(selector, TableName, FieldsName, edit, unionType, isSave) {
  await helper.page.click(selector);

  switch (edit) {
    //上下+左右合并
    case "切换表并选择字段":
      if (unionType == "左右合并") {
        await helper.page.click(`${selector} .bi-text:text("切换")`);
      } else if (unionType == "上下合并") {
        await helper.page.click(`${selector} .bi-text:text("选择字段")`);
      }
      await tableSelect(`.bi-popup-view`, TableName);
      await chooseFields(FieldsName);
      await saveButton1(isSave);
      break;
    //上下合并
    case "选择表":
      await tableSelect(`.bi-popup-view`, TableName);
      await saveButton1(isSave);
      break;
    //上下+左右合并
    case "不切换表选择字段":
      if (unionType == "左右合并") {
        await helper.page.click(`${selector} .bi-text:text("切换")`);
      } else if (unionType == "上下合并") {
        await helper.page.click(`${selector} .bi-text:text("选择字段")`);
      }
      await chooseFields(FieldsName);
      await saveButton1(isSave);
      break;
    //上下+左右合并
    case "编辑":
      await helper.page.click(`${selector} .bi-text:text("编辑")`);
      break;
    //上下合并
    case "删除":
      await helper.page.click(`${selector} .bi-text:text("删除")`);
      break;
  }
}


//展开字段下拉框：分类汇总字段、图表字段、分析表预览区域的字段
async function hasComboField(area, n) {
  if (area == "分类" || area == "汇总") {
    const field = `${AREAS[area]} ${DROP_LIST_COMBO[area]}:nth-child(${n})`;
    return field;
  } else if (area == "预览区域字段") {
    const field = `${DROP_LIST_COMBO[area]}:nth-child(${n})`;
    return field;
  }
  else {
    const field = `${AREAS[area]} ${DROP_LIST_COMBO.图表}:nth-child(${n})`;
    return field;
  }

}

async function fieldDropCombo(area, n) {
  const field1 = await hasComboField(area, n);
  const DropCombo = `${field1} .bi-down-list-combo`;
  await helper.page.click(DropCombo);
}

//挑选并执行各种表编辑操作
async function chooseTableEdit(selector, name, previewButton, edit,num) {
  if (Number(num) == 1) {
    await editList(selector, 1, previewButton, edit);
  }
  else {
    for (var i = 1; i <= Number(num); i++) {
      const content = await helper.page.$(`${selector}:nth-child(${i}) .bi-text:text("${name}")`)
      if (content != null) {
        await editList(selector, i, previewButton, edit);
      }
    }
  }
}

async function editList(selector, i, previewButton, edit) {
  switch (edit) {
    case "点击":
      if (i == 1) {
        await helper.page.click(`${selector} ${EDIT_BUTTON[previewButton]}`);
      } else {
        await helper.page.click(`${selector}:nth-child(${i}) ${EDIT_BUTTON[previewButton]}`);
      }
      break;
    case "搜索":
      if (i == 1) {
        await helper.page.fill(`${selector} .bi-input`, previewButton);
      } else {
        await helper.page.fill(`${selector}:nth-child(${i}) .bi-input`, previewButton);
      }
      break;
  }

}


//修改合并依据
async function resizeUnionField(result, leftTable, rightTable, n) {
  const content = `.hd-conf-analysis-join-item:nth-child(${n})`;
  await helper.page.fill(`${content} .first-row:nth-child(1) .bi-input`, result);
  await helper.page.click(`${content} .first-row:nth-child(2)`);
  await helper.page.click(`${content} .first-row:nth-child(2) .bi-text:text("${leftTable}")`);
  await helper.page.click(`${content} .first-row:nth-child(3)`);
  await helper.page.click(`${content} .first-row:nth-child(3) .bi-text:text("${rightTable}")`);
}

//选择筛选方案:改时间、选择字段、输入文本内容
async function chooseConditionType(fieldType, belong, condition, content, isSave) {
  if (belong == "为空" || belong == "非空") {
    return;
  }
  else if (belong == "属于" || belong == "不属于") {
    if (fieldType == "文本") {
      await conditionType("下拉框选择", condition, content, isSave);
    }
  }
  else if (belong == "等于" || belong == "不等于") {
    if (fieldType == "数值") {
      await conditionType("文本输入", condition, content, isSave);
    }
  }
  else if (belong == "介于" || belong == "不介于") {
    await conditionType("数值区间选择", condition, content, isSave);
  }
  //其他输入文本
  else {
    await conditionType("文本输入", condition, content, isSave);
  }
}
async function conditionType(type, condition, content, isSave) {
  switch (type) {
    case "下拉框选择":
      await helper.page.click(`${content} .bi-multi-select-searcher`);
      await helper.page.fill(`${content} .bi-textarea`, condition);
      await helper.page.waitForSelector(`${content} .bi-loader`);
      await helper.page.click(`${content} .bi-multi-select-bar`);
      await helper.page.click(`${content} ${ISSAVE_LIST[isSave]}`);
      break;
    case "数值区间选择":
      //eg:25 (小于) 值 (小于等于) 30
      const arr1 = condition.split(' ');
      await helper.page.click(`${content} .first-element .bi-number-interval-single-editor`);
      await helper.page.fill(`${content} .first-element .bi-number-interval-single-editor .bi-input`, arr1[0]);
      await helper.page.keyboard.press("Enter");

      await helper.page.click(`${content} .first-element .bi-icon-combo`);
      await helper.page.click(`${content} .first-element .bi-icon-combo .bi-text:text("${arr1[1]}")`);
      
      await helper.page.click(`${content} .last-element .bi-icon-combo`);
      await helper.page.click(`${content} .last-element .bi-icon-combo .bi-text:text("${arr1[3]}")`);

      await helper.page.click(`${content} .last-element .bi-number-interval-single-editor`);
      await helper.page.fill(`${content} .last-element .bi-number-interval-single-editor .bi-input`, arr1[4]);
      await helper.page.keyboard.press("Enter");
      break;
    case "文本输入":
      await helper.page.click(`${content} .bi-sign-editor`);
      await helper.page.fill(`${content} .bi-input`, condition);
      await helper.page.keyboard.press("Enter");
      break;
  }
}

//修改筛选内容
async function resizeFilter(content, fieldName, belong) {
  // const content = `.filter-item:nth-child(${n})`;
  await helper.page.click(`${content} .hd-conf-analysis-filter-field-combo`);
  await tableSelect(`${content}`, fieldName);
  await helper.page.click(`${content} .bi-text-value-down-list-combo`);
  await helper.page.click(`${content} .bi-down-list-popup .bi-text:text("${belong}")`);
}



module.exports = {
  fieldDropCombo,
  hasComboField,
  chooseTableEdit,
  tableSelect,
  dataChange,
  editList,
  resizeUnionField,
  resizeFilter,
  chooseConditionType,
};
