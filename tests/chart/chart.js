const helper = require("../helper");
const { ANALYSIS_HEADER, ANALYSIS_STEP, LAYOUT } = require("../analysis/analysis_const");

//todo:图表页面的step步骤

step('从分析表内部切换到图表<chartName>', async (chartName) => {
  await helper.page.click(ANALYSIS_HEADER.图表);
  await helper.page.click(`.analysis-header .bi-text:text("${chartName}")`);
});



