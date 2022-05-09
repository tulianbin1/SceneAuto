const helper = require("../helper");
const { expect } = require("chai");
const {  editPopup } = require("../platform/platform_utils");
const { CREATE_TYPE, EDIT } = require("../platform/platform_const");

/*项目的step步骤*/
//点击数据列表、帮助中心、模板中心等功能用这个方法
step('点击<anyTitle>', async (anyTitle) => {
  await helper.page.click(`text=${anyTitle}`);
});

//点击项目名、数据列表等功能用这个方法
//点击项目文件夹/分析表/仪表板
step('选中并点击<targetName>', async (targetName) => {
  await helper.page.click(`.hd-table-folder .bi-text:text("${targetName}")`);
});


step('新建<Name>组件', async (Name) => {
  await helper.page.click(CREATE_TYPE[Name]);
});


step('(<status>)-将第<n>个<elementType><edit>', async (status, n, elementType, edit) => {
  if (status == "只有仪表板" || status == "只有表" || status == "只有分组") {
    selector = await `.hd-table-folder-item:nth-child(${Number(n)})`;
  } else if (status == "通用") {
    if (elementType == "仪表板") {
      selector = await `.hd-table-folder-item:nth-child(${Number(n) + 1})`;
    } else {
      selector = await `.hd-table-folder-item:nth-child(${Number(n) + 3})`;
    }
  }
  await editPopup(selector, edit);
});

step('切换项目下文件排序方式为<sortType>', async (sortType) => {
  await helper.page.click(`.hd-component-table-folder .bi-abs:nth-child(3) .bi-icon-combo-trigger`);
  await helper.page.click(`text=${sortType}`);
});

step('切换视图模式为<viewType>', async (viewType) => {
  await helper.page.click(`.hd-component-table-folder .bi-f-h:nth-child(1) .bi-icon-combo-trigger`);
  await helper.page.click(`text=${viewType}`);
});

step('点击返回主页', async () => {
  await helper.page.click(`.hd-app-label-controller-home-button .bi-icon-label`);
});


step('查看消息中心', async () => {
  await helper.page.click(`.message-center-wrapper`);
});

