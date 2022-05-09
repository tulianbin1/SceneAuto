const helper = require("../helper");
const { chooseFields, saveButton, arrList, waitForSelectorLoad,saveButton1,selectorsNum } = require("../utils");
const {  fieldDropCombo, hasComboField, tableSelect, dataChange,resizeUnionField,resizeFilter,chooseConditionType } = require("./analysis_utils");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT,  SORT,SORT_SELECTOR,SATISFYTYPE } = require("./analysis_const");


/*历史步骤：筛选和新增字段-》相似点较多(公式框方法共用)，放一起 */

//11、筛选
step('设置筛选满足<satisfyType>', async (satisfyType) => {
  await helper.page.click(`.bi-select-text-trigger`);
  await helper.page.click(SATISFYTYPE[satisfyType]);
});

step('添加筛选条件', async () => {
  await helper.page.click(`.hd-conf-analysis-filter-container .hd-components-simple-button`);
});
//普通条件
step('设置筛选<n>为普通条件,<fieldType><fieldName><belong><condition>并点击<isSave>', async (n,fieldType,fieldName,belong,condition,isSave) => {
  const content = `.filter-item:nth-child(${n})`;
  await helper.page.click(`${content} .bi-icon-change-button`);
  await helper.page.click(`${content} .bi-button-group .bi-text:text("普通条件")`);
  await resizeFilter(content,fieldName,belong);
  await chooseConditionType(fieldType, belong, condition, content, isSave);
});

//时间类型：仅 属于/不属于/等于/不等于/某个日期之前/某个日期之后 -》弹出时间控件-单独写，其他使用上面的step
step('设置筛选<n>为普通条件,时间类型<fieldName><belong><condition>并点击<isSave>', async (n,fieldName,belong,condition,isSave) => {
  const content = `.filter-item:nth-child(${n})`;
  await helper.page.click(`${content} .bi-icon-change-button`);
  await helper.page.click(`${content} .bi-button-group .bi-text:text("普通条件")`);
  await resizeFilter(content,fieldName,belong);
  if(belong == "属于" || belong == "不属于"){
    //时间范围-2，等仪表板的时间控件一起写
    return;
  }else{
    //时间-1，等仪表板的时间控件一起写
    return;
  }

});
//公式条件
step('设置筛选<n>为公式条件', async (n) => {
  const content = `.filter-item:nth-child(${n})`;
  //切换公式条件
  await helper.page.click(`${content} .bi-icon-change-button`);
  await helper.page.click(`${content} .bi-button-group .bi-text:text("公式条件")`);
  //进入公式弹框
  await helper.page.click(`${content} .hd-conf-analysis-filter-empty-formula-item .bi-text-button`);
  
});
step('展开函数框', async () => {
  await helper.page.waitForSelector(`.hd-components-formula-popup`);
  await helper.page.click(`.bi-components-formula-text-func-button`);
});
step('删除第<n>个筛选条件', async (n) => {
  await helper.page.click(`.filter-item:nth-child(${n}) .delete-button`);
});

//12、新增字段
//公式
step('新增字段类型<fieldType>字段名<fieldName>', async (fieldType,fieldName) => {
  await helper.page.fill(`.hd-conf-analysis-add-column-operator-popup .bi-text-editor .bi-input`, fieldName);
  await helper.page.click(`.bi-formula-symbol-group .bi-icon-combo-trigger`);
  await helper.page.click(`.bi-formula-symbol-group .bi-popup-view .bi-button-group .bi-text:text("${fieldType}")`);
});

//下面这处step有bug!codeMirror内不能输入，需要重写
step('公式输入<content>', async (content) => {
  // await helper.page.fill(`.bi-formula-editor .CodeMirror`, content);
  // await helper.page.waitForFunction(selector => !!document.querySelectorAll(selector).CodeMirror.setValue(content), `div.CodeMirror.cm-s-default`);
  helper.page.waitForFunction(selector => document.querySelectorAll(selector).CodeMirror.replace(content), `div.CodeMirror.cm-s-default.CodeMirror-wrap`);
});
step('添加公式<formulaFunction>', async (formulaFunction) => {
  await helper.page.fill(`.bi-formula-function-pane .bi-search-editor .bi-editor .bi-input`, formulaFunction);
  await helper.page.click(`.bi-keyword-red-mark:text("${formulaFunction}")`); 
});
step('添加公式字段<formulaField>', async (formulaField) => {
  await helper.page.fill(`.bi-formula-field-pane .bi-search-editor .bi-editor .bi-input`, formulaField);
  await helper.page.click(`.bi-keyword-red-mark:text("${formulaField}")`); 
});
step('添加公式符号<formulaSign>', async (formulaSign) => {
  switch (formulaSign) {
    case "+":
        await helper.page.click(`.operator-plus-font i`)
        break;
    case "-":
        await helper.page.click(`.operator-minus-font i`)
        break;
    case "*":
        await helper.page.click(`.operator-multi-font i`)
        break;
    case "/":
        await helper.page.click(`.operator-divide-font i`)
        break;
    case "(":
        await helper.page.click(`.operator-left-brackets-font i`)
        break;
    case ")":
        await helper.page.click(`.operator-right-brackets-font i`)
        break;
}
});

