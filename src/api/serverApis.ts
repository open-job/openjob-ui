
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

export const JOB_APIS = {

}

export const NAMESPACE_APIS = {
  // list
  list: '/admin/namespace/list',
  add: '/admin/namespace/add',
  update: '/admin/namespace/update',
  updateStatus: '/admin/namespace/update-status',
}
