import {Component, OnInit} from '@angular/core';
import {PageSize, TableAction, TableActionType, TableSetting} from "./table.model";
import {DefaultTableValue} from "./default.tableSetting";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'uni-table-example';
  tableSettings: TableSetting = new DefaultTableValue({
    hasActionButton: true,
    tableName: 'antennas',
    addNewButtonText:"commonVariables.addNewAntenna",
    isShowAddNewButton: true,
    addNewButtonUrl: `/add`,
    enabledPagination: false,
    hasHeaderActions: true,
    enabledServerSitePagination: false,
    enableRefreshPage: false,
    pageIndex: 1,
    pageSize: PageSize.Default,
    totalData: 0,
  });



  TableColDef = [
    {
      title: 'commonVariables.code',
      key: 'antennaCode',
      sort: true,
      filter: true,
      visible: true,
      isFilter: false,
      alwaysVisible: true,
      sortFn: (a: any, b: any) =>
        a && b && a.antennaCode.localeCompare(b.antennaCode),
    },
    {
      title: 'commonVariables.description',
      key: 'antennaDescription',
      sort: true,
      filter: true,
      visible: true,
      isFilter: false,
      alwaysVisible: false,
      sortFn: (a: any, b: any) =>
        a && b && a.antennaDescription.localeCompare(b.antennaDescription),
    },
    {
      title: 'breadcrumb.controlBox',
      key: 'controlBoxDescription',
      sort: true,
      filter: true,
      visible: true,
      isFilter: false,
      alwaysVisible: false,
      sortFn: (a: any, b: any) =>
        a && b && a.controlBoxDescription.localeCompare(b.controlBoxDescription),
    },
    {
      title: 'commonVariables.dispenserNumber',
      key: 'dispenserNumber',
      sort: true,
      filter: true,
      visible: true,
      isFilter: false,
      alwaysVisible: false,
    },
    {
      title: 'commonVariables.status',
      key: 'status',
      sort: false,
      filter: true,
      isFilter: true,
      visible: true,
    },
  ];

  TableActions: TableAction[] = [
    {
      title: 'commonVariables.details',
      iconType: 'aim',
      iconTheme: 'outline',
      type: TableActionType.DETAILS,
    },
    {
      title: 'Lock',
      iconType: 'lock',
      iconTheme: 'outline',
      type: TableActionType.LOCK,
      mapTo: 'active',
    },
    {
      title: 'commonVariables.edit',
      iconType: 'edit',
      iconTheme: 'outline',
      type: TableActionType.EDIT,
    },
    {
      title: 'commonVariables.delete',
      iconType: 'delete',
      iconTheme: 'outline',
      type: TableActionType.DELETE,
    },
  ];



  data = [];

  constructor() {
    this.tableSettings.tableColDef = this.TableColDef;
    this.tableSettings.tableActions = this.TableActions;
  }

  actionEvent({ action, data }: any) {
    switch (action.type) {
      case TableActionType.DETAILS:
        break;
      case TableActionType.EDIT:
        break;
    }
  }

  ngOnInit(): void{
    this.data =  [
      {
        id: "11da47b4-f363-4849-adbb-6aa8fb3ff8e6",
        antennaCode: "UNIP1S2-002-003",
        antennaDescription: "Dispenser 3 of UNI_TEST_2",
        controlBox: {
          id: "67c1ad45-132f-4051-adf6-7985b38074ea",
          code: "UNIP1S2-002",
          description: "Control Box of UNI_SITE_2",
          merchantId: "bb73523b-a7b3-4af9-9123-81e622e4d4a8",
          siteShortInfo: {
            id: "777a1b84-367b-4a51-8197-7b572ab7be56",
            code: "UNIP1S2",
            fullName: "UNI_SITE_2",
            merchantName: "UNIPET - Paul",
            merchantId: "bb73523b-a7b3-4af9-9123-81e622e4d4a8",
            country: "Panamá"
          },
          ip: "1.1.1.1",
          port: "80",
          terminalCode: "46ZCHGF2N96Q",
          active: true
        },
        dispenserNumber: 3,
        active: true,
        siteShortInfo: {
          id: "777a1b84-367b-4a51-8197-7b572ab7be56",
          code: "UNIP1S2",
          fullName: "UNI_SITE_2",
          merchantName: "UNIPET - Paul",
          merchantId: "bb73523b-a7b3-4af9-9123-81e622e4d4a8",
          country: "Panamá"
        },
        controlBoxDescription: "Control Box of UNI_SITE_2",
        status: "Active"
      },
      {
        id: "766391ac-782d-429f-b723-905fcac01508",
        antennaCode: "UNIP1S2-002-002",
        antennaDescription: "Dispenser 3 of UNI TEST",
        controlBox: {
          id: "67c1ad45-132f-4051-adf6-7985b38074ea",
          code: "UNIP1S2-002",
          description: "Control Box of UNI_SITE_2",
          merchantId: "bb73523b-a7b3-4af9-9123-81e622e4d4a8",
          siteShortInfo: {
            id: "777a1b84-367b-4a51-8197-7b572ab7be56",
            code: "UNIP1S2",
            fullName: "UNI_SITE_2",
            merchantName: "UNIPET - Paul",
            merchantId: "bb73523b-a7b3-4af9-9123-81e622e4d4a8",
            country: "Panamá"
          },
          ip: "1.1.1.1",
          port: "80",
          terminalCode: "46ZCHGF2N96Q",
          active: true
        },
        dispenserNumber: 33,
        active: true,
        siteShortInfo: {
          id: "777a1b84-367b-4a51-8197-7b572ab7be56",
          code: "UNIP1S2",
          fullName: "UNI_SITE_2",
          merchantName: "UNIPET - Paul",
          merchantId: "bb73523b-a7b3-4af9-9123-81e622e4d4a8",
          country: "Panamá"
        },
        controlBoxDescription: "Control Box of UNI_SITE_2",
        status: "Active"
      }
    ]
    this.tableSettings.isLoading = false;
  }
}