//分类赋值
step('新增字段名为<fieldName>', async (fieldName) => {
  await helper.page.fill(`.hd-conf-analysis-add-column-operator-popup .bi-text-editor .bi-input`, fieldName);
  await helper.page.keyboard.press("Enter");
});
step('设置赋值依据为<category>', async (category) => {
  await helper.page.click(`.bi-select-text-trigger`);
  await helper.page.click(`.bi-text-icon-popup .bi-button-group .bi-text:text("${category}")`);
});
//这里不太对,有个控件明明元素唯一，怎么也点击不了，需要修改
step('点击添加分类', async () => {
  await helper.page.click(`.hd-components-custom-group-string .bi-f-v-c .hd-components-simple-button:nth-last-child(2) .bi-f-h .bi-label`);
});
step('修改第<n>个为分类名<category>', async (n,category) => {
  await helper.page.waitForSelector(`.hd-component-custom-group-string-group-expander:nth-child(${n})`);
  await helper.page.fill(`.hd-component-custom-group-string-group-expander:nth-child(${n}) .bi-editor .bi-input`, category);
  await helper.page.keyboard.press("Enter");
});
step('删除第<n>个分类并<isSave>', async (n) => {
  const content = `.hd-component-custom-group-string-group-expander:nth-child(${n})`;
  await helper.page.click(`${content} .delete-button`);
  await saveButton(content, isSave);
});
step('将字段<field>移动至分类<category>', async (field,category) => {
  const arr1 = field.split(',');
  for (var n = 0; n < arr1.length; n++) {
    await helper.page.fill(`.hd-components-custom-group-string .bi-search-editor .bi-editor .bi-input`, arr1[n]);
    await helper.page.keyboard.press("Enter");
    await helper.page.click(`.bi-multi-select-bar`);
    await helper.page.click(`.hd-components-custom-group-string-move .bi-basic-button`);
    await helper.page.click(`.hd-components-custom-group-string-move .bi-button-group:nth-child(2) .bi-text:text("${category}")`);
  }
});
step('未分类的值分到<category>', async (category) => {
  await helper.page.click(`.hd-components-custom-group-string .bi-f-v-c:nth-child(4) .bi-checkbox`);
  await helper.page.fill(`.hd-components-custom-group-string .bi-f-v-c:nth-child(4) .bi-editor .bi-input`, category);
  await helper.page.keyboard.press("Enter");
});


//累积值&排名
async function accumulateValue(n,value) {
  await helper.page.click(`.hd-components-label-combo:nth-child(${n}) .bi-popper`);
  await helper.page.waitForSelector(`.hd-components-label-combo:nth-child(${n}) .bi-button-group`);
  await helper.page.click(`.hd-components-label-combo:nth-child(${n}) .bi-button-group .bi-text:text("${value}")`);
}
step('设置计算字段为<fields>,设置计算方式为<groupBy>', async (fields,groupBy) => {
  await accumulateValue(1,fields);
  await accumulateValue(2,groupBy);
});
step('设置计算范围为全部值', async () => {
  await accumulateValue(3,"全部值");
});
step('设置计算范围<type>，选择分类为<values>并点击<isSave>', async (type,values,isSave) => {
  await accumulateValue(3,type);
  const arr1 = values.split(',');
  for (var n = 0; n < arr1.length; n++) {
    await helper.page.click(`.bi-all-value-multi-text-value-combo .bi-popper`);
    await helper.page.waitForSelector(`.bi-all-value-multi-text-value-combo .bi-multi-select-loader`);
    await helper.page.click(`.bi-all-value-multi-text-value-combo .bi-multi-select-loader .bi-text:text("${arr1[n]}")`);
  }
  await saveButton1(isSave);
});

//条件赋值-等等的！迭代还在验收中