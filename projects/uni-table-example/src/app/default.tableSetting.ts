import {TableSetting} from "./table.model";


export class DefaultTableValue implements TableSetting {
  enabledSerialNo: boolean;
  enabledCheckbox: boolean;
  enabledPagination: boolean;
  enableExport: boolean;
  enableServerExport: boolean;
  serverExportUrl: string | undefined;
  serverExportFileName: string | undefined;
  serverExportTypeAsPath: boolean;
  serverExportParams: any;
  enabledCellClick: boolean;
  enabledColumnFilter: boolean;
  pageSize: number;
  pageIndex: number;
  checkboxCallbackFn: boolean;
  enabledPdfDownload: boolean;
  hideExportOption: boolean;
  enabledExcelDownload: boolean;
  enabledPrint: boolean;
  enabledTotal: boolean;
  totalTitle: string;
  enabledServerSitePagination: boolean;
  columnServerPagination: boolean;
  isShowAddNewButton: boolean;
  addNewButtonText: string;
  addNewButtonUrl: string;
  addNewButtonEvent: boolean;
  hasRowOperation: boolean;
  hasBulkOperation: boolean;
  hasActionButton: boolean;
  isLoading: boolean;
  tableName: string;
  bulkOperationsKey: string;
  hasHeaderActions: boolean;
  horizontalScroll: boolean;
  enableRefreshPage: boolean;
  hideColumnDropdownButton: boolean;
  disableScrollY: boolean;

  constructor(tableSetting: TableSetting) {
    if (tableSetting) {
      const {
        enabledSerialNo,
        enabledCheckbox,
        enabledPagination,
        enableExport,
        enableServerExport,
        serverExportUrl,
        serverExportFileName,
        serverExportTypeAsPath,
        serverExportParams,
        enabledCellClick,
        enabledColumnFilter,
        pageSize,
        pageIndex,
        checkboxCallbackFn,
        enabledPdfDownload,
        enabledExcelDownload,
        hideExportOption,
        enabledPrint,
        enabledTotal,
        totalTitle,
        enabledServerSitePagination,
        columnServerPagination,
        addNewButtonText,
        hasRowOperation,
        hasBulkOperation,
        bulkOperationsKey,
        hasActionButton,
        isLoading,
        tableName,
        addNewButtonUrl,
        isShowAddNewButton,
        hasHeaderActions,
        addNewButtonEvent,
        horizontalScroll,
        authorization,
        enableRefreshPage,
        hideColumnDropdownButton,
        disableScrollY,
      } = tableSetting;

      this.enabledSerialNo = enabledSerialNo || false;
      this.enabledCheckbox = enabledCheckbox === false ? enabledCheckbox : true;
      this.enabledPagination =
        enabledPagination === false ? enabledPagination : true;
      this.enableExport = enableExport === false ? enableExport : true;
      this.enableServerExport =
        enableServerExport === true ? enableServerExport : false;
      this.serverExportUrl = serverExportUrl || undefined;
      this.serverExportFileName = serverExportFileName || undefined;
      this.serverExportTypeAsPath = serverExportTypeAsPath || false;
      this.serverExportParams = serverExportParams || null;
      this.enabledPdfDownload = this.enabledCellClick =
        enabledCellClick || false;
      this.enabledColumnFilter = enabledColumnFilter || false;
      this.pageSize = pageSize || 10;
      this.pageIndex = pageIndex || 1;
      this.checkboxCallbackFn = checkboxCallbackFn || false;
      this.enabledPdfDownload =
        enabledPdfDownload === false ? enabledPdfDownload : true;
      this.enabledExcelDownload = enabledExcelDownload || false;
      this.hideExportOption = hideExportOption ? true : false;
      this.enabledPrint = enabledPrint || false;
      this.enabledTotal = enabledTotal || false;
      this.totalTitle = totalTitle || 'Total';
      this.enabledServerSitePagination = enabledServerSitePagination || false;
      this.columnServerPagination = columnServerPagination || false;
      this.isShowAddNewButton =
        isShowAddNewButton === false ? isShowAddNewButton : true;
      this.addNewButtonText = addNewButtonText || 'Add New';
      this.addNewButtonUrl = addNewButtonUrl || '';
      this.addNewButtonEvent = addNewButtonEvent || false;
      this.hasRowOperation = hasRowOperation || false;
      this.hasBulkOperation = hasBulkOperation || false;
      this.bulkOperationsKey = bulkOperationsKey || 'id';
      this.hasActionButton = hasActionButton || false;
      this.isLoading = isLoading === false ? isLoading : true;
      this.tableName = tableName || '';
      this.hasHeaderActions = hasHeaderActions || false;
      this.horizontalScroll = horizontalScroll || true;
      this.enableRefreshPage = enableRefreshPage || false;
      this.hideColumnDropdownButton = hideColumnDropdownButton || false;
      this.disableScrollY = disableScrollY || false;
    }
  }
}
