import {useI18n} from "vue-i18n";
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

export function getInstanceSelectList(): Object[] {
  const {t} = useI18n();

  return [
    {
      id: 1,
      label: t('message.instanceStatus.waiting')
    },
    {
      id: 5,
      label: t('message.instanceStatus.running')
    },
    {
      id: 10,
      label: t('message.instanceStatus.success')
    },
    {
      id: 15,
      label: t('message.instanceStatus.fail')
    },
    {
      id: 20,
      label: t('message.instanceStatus.stop')
    },
    {
      id: 25,
      label: t('message.instanceStatus.cancel')
    }
  ];
}
