import { Injectable } from '@angular/core';
import { filter, orderBy } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class UniTableService {

  type: 'cnt' | 'eq' | 'gt' | 'lt' | 'rng' | 'drng' | undefined;
  constructor() {}

  tableFilter(tableData: any[], criteria: any): any[] {
    if (tableData && Array.isArray(tableData) && criteria) {
      return [];
    }
    return filter(tableData, item => {
      const arr = [];
      const keys = Object.keys(criteria).filter(itm => criteria[itm]);
      keys.forEach(c => {
        if (criteria[c] && Array.isArray(criteria[c])) {
          const fromDate = new Date(criteria[c][0]).toLocaleDateString();
          const toDate = new Date(criteria[c][1]).toLocaleDateString();
          const value = new Date(item[c]).toLocaleDateString();
          value >= fromDate && value <= toDate && arr.push(true);
        }
        if (
          criteria[c] &&
          !Array.isArray(criteria[c]) &&
          `${item[c]}`.toLowerCase().includes(`${criteria[c]}`.toLowerCase())
        ) {
          arr.push(true);
        }
      });
      return arr.length === keys.length;
    });
  }

  findUniqueColumnItems(tableData: any[], findKey: string): any[] {
    const ascData = orderBy(
      tableData,
      [
        user =>
          isNaN(user[findKey]) ? user[findKey]?.toLowerCase() : user[findKey],
      ],
      ['asc']
    );

    const uniqueItemsMap: { [key: string]: any } = {};
    const uniqueItems: any[] = [];

    for (const item of ascData) {
      const key = item[findKey];
      if (!(key in uniqueItemsMap)) {
        uniqueItemsMap[key] = true;
        uniqueItems.push({ checked: true, value: key });
      }
    }

    return uniqueItems;
  }

  excelFilter(
    masterObject: any[],
    findKey: any,
    criteria: any[],
    relation?: string
  ): any[] {
    let filteredData: string | any[] = [];
    if (relation) {
      if (relation === 'GT') {
        criteria &&
        criteria.forEach((x, i) => {
          const filterMasterData =
            masterObject.filter(
              (record: any) =>
                !filteredData.includes(record) &&
                record['' + findKey + ''] > criteria[i].value
            ) || [];
          filteredData = [...filteredData, ...filterMasterData];
        });
        return filteredData;
      }
      if (relation === 'LT') {
        criteria &&
        criteria.forEach((x, i) => {
          const filterMasterData =
            masterObject.filter(
              (record: any) =>
                !filteredData.includes(record) &&
                record['' + findKey + ''] < criteria[i].value
            ) || [];
          filteredData = [...filteredData, ...filterMasterData];
        });
        return filteredData;
      }
    } else {
      criteria &&
      criteria.forEach((x, i) => {
        const filterMasterData =
          masterObject.filter(
            (record: any) =>
              !filteredData.includes(record) &&
              record['' + findKey + ''] === criteria[i].value
          ) || [];
        filteredData = [...filteredData, ...filterMasterData];
      });
    }
    return filteredData;
  }

  stateFilter(masterJson: any[], findKey: any, criteria: any[]): any[] {
    let filteredData: string | any[] = [];
    criteria &&
    criteria.forEach((x, i) => {
      const filterMasterData =
        masterJson.filter(
          (record: any) =>
            !filteredData.includes(record) &&
            record[findKey]
              ?.toString()
              .toLowerCase()
              .includes(criteria[i]?.value.toString().toLowerCase())
        ) || [];
      filteredData = [...filteredData, ...filterMasterData];
    });
    return filteredData;
  }
}
