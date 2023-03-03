import {useAppApi} from "/@/api/app";
import {getHeaderNamespaceId} from "/@/utils/header";

export async function getAppSelectList(): Promise<Object[]> {
  let data = await useAppApi().getList({
    namespaceId: getHeaderNamespaceId(),
    page: 1,
    size: 30,
  });

  let list: Object[] = [];
  data.list.forEach(function (item: Object) {
    // 列表数据
    list.push({
      id: item['id'],
      label: item['name']
    })
  });
  return list;
}
