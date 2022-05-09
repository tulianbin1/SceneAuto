const helper = require("../helper");
const { DASHBOARD_TOOLBAR } = require("../dashboard/dashboard_const");


step('点击仪表板标题栏<toolbar>', async (toolbar) => {
  await helper.page.click(DASHBOARD_TOOLBAR[toolbar]);
});

step("主页：点击编辑仪表板", async () => {
  await helper.page.click(`.hd-body-datalist-preview-route:nth-child(4) .bi-text:text("编辑")`);
});