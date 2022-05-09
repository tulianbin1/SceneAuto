const helper = require("../helper");
const { selectorsNum, chooseFields, saveButton } = require("../utils");

const EDIT_BUTTON = {
  "更新Excel": `.bi-abs:nth-child(1) .hd-components-simple-button:nth-child(2)`,
  "编辑": `.bi-abs:nth-child(1) .hd-components-simple-button:nth-child(2)`,
  "导出": `.bi-abs:nth-child(1) .hd-components-simple-button:nth-child(1)`,
  "展示数据": ".hd-components-preview-structure .bi-icon-change-button:nth-child(1)",
  "展示表头": ".hd-components-preview-structure .bi-icon-change-button:nth-child(2)",
  "添加图表": `.add-widget-button`,
  "数据预览": `.bi-text:text("数据预览")`,
  "图表展示": `.bi-text:text("图表展示")`,
  "血缘视图": `.bi-text:text("血缘视图")`,
}

const ANALYSIS_HEADER = {
  "图表": `.analysis-header .bi-text:text("图表")`,
  "添加图表": `.analysis-header .bi-text:text("添加图表")`,
  "分析详情": `.analysis-header .bi-f-v-c .hd-components-simple-button:nth-child(2)`,
  "导出": `.analysis-header .bi-f-v-c .hd-components-simple-button:nth-child(3)`,
  "更多": `.analysis-header .bi-f-v-c .bi-popper:nth-child(4)`,
  "创建副本": `.analysis-header .bi-text:text("创建副本")`,
  "自动监控": `.analysis-header .bi-text:text("自动监控")`,
  "保存": `.analysis-header .hd-conf-analysis-save`,

  "分类汇总": `.analysis-header .hd-components-simple-button:nth-child(1)`,
  "新增字段": `.analysis-header .bi-popper:nth-child(2)`,
  "更多步骤": `.analysis-header .bi-down-list-combo`,
}
const ANALYSIS_STEP = {
  "分类汇总": `.bi-text:text("分类汇总")`,
  "新增字段": `.bi-text:text("新增字段")`,
  "新增字段-公式/函数": `.bi-text:text("公式/函数")`,
  "新增字段-分类赋值": `.bi-text:text("分类赋值")`,
  "新增字段-累积值": `.bi-text:text("累积值")`,
  "新增字段-排名": `.bi-text:text("排名")`,
  "筛选": `.bi-text:text("筛选")`,
  "排序": `.bi-text:text("排序")`,
  "合并表": `.bi-text:text("合并表")`,
  "左右合并": `.bi-text:text("左右合并")`,
  "上下合并": `.bi-text:text("上下合并")`,
  "字段类型转换": `.bi-text:text("字段类型转换")`,
  "字段重命名": `.bi-text:text("字段重命名")`,
  "重新选字段": `.bi-text:text("重新选字段")`,
  "更多": `.bi-down-list-group .bi-text:text("更多")`,
  "行转列": `.bi-text:text("行转列")`,
  "列转行": `.bi-text:text("列转行")`,
  "删除重复字段": `.bi-text:text("删除重复字段")`,
  "分析表": `.bi-text:text("分析表")`,
}

const LAYOUT = {
  "标题栏左侧": `.hd-conf-analysis-quick-operator`,
  "右侧栏": `.process-history-step`,
}

const SATISFYTYPE = {
  "任一条件": `.bi-single-select-item:nth-child(1)`,
  "全部条件": `.bi-single-select-item:nth-child(2)`,
}

const DROP_LIST_COMBO = {
  "分类": `.hd-conf-analysis-group-dimension`,
  "汇总": `.hd-conf-analysis-group-dimension`,
  "图表": `.hd-conf-data-viewer-editor-combo`,
  "预览区域字段": `.hd-conf-analysis:nth-child(6) .bi-grid-table-cell`
}

const SORT = {
  "升序排列": `bi-single-select-radio-item:nth-child(1)`,
  "降序排列": `bi-single-select-radio-item:nth-child(2)`,
}

const SORT_SELECTOR = {
  "排序1": `.hd-conf-analysis-sort-field-block`,
  "排序n": `.hd-conf-analysis-sort-field-label`,
}
module.exports = {
  ANALYSIS_HEADER,
  ANALYSIS_STEP,
  LAYOUT,
  DROP_LIST_COMBO,
  EDIT_BUTTON,
  SORT,
  SORT_SELECTOR,
  SATISFYTYPE,
};
