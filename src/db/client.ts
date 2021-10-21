const TableStore = require('tablestore');
import Config from './config';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '../../typings/global';

const client = new TableStore.Client({
  accessKeyId: Config.accessKeyId,
  accessKeySecret: Config.accessKeySecret,
  endpoint: Config.endpoint,
  instancename: Config.instancename,
  maxRetries: 20,
});

const obj2arr = obj => {
  // 转换数据成对象数组
  const data = [];
  for (const key in obj) {
    data.push({ [key]: obj[key] });
  }
  return data;
};

/**
 * @name 分页获取列表
 * @param tableName
 * @param indexName
 * @param options
 * @returns
 */
export const getList = (
  tableName: string,
  indexName: string,
  options: { offset: number; limit: number } = {
    limit: 10,
    offset: 0,
  }
) => {
  return new Promise((resolve, reject) => {
    client.search(
      {
        tableName,
        indexName,
        searchQuery: {
          offset: options.offset,
          limit: options.limit,
          query: {
            queryType: TableStore.QueryType.MATCH_ALL_QUERY,
          },
          getTotalCount: true, //结果中的TotalCount表示数据的总行数，默认为false，表示不返回数据的总行数。
        },
        columnToGet: {
          //返回列设置RETURN_SPECIFIED表示自定义返回列，RETURN_ALL表示返回所有列，RETURN_NONE表示不返回。
          returnType: TableStore.ColumnReturnType.RETURN_ALL,
        },
      },
      (err, data: Page) => {
        if (err) {
          console.log('error:', err);
          reject(err);
        }
        // 处理返回数据
        resolve({
          totalCounts: data.totalCounts,
          data: data.rows.map(r => {
            const res = {};
            const { primaryKey, attributes } = r;
            // 将主键并入到结果
            primaryKey.forEach(p => {
              res[p.name] = p.value;
            });
            attributes.forEach(a => {
              res[a.columnName] = a.columnValue;
            });
            return res;
          }),
        });
      }
    );
  });
};

/**
 * @name 删除一行数据
 * @param tableName
 * @param primaryKey
 * @returns
 */
export const deleteRow = (tableName: string, primaryKey: string) => {
  return new Promise((resolve, reject) => {
    client.deleteRow(
      {
        tableName,
        condition: new TableStore.Condition(
          TableStore.RowExistenceExpectation.IGNORE,
          null
        ),
        primaryKey: [{ id: primaryKey }],
      },
      (err, data) => {
        if (err) {
          console.log('error:', err);
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

/**
 * @name 修改一行数据
 * @param tableName
 * @param primaryKey
 * @param data
 * @returns
 */
export const updateRow = <T = Record<string, unknown>>(
  tableName: string,
  primaryKey: string,
  data: T
) => {
  const _data = obj2arr(data);
  return new Promise((resolve, reject) => {
    client.updateRow(
      {
        tableName,
        primaryKey: [{ id: primaryKey }],
        condition: new TableStore.Condition(
          TableStore.RowExistenceExpectation.IGNORE,
          null
        ),
        updateOfAttributeColumns: [{ PUT: _data }],
      },
      (err, data) => {
        if (err) {
          console.log('error:', err);
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

/**
 * @name 添加一行数据
 * @param tableName
 * @param attributeColumns
 * @param options
 * @returns
 */
export const putRow = <T = Record<string, unknown>>(
  tableName: string,
  attributeColumns: T,
  options: {
    condition: unknown;
    primaryKey?: Record<string, unknown>[];
  } = {
    condition: new TableStore.Condition(
      TableStore.RowExistenceExpectation.IGNORE,
      null
    ),
    primaryKey: [{ id: uuidv4() }],
  }
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    // 转换数据成对象数组
    const data = obj2arr(attributeColumns);
    client.putRow(
      {
        tableName,
        attributeColumns: data,
        ...options,
      },
      (err, data) => {
        if (err) {
          console.log('error:', err);
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

export default client;
