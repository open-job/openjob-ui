
export const USER_APIS = {
    login: '/admin/login',
    logout: '/admin/logout',
    userInfo: '/admin/user-info', // current login user info
    // crud
    create: '/admin/users/add',
    detail: '/admin/users/get',
    update: '/admin/users/update',
    delete: '/admin/users/delete',
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

export const SERVER_APIS = {
  serverList: '/admin/server/list-server',
  slotsList: '/admin/server/list-job-slots',
  workerList: '/admin/worker/list',
  systemInfo: '/admin/system/config',
  systemUpdate: '/admin/system/update',
}
