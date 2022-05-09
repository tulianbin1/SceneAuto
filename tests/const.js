const helper = require("./helper");
const DRAGTYPE = {
    "图表": `.hd-dashboard-design-container`,
    "筛选器": `.hd-dashboard-design-container`,
    "文本组件": `.hd-dashboard-design-container`,
    "图表字段": `.hd-conf-data-viewer-fields`,
    "字段": `.hd-conf-analysis-group-operator`,
}

const AREAS = {
    "行维度": ".bi-border-right .bi-border-bottom .bi-button-group:nth-child(3) .bi-v:nth-child(1) .hd-conf-data-viewer-regions-item",
    "列维度": ".bi-border-right .bi-border-bottom .bi-button-group:nth-child(3) .bi-v:nth-child(2) .hd-conf-data-viewer-regions-item",
    "交叉表指标": ".bi-border-right .bi-border-bottom .bi-button-group:nth-child(3) .bi-v:nth-child(3) .hd-conf-data-viewer-regions-item",
    "数据": ".hd-conf-data-viewer-regions-item",
    "维度": ".bi-border-right .bi-border-bottom .bi-button-group:nth-child(3) .bi-v:nth-child(1) .hd-conf-data-viewer-regions-item",
    "指标": ".bi-border-right .bi-border-bottom .bi-button-group:nth-child(3) .bi-v:nth-child(2) .hd-conf-data-viewer-regions-item",
    "左值轴": ".bi-border-right .bi-border-bottom .bi-button-group:nth-child(3) .bi-v:nth-child(2) .hd-conf-data-viewer-regions-item",
    "右值轴": ".bi-border-right .bi-border-bottom .bi-button-group:nth-child(3) .bi-v:nth-child(3) .hd-conf-data-viewer-regions-item",
    "指标卡指标": ".hd-conf-data-viewer-regions-item",

    "分类": ".hd-conf-analysis-group-region:nth-child(1) .group-region-container",
    "汇总": ".hd-conf-analysis-group-region:nth-child(3) .group-region-container",

    "仪表板": `.hd-dashboard-design-container .hd-dashboard-fit-layout .bi-interactive-arrangement`,
}

const ISSAVE_LIST = {
    "确定": `.bi-popup-view:nth-last-child(1) .hd-components-simple-button:nth-child(2)`,
    "取消": `.bi-popup-view:nth-last-child(1) .hd-components-simple-button:nth-child(1)`,
    "关闭": `.bi-header-background .bi-message-close`,
    "清空按钮": `.center-element:nth-child(1) .bi-basic-button`,
    "确定按钮": `.center-element:nth-child(2) .bi-basic-button`,
    "保存": `.hd-components-simple-button:nth-child(2)`,
    "不保存": `.hd-components-simple-button:nth-child(1)`,
}


const PUBLIC_FORM = {
    "字段弹框": `.bi-popover`,
    "主页列表": `.hd-table-folder`,
    "公式弹框": `.hd-components-formula-popup`,
}
module.exports = {

    DRAGTYPE,
    AREAS,
    ISSAVE_LIST,
    PUBLIC_FORM,

}
