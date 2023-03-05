import {useI18n} from "vue-i18n";
import {useAppApi} from "/@/api/app";
import {getHeaderNamespaceId} from "/@/utils/header";

export function getShortcuts(): Object[] {
  // 定义变量内容
  const {t} = useI18n();

  return [
    {
      text: t('message.dateMsg.oneMinute'),
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 60 * 1000)
        return [start, end]
      },
    },
    {
      text: t('message.dateMsg.fiveMinute'),
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 60 * 1000 * 5)
        return [start, end]
      },
    },
    {
      text: t('message.dateMsg.fifteenMinute'),
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 60 * 1000 * 15)
        return [start, end]
      },
    },
    {
      text: t('message.dateMsg.oneHours'),
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000)
        return [start, end]
      },
    },
    {
      text: t('message.dateMsg.today'),
      value: () => {
        const end = new Date()
        const start = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0)
        return [start, end]
      },
    },
    {
      text: t('message.dateMsg.oneDay'),
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24)
        return [start, end]
      },
    },
    {
      text: t('message.dateMsg.oneWeek'),
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      },
    },
  ];
}

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

export function getTaskStatusSelectList():Object[]{
  const {t} = useI18n();

  return [
    {
      id: 5,
      label: t('message.taskStatus.init')
    },
    {
      id: 10,
      label: t('message.taskStatus.failover')
    },
    {
      id: 15,
      label: t('message.taskStatus.running')
    },
    {
      id: 20,
      label: t('message.taskStatus.success')
    },
    {
      id: 25,
      label: t('message.taskStatus.failed')
    }
  ];
}
