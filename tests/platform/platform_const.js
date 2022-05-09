const helper = require("../helper");
const CREATE_TYPE = {
    "项目文件夹": ".hd-component-table-folder .bi-abs .bi-abs .bi-bubble-combo",
    "分析表": ".f-scroll-x .hd-components-hint-button",
    "仪表板": ".add-dashboard",
}

const EDIT = {
    "编辑": `.bi-down-list-popup .bi-down-list-group .edit-font`,
    "预览": `.bi-down-list-popup .bi-down-list-group .preview-font`,
    "创建副本": `.bi-down-list-popup .bi-down-list-group .hd-components-save-as-combo`,
    "重命名": `.bi-down-list-popup .bi-down-list-group .rename-font`,
    "移动至": `.bi-down-list-popup .bi-down-list-group .move-font`,
    "分享": `.bi-down-list-popup .bi-down-list-group .share-font`,
    "删除": `.bi-down-list-popup .bi-down-list-group .delete-font`,
    "更新Excel": `.bi-down-list-popup .bi-down-list-group .update-font`,
    "导出": `.bi-down-list-popup .bi-down-list-group .export-font`,
    "分组": `.bi-down-list-popup .bi-down-list-group .hd-component-table-folder-group-combo`,
    "添加分组": `.bi-down-list-popup .bi-down-list-group .bi-text:text("添加分组")`,
}

const FILE_OWNER = {
    "创建者": `.bi-multi-select-item:nth-child(1) .bi-checkbox`,
    "自己": `.bi-multi-select-item:nth-child(2) .bi-checkbox`,
    "其他成员": `.bi-multi-select-item:nth-child(3) .bi-checkbox`,
}

const TEAM_SETTING = {
    "成员": `.hd-corp-group-combo .bi-single-select-icon-text-item:nth-child(1)`,
    "设置": `.hd-corp-group-combo .bi-single-select-icon-text-item:nth-child(2)`,

}

module.exports = {

    CREATE_TYPE,
    EDIT,
    FILE_OWNER,
    TEAM_SETTING,
}
