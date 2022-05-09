const helper = require("../helper");
const { chooseTeam } = require("../platform/platform_utils");
const { FILE_OWNER, TEAM_SETTING } = require("../platform/platform_const");
const { waitForSelectorLoad, saveButton1, toHasClass, toExcludeClass,blur } = require("../utils");
const { ISSAVE_LIST } = require("../const");

step('创建企业<corpName>并<isSave>', async (corpName, isSave) => {
  await helper.page.click(`.hd-user`);
  await helper.page.click(`.bi-button-group:nth-child(3)`);
  await helper.page.fill(`.bi-popup-view:nth-last-child(1) .hd-components-async-check-editor .bi-input`, corpName);
  //这里必须加下延迟，确定按钮始终存在，page.waitForSelector不太可，不加偶现保存不成功
  await helper.page.waitForTimeout(500);
  await saveButton1(isSave)
});

step('编辑企业名称<corpName>并<isSave>', async (corpName, isSave) => {
  await helper.page.click(`.hd-user`);
  await helper.page.click(`.bi-popper .bi-button-group:nth-child(2) .bi-button-group:nth-child(2)`);
  await helper.page.click(`.corp-content .bi-basic-button i`);
  await helper.page.waitForSelector(`.bi-popup-view:nth-last-child(1) .hd-components-async-check-editor`);
  await helper.page.fill(`.bi-popup-view:nth-last-child(1) .hd-components-async-check-editor .bi-input`, corpName);
  await helper.page.waitForTimeout(500);
  await saveButton1(isSave)
});



step('点击切换企业<corp>团队<team>', async (corp, team) => {
  await helper.page.click(`.hd-corp-group-combo .bi-popper:nth-child(1) .bi-icon-button`);
  await chooseTeam(`.hd-corp-group-combo .bi-popup-view .bi-v .bi-v .bi-border-bottom`, corp, team);
});

step('创建团队<teamName>并<isSave>', async (teamName, isSave) => {
  await helper.page.click(`.hd-corp-group-combo .bi-popper:nth-child(1) .bi-icon-button`);
  await helper.page.click(`.hd-corp-group-combo .bi-popup-view .bi-abs:nth-child(2) .bi-basic-button`);
  await helper.page.fill(`.bi-popup-view:nth-last-child(1) .hd-components-async-check-editor .bi-input`, teamName);
  await saveButton1(isSave)
});

step('选择文件范围为<fileOwner>', async (fileOwner) => {
  await helper.page.click(`.hd-component-table-folder-file-filter .bi-icon-label`);
  const arr1 = Object.keys(FILE_OWNER);
  const owner = fileOwner.split(',');
  for (var n = 0; n < arr1.length; n++) {
    for (var i = 0; i < owner.length; i++) {
      if (owner[i] == arr1[n]) {
        await toHasClass(FILE_OWNER[arr1[n]], `active`);
        break;
      } else {
        await toExcludeClass(FILE_OWNER[arr1[n]], `active`);
      }
    }
  }
  // await chooseOwner(fileOwner);
});
// async function chooseOwner(fileOwner) {
//   await Promise.all(Object.keys(FILE_OWNER).map(async owner => {
//     await helper.page.waitForSelector(`.hd-component-table-folder-file-filter .bi-popup-view`);
//     const isSelected = await helper.page.evaluate((selector) => document.querySelector(selector).classList.contains('active'), FILE_OWNER[owner]);
//     const hasOwner = fileOwner.indexOf(owner) != -1;
//     if (hasOwner != isSelected) {
//       await helper.page.click(FILE_OWNER[owner]);
//     }   
//   })
//   )
//  }


step('设置团队名称为<teamName>并<isSave>', async (teamName, isSave) => {
  await helper.page.click(`.hd-corp-group-combo .bi-f-c:nth-child(2) .bi-icon-button`);
  await helper.page.click(TEAM_SETTING.设置);
  await helper.page.fill(`.bi-popup-view:nth-last-child(1) .hd-components-async-check-editor .bi-input`, teamName);
  await saveButton1(isSave)

});

