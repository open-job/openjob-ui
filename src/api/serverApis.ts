
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
}
