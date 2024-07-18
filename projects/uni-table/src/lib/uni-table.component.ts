import {ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {
  BasePaginateEvent,
  BulkSend, Mode,
  TableAction, TableActionType,
  TableColDef,
  TableHeaderActions, TableOperation,
  TableSetting
} from "./uni-table.model";
import {Router} from "@angular/router";
import { isEmpty, sortedUniq } from 'lodash';
import {UniTableService} from "./uni-table.service";

export const COUNTRY_CODES = ['+507'];
export const DATE_TIME_FORMAT = 'd-MMM-yy h:mm a';

export const phoneNumberPattern = {
  inputPrefix: COUNTRY_CODES[0],
  inputMaskPattern: '000-0000',
  inputMaskPattern2: '0000-0000',
  pipePrefix: COUNTRY_CODES[0],
  pipePattern: '000-0000-0000',
};

@Component({
  selector: 'uni-table',
  templateUrl: 'uni-table.component.html',
  styleUrls: ['uni-table.component.css'],
})
export class UniTableComponent {
  @Input() firstName?: string;
  // Inputs
  @Input({ required: true }) tableSettings: TableSetting;
  @Input({ required: true }) listOfData: any[];

  // Outputs
  @Output() bulkActionEvent = new EventEmitter<BulkSend>();
  @Output() headerActionEvent = new EventEmitter<TableHeaderActions>();
  @Output() addNewEvent = new EventEmitter<any>();
  @Output() actionEvent = new EventEmitter<{
    action: TableAction;
    data: any;
    filter?: any;
  }>();
  @Output() paginateServerEvent = new EventEmitter<BasePaginateEvent>();
  @Output() serverSideColumnSearch = new EventEmitter<any>();

  private queryFilter: any;
  setOfCheckedId = new Set<string>();
  sortAscDesc = true;

  isActive = (key: string | number | symbol): boolean => {
    return this.activeKeys[key] ? this.activeKeys[key].active : false;
  };
  isActiveFilter = (): boolean => {
    if (isEmpty(this.activeKeys)) {
      return false;
    }
    const key =
      this.activeKeys &&
      Object.entries(this.activeKeys).find(
        (item: any) => item[1]?.active === true
      );
    return !!key;
  };
  fn = (item: any) => item.checked;
  visible = true;
  activeKeys: any = {};
  tableData: any[];
  activeKey: string | number | symbol;
  searchValue: string | null;
  pageIndex = 1;
  pagesize = 10;
  listOfCurrentPageData: any[] = [];
  checked: boolean;
  modeType: Mode | null = null;
  indeterminate: boolean;
  Mode = Mode;
  notAvailableText: string;
  private initialPageSize: number | null = null;
  private initialPageIndex: number | null = null;
  columnCheckList: any[];
  columnCheckListMaster: any[] = [];
  isVisibleFilter: boolean;
  visibleFilterIndex: number;
  selectedColumnDef: TableColDef;
  checkedAll = true;
  objectOfMode = Mode;
  tableActionType = TableActionType;
  phoneNumberPattern = phoneNumberPattern;
  dateTimeFormat = DATE_TIME_FORMAT;
  condition = true;

  constructor(
    private filter: UniTableService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.queryFilter = history.state?.queryFilter;
    this.notAvailableText = 'Not Available';
    this.pagesize = this.tableSettings.pageSize
      ? this.tableSettings.pageSize
      : 10;
    this.checkPermission();
    if (this.initialPageIndex === null) {
      this.initialPageIndex = this.tableSettings.pageIndex!;
    }

    if (this.initialPageSize === null) {
      this.initialPageSize = this.tableSettings.pageSize!;
    }
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listOfData'].currentValue) {
      this.tableData = changes['listOfData'].currentValue;
      this.setOfCheckedId.clear();
      this.queryFilter && this.redirectFilter();
      history?.state?.filter && this.stateFilter();
    }
  }

  paginate(e: { pageIndex: number; pageSize: number }): void {
    this.pageIndex = e.pageIndex;
    this.pagesize = e.pageSize;
  }

  paginateServer(e: { pageIndex: number; pageSize: number }): void {
    this.paginateServerEvent.emit(e);
  }

  private redirectFilter(): void {
    const key = Object.keys(this.queryFilter)[0] || '';
    const value = Object.values(this.queryFilter)[0] || '';

    const criteria = {
      active: true,
      checklist: [{checked: true, value}],
      reset: false,
      search: '',
    };
    this.tableData = this.filter.stateFilter(this.listOfData, key, criteria.checklist) || [];
    this.activeKeys[key] = {};
    this.activeKeys[key].active = true;
    this.activeKeys[key].checklist = criteria.checklist;
  }

  stateFilter(): void {
    const filter = history?.state?.filter || null;
    const state = history?.state;
    if (state && state?.isClient === true) {
      const pageIndex = state?.pageIndex || 0;
      const pagesize = state?.pageSize || 0;
      if (pageIndex > 0) {
        this.pageIndex = pageIndex;
        this.tableSettings.pageIndex = this.pageIndex;
      }
      if (pagesize > 0) {
        this.pagesize = pagesize;
        this.tableSettings.pageSize = this.pagesize;
      }
      if (!this.listOfData || !filter) {
        return;
      }
      if (this.listOfData?.length < 1) {
        return;
      }
      if (isEmpty(filter)) {
        return;
      }

      const filterData = () => {
        const cloneActiveKeys = { ...filter };
        let data = [];
        let cloneListData = [...this.listOfData];
        Object.keys(cloneActiveKeys).forEach((key, i) => {
          const criteria =
            cloneActiveKeys[key] &&
            cloneActiveKeys[key].checklist &&
            cloneActiveKeys[key].checklist;
          const result = this.filter.excelFilter(cloneListData, key, criteria);
          this.activeKeys[key] = {};
          this.activeKeys[key].active = true;
          this.activeKeys[key].checklist = criteria;
          cloneListData = [...result];
          !!criteria && (data = [...result]);
        });
        this.tableData = sortedUniq(data);
      };
      filterData();
    }
  }

  checklistToggleAll(): void {
    this.columnCheckList = this.columnCheckList.map(item => {
      item.checked = this.checkedAll;
      return item;
    });
  }

  actionButtonClick(action: TableAction, data: any): void {
    sessionStorage.setItem('prv-url', this.router.url);
    const filter = this.getFilter();
    if (
      action.type === TableActionType.DETAILS ||
      action.type === TableActionType.EDIT
    ) {
      if (!action.url) {
        this.actionEvent.emit({ action, data });
        return;
      }
      history.state.filter = this.activeKeys;
      this.router.navigate(
        [action.url, action.mapTo ? data[action.mapTo] : data.id],
        filter
      );
    } else {
      this.actionEvent.emit({ action, data, filter });
    }
  }

  private checkPermission(): void {
    const tableSettings = this.tableSettings;
    const { authorization } = tableSettings;
    if (authorization && authorization.baseUrl) {
      const routeData = {
        url: authorization.baseUrl,
        path: authorization.baseUrl,
      };
      // this.tableSettings = this.auth.getTableActionByPermission(routeData, tableSettings);
    }
  }

  openFilter(event: any, col: TableColDef, index: number): void {
    this.visibleFilterIndex = index;
    if (event === true) {
      this.checkedAll = true;
      this.isVisibleFilter = true;
      this.searchValue = '';
      const data = this.filter.findUniqueColumnItems(this.tableData, col.key as string);
      this.columnCheckList = data;
      this.columnCheckListMaster = data;

      this.activeKey = col.key;
      !this.activeKeys[col.key] &&
      (this.activeKeys[col.key] = {
        search: '',
        active: false,
        reset: false,
      });
    } else {
      this.searchValue = null;
      this.isVisibleFilter = false;
      if (!this.activeKeys[this.activeKey]?.active) {
        delete this.activeKeys[this.activeKey];
      } else {
        this.activeKeys[this.activeKey].reset = false;
      }
    }
  }

  filterChecklist(arg: string, mode?: Mode | null, type?: any): void {
    this.activeKeys[this.activeKey].search = arg;
    if (!type || type === 'number' || type === 'currency') {
      if (!mode) {
        this.columnCheckList = this.columnCheckListMaster.filter(
          (item: any) =>
            item?.value &&
            item.value.toString().toLowerCase().includes(arg.toLowerCase())
        );
        this.activeKeys[this.activeKey].checklist = this.columnCheckList;
      }
      if (mode === Mode.GT) {
        this.columnCheckList = this.columnCheckListMaster.filter(
          (item: any) => item?.value && +item.value >= +arg
        );
        this.activeKeys[this.activeKey].checklist = this.columnCheckList;
      }
      if (mode === Mode.LT) {
        this.columnCheckList = this.columnCheckListMaster.filter(
          (item: any) => item?.value && +item.value <= +arg
        );
        this.activeKeys[this.activeKey].checklist = this.columnCheckList;
      }
      return;
    }
    if (type === 'date') {
      const startDate = new Date(arg[0]!).setHours(0, 0, 0, 0);
      const endDate = new Date(arg[1]!).setHours(24, 0, 0, 0);
      this.columnCheckList = this.columnCheckListMaster.filter((item: any) => {
        if (item?.value) {
          return (
            new Date(item.value).getTime() >= startDate &&
            new Date(item.value).getTime() <= endDate
          );
        }
        return false;
      });
      return;
    }

    this.columnCheckList = this.columnCheckListMaster;
    this.activeKeys[this.activeKey].checklist = [];
  }

  resetFilter(activeKey: string | number | symbol): void {
    this.isVisibleFilter = false;
    this.visible = false;
    this.searchValue = '';

    delete this.activeKeys[activeKey];
    // if activeKeys null or empty
    if (isEmpty(this.activeKeys)) {
      this.resetAllFilter();
      return;
    }

    const cloneActiveKeys = { ...this.activeKeys };

    let hasChecklist = false;
    let data: any[] = [];
    let cloneListData = [...this.listOfData];

    Object.keys(cloneActiveKeys).forEach(key => {
      const criteria =
        cloneActiveKeys[key] &&
        cloneActiveKeys[key].checklist &&
        cloneActiveKeys[key].checklist;
      const result = this.filter.excelFilter(cloneListData, key, criteria);
      cloneListData = [...result];
      !!criteria && (data = [...result]);
      !!criteria && (hasChecklist = true);
    });
    this.tableData = sortedUniq(data);
  }

  search(): void {
    this.isVisibleFilter = false;
    this.visible = false;
    this.columnCheckList = [
      ...this.columnCheckList.filter((rec: any) => rec.checked === true),
    ];
    const cloneColumnCheckList = [...this.columnCheckList];
    this.activeKeys[this.activeKey].active = true;
    this.activeKeys[this.activeKey].checklist = cloneColumnCheckList;

    if (this.modeType === Mode.GT) {
      this.tableData =
        this.filter.excelFilter(
          this.listOfData,
          this.activeKey,
          cloneColumnCheckList.filter((rec: any) => rec.checked === true),
          Mode.GT
        ) || [];
    } else if (this.modeType === Mode.LT) {
      this.tableData =
        this.filter.excelFilter(
          this.listOfData,
          this.activeKey,
          cloneColumnCheckList.filter((rec: any) => rec.checked === true),
          Mode.LT
        ) || [];
    } else {
      this.tableData =
        this.filter.excelFilter(
          this.listOfData,
          this.activeKey,
          cloneColumnCheckList.filter((rec: any) => rec.checked === true)
        ) || [];
    }
  }

  onItemChecked(data: any, checked: boolean): void {
    const key = this.tableSettings?.bulkOperationsKey;
    this.updateCheckedSet(data[key!], checked);
    this.refreshCheckedStatus();
  }

  onRadioModeChange(): void {
    this.searchValue = null;
    this.columnCheckList = [...this.columnCheckListMaster];
  }

  onAllChecked(value: boolean): void {
    const key = this.tableSettings?.bulkOperationsKey;
    this.listOfCurrentPageData
      .filter(({ checkboxDisabled }) => !checkboxDisabled)
      .forEach(item => this.updateCheckedSet(item[key!], value));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(key: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(key);
    } else {
      this.setOfCheckedId.delete(key);
    }
  }

  refreshCheckedStatus(): void {
    const key = this.tableSettings.bulkOperationsKey;
    this.checked = this.listOfCurrentPageData.every(item =>
      this.setOfCheckedId.has(item[key!])
    );
    this.indeterminate =
      this.listOfCurrentPageData.some(item =>
        this.setOfCheckedId.has(item[key!])
      ) && !this.checked;
  }

  onCurrentPageDataChange<T>(event: any): void {
    this.listOfCurrentPageData = event;
    this.refreshCheckedStatus();
  }

  resetAllFilter(): void {
    this.activeKeys = {};
    this.visible = false;
    this.searchValue = '';
    this.activeKey = '';
    this.tableData = this.listOfData;
  }

  addNewButtonClick(): void {
    this.addNewEvent.emit();
  }

  headerActionButtonClick(event: TableHeaderActions): void {
    this.headerActionEvent?.emit(event);
  }

  bulkActionButtonClick(action: TableOperation): void {
    this.bulkActionEvent?.emit({ action, checkedId: this.setOfCheckedId });
  }

  onPageRefresh(): void {
    this.tableSettings.pageIndex = this.initialPageIndex;
    this.tableSettings.pageSize = this.initialPageSize;
    // this.navigationService.toRefreshPage();
  }

  getFilter(): any {
    const filter = {
      state: {
        filter: this.activeKeys,
        pageIndex: this.pageIndex,
        pageSize: this.pagesize,
        url: this.router.url,
        isClient: true,
      },
    };
    return filter;
  }

  onAddNewClick(): void {
    const filter = this.getFilter();
    this.router.navigate([this.tableSettings.addNewButtonUrl], filter);
  }

  trackByFn(index: number) {
    return index;
  }

  resetColumnPaginationFilter(): void {
    this.isVisibleFilter = false;
    this.visible = false;
    this.searchValue = '';

    this.filterColumnPagination();
    return;
  }

  filterColumnPagination(columnValue?: any): void {
    let myObject: any = {}
    if(columnValue){
      myObject[columnValue] =  this.searchValue;
    }
    this.serverSideColumnSearch.emit(myObject);
  }

  sortFnCall(sortAscDesc: boolean, columnName: any): void {
    this.sortAscDesc = !sortAscDesc;
    let myObject: any = {}

    if(columnName){
      myObject['sort'] = encodeURIComponent(`${columnName},${this.sortAscDesc ? 'desc': 'asc'}`)
    }

    this.serverSideColumnSearch.emit(myObject);
  }



}
