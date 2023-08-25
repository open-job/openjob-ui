export const HOME_APIS = {
  taskData: '/admin/home/task-data',
  systemData: '/admin/home/system-data',
  jobChart: '/admin/home/job-chart',
  delayChart: '/admin/home/delay-chart',
}

export const USER_APIS = {
  login: '/admin/user/login',
  logout: '/admin/user/logout',
  userInfo: '/admin/user/user-info',
  updatePassword: '/admin/user/update-password',

  // crud
  create: '/admin/user/add',
  detail: '/admin/user/get',
  update: '/admin/user/update',
  delete: '/admin/user/delete',
}

export const MENU_APIS = {
  // userMenus: '/admin/user-info',
  userMenus: '/admin/perms/menus', // current login user menus
}

export const PERM_APIS = {
  // userMenus: '/admin/menus/current',
}

export const JOB_APIS = {
  // list
  list: '/admin/job/list',
  add: '/admin/job/add',
  update: '/admin/job/update',
  updateStatus: '/admin/job/update-status',
  delete: '/admin/job/delete',
  execute: '/admin/job/execute',
  timeExpression: '/admin/job/time-expression',
}

export const JOB_INSTANCE_APIS = {
  // list
  list: '/admin/job-instance/list',
  stop: '/admin/job-instance/stop',
  delete: '/admin/job-instance/delete',
  listProcessorLog: '/admin/job-instance/list-processor-log',
}

export const JOB_INSTANCE_TASK_APIS = {
  // list
  listTask: '/admin/instance-task/list',
  listChild: '/admin/instance-task/list-child',
  stopTask: '/admin/instance-task/stop-task',
  listTaskLog: '/admin/instance-task/list-task-log',
}

export const DELAY_APIS = {
  // list
  list: '/admin/delay/list',
  add: '/admin/delay/add',
  update: '/admin/delay/update',
  updateStatus: '/admin/delay/update-status',
  delete: '/admin/delay/delete',
}

export const DELAY_INSTANCE_APIS = {
  // list
  list: '/admin/delay-instance/list',
  delete: '/admin/delay-instance/delete',
  stop: '/admin/delay-instance/stop',
  listProcessorLog: '/admin/delay-instance/list-processor-log',
}

export const NAMESPACE_APIS = {
  // list
  list: '/admin/namespace/list',
  add: '/admin/namespace/add',
  update: '/admin/namespace/update',
  updateStatus: '/admin/namespace/update-status',
  delete: '/admin/namespace/delete',
}

export const APP_APIS = {
  add: '/admin/app/add',
  update: '/admin/app/update',
  updateStatus: '/admin/app/update-status',
  delete: '/admin/app/delete',
  list: '/admin/app/list',
}

export const ALERT_RULE_APIS = {
  add: '/admin/alert-rule/add',
  update: '/admin/alert-rule/update',
  updateStatus: '/admin/alert-rule/update-status',
  delete: '/admin/alert-rule/delete',
  list: '/admin/alert-rule/list',
}

export const SERVER_APIS = {
  serverList: '/admin/server/list-server',
  slotsList: '/admin/server/list-job-slots',
  workerList: '/admin/worker/list',
  systemInfo: '/admin/system/config',
  systemUpdate: '/admin/system/update',
}
