import {useI18n} from "vue-i18n";
import {useAppApi} from "/@/api/app";
import {getHeaderNamespaceId} from "/@/utils/header";
import {i18n} from "/@/i18n";

export function getChartShortcuts(): Object[] {
  // 定义变量内容
  const {t} = useI18n();
  return [
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
    {
      text: t('message.dateMsg.halfMonth'),
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
        return [start, end]
      },
    },
    {
      text: t('message.dateMsg.oneMonth'),
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      },
    },
  ];
}

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
    size: 1024,
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

export function getInstanceStatusInfo(status: number): Object {
  const {t} = i18n.global;

  switch (status) {
    case 1:
      return {
        tag: '',
        label: t('message.instanceStatus.waiting')
      };
    case 5:
      return {
        tag: '',
        label: t('message.instanceStatus.running')
      };
    case 10:
      return {
        tag: 'success',
        label: t('message.instanceStatus.success')
      };
    case 15:
      return {
        tag: 'danger',
        label: t('message.instanceStatus.fail')
      };
    case 20:
      return {
        tag: 'info',
        label: t('message.instanceStatus.stop')
      };
    case 25:
      return {
        tag: 'warning',
        label: t('message.instanceStatus.cancel')
      };
    default:
      return {
        tag: '',
        label: 'Default',
      };
  }
}

export function getTaskStatusInfo(status: number): Object {
  const {t} = i18n.global;

  switch (status) {
    case 5:
      return {
        tag: 'info',
        label: t('message.taskStatus.init')
      };
    case 10:
      return {
        tag: 'warning',
        label: t('message.taskStatus.failover')
      };
    case 15:
      return {
        tag: '',
        label: t('message.taskStatus.running')
      };
    case 20:
      return {
        tag: 'danger',
        label: t('message.taskStatus.failed')
      };
    case 25:
      return {
        tag: 'success',
        label: t('message.taskStatus.success')
      };
    case 30:
      return {
        tag: 'warning',
        label: t('message.taskStatus.stop')
      };
    default:
      return {
        tag: '',
        label: 'default'
      };
  }
}

export function getTaskStatusSelectList(): Object[] {
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
      label: t('message.taskStatus.failed')
    },
    {
      id: 25,
      label: t('message.taskStatus.success')
    },
    {
      id: 30,
      label: t('message.taskStatus.stop')
    }
  ];
}
