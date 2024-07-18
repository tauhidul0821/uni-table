import { ThemeType } from '@ant-design/icons-angular';
export enum PageSize {
  Small = 5,
  Default = 10,
  Medium = 20,
  Large = 30,
  ExtraLarge = 40,
}


export interface ListOfColumnTable {
  name: string;
  width?: string;
  previewName: string;
}

export interface TableAuthorization {
  baseUrl: string;
}

export interface BasePaginateEvent {
  pageIndex: number;
  pageSize: number;
}

export interface TableSetting {
  tableName: string;
  isHideScrollX?: boolean;
  tableSubTitle?: string;
  isHideTableHeader?: boolean;
  enabledSerialNo?: boolean | false;
  tableColDef?: TableColDef[];
  enabledCheckbox?: boolean | true;
  enabledPagination?: boolean | true;
  enableExport?: boolean | true;
  enableServerExport?: boolean | false;
  serverExportUrl?: string;
  serverExportFileName?: string;
  serverExportTypeAsPath?: boolean | false;
  serverExportParams?: any;
  enabledCellClick?: boolean | false;
  enabledColumnFilter?: boolean | false;
  pageSize: PageSize;
  pageIndex?: number;
  totalData?: number;
  checkboxCallbackFn?: boolean | false;
  enabledPdfDownload?: boolean | false;
  enabledExcelDownload?: boolean | false;
  hideExportOption?: boolean | false;
  enabledPrint?: boolean | false;
  enabledTotal?: boolean | false;
  totalTitle?: string | 'Total';
  enabledServerSitePagination?: boolean | false;
  columnServerPagination?: boolean | false;
  addNewButtonText?: string;
  addNewButtonUrl?: string;
  isShowAddNewButton?: boolean;
  hasActionButton?: boolean;
  tableActions?: TableAction[];
  hasRowOperation?: boolean | false;
  hasBulkOperation?: boolean;
  bulkOperations?: TableOperation[];
  bulkOperationsKey?: string;
  rowOperations?: TableOperation[];
  isLoading?: boolean;
  hasHeaderActions?: boolean;
  headerActions?: TableHeaderActions[];
  addNewButtonEvent?: boolean;
  horizontalScroll?: boolean;
  authorization?: TableAuthorization;
  enableRefreshPage?: boolean;
  hideColumnDropdownButton?: boolean;
  disableScrollY?: boolean;
}

export interface TableHeaderActions {
  name: string;
  amount?: number;
  symbol?: string;
  cheekName?: string;
  isCheeked?: boolean;
  unCheekName?: string;
  styleClass?: string;
  type: 'amount' | 'switchBox' | 'button';
  permissionType: PermissionType;
}

export interface TableOperation {
  name: string;
  type: string;
  mode?: 'hidden' | 'disable';
  icon?: string;
  styleClass?: string;
}

export interface BulkSend {
  action: TableOperation;
  checkedId: Set<string>;
}

export interface TableAction {
  title: string;
  iconType: string;
  iconTheme: ThemeType;
  type: TableActionType;
  url?: string;
  mapTo?: string;
  active?: boolean;
  truthValue?: any;
  falseValue?: any;
}

export enum TableActionType {
  TOGGLE = 'TOGGLE',
  DETAILS = 'DETAILS',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  LOCK = 'LOCK',
  RELEASE = 'RELEASE',
  SEND = 'SEND',
  REJECT = 'REJECT',
  DEMERIT_DETAILS = 'DEMERIT_DETAILS',
  OTHERS = 'OTHERS',
}

export interface TableColDef<T = any> {
  title: string | '';
  titleSymbol?: string | 'TTD';
  key: keyof T;
  className?: string;
  dataClassName?: string;
  sort: boolean | false;
  filter: boolean;
  isFilter?: boolean;
  isShowNull?: boolean;
  type?:
    | 'string'
    | 'number'
    | 'date'
    | 'currency'
    | 'phone'
    | 'iconText'
    | 'image';
  dateFormat?: string;
  dateFormatType?: 'local' | 'UTC';
  okBtnTxt?: string | 'Apply';
  cancelBtnTxt?: string | 'Cancel';
  visible: boolean | true;
  alwaysVisible?: boolean | false;
  innerBtnIcon?: string | '';
  sortFn?: any;
  width?: any;
  isTitleCase?: boolean;
  isDecimal?: boolean;
  sortKey?: string;
}

export type PermissionType = 'EDIT' | 'DELETE' | 'VIEW' | 'CREATE';

interface HeaderBaseActions {
  name: string;
  key: string | number;
  styleClass?: number;
  permissionType: PermissionType;
}
export interface HeaderButtonType extends HeaderBaseActions {
  type: 'button';
}

export type HeaderActions = HeaderButtonType;

export enum Mode {
  GT = 'GT',
  LT = 'LT',
}
