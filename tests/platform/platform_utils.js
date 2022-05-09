const helper = require("../helper");
const { CREATE_TYPE, EDIT } = require("../platform/platform_const");
const { selectorsNum,childrenNum } = require("../utils");

//(只有仪表板/只有分组/只有表/既有仪表板又有分析表)-为第（n）个（组件:仪表板、表）(操作)
async function editPopup(selector,edit) {
    helper.page.hover(selector) ;
    helper.page.click(`${selector} .bi-down-list-combo i`) ;
    await helper.page.click(`${selector} ${EDIT[edit]}`);
}


//挑选企业对应的团队
async function chooseTeam(selector,corp,team) {
    const num = await childrenNum(selector);
    if (Number(num) == 1) {
        await helper.page.click(`${selector} .bi-button-group .bi-text:text("${team}")`);
    }
    else {
      for (var i = 1; i <= Number(num); i++) {
        const content = await helper.page.$(`${selector}:nth-child(${i}) .bi-text:text("${corp}")`)
        if (content!=null) {
            await helper.page.click(`${selector}:nth-child(${i}) .bi-button-group .bi-text:text("${team}")`);
        }
      }
    }
  }

module.exports = {

    editPopup,
    chooseTeam,
}
  