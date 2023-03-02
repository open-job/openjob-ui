/**
 * views personal
 */
type NewInfo = {
  title: string;
  date: string;
  link: string;
};
type Recommend = {
  title: string;
  msg: string;
  icon: string;
  bg: string;
  iconColor: string;
};
declare type PersonalState = {
  newsInfoList: NewInfo[];
  recommendList: Recommend[];
  personalForm: {
    name: string;
    email: string;
    autograph: string;
    occupation: string;
    phone: string;
    sex: string;
  };
};

/**
 * views visualizing
 */
declare type Demo2State<T = any> = {
  time: {
    txt: string;
    fun: number;
  };
  dropdownList: T[];
  dropdownActive: string;
  skyList: T[];
  dBtnList: T[];
  chartData4Index: number;
  dBtnActive: number;
  earth3DBtnList: T[];
  chartData4List: T[];
  myCharts: T[];
};

/**
 * views params
 */
declare type ParamsState = {
  value: string;
  tagsViewName: string;
  tagsViewNameIsI18n: boolean;
};

/**
 * views system
 */
// role
declare interface RowRoleType {
  roleName: string;
  roleSign: string;
  describe: string;
  sort: number;
  status: boolean;
  createTime: string;
}

interface SysRoleTableType extends TableType {
  data: RowRoleType[];
}

declare interface SysRoleState {
  tableData: SysRoleTableType;
}

declare interface RowNamespaceType {
  id: number;
  name: string;
  uniqueId: string;
  status: boolean;
  createTime: string;
}

interface NamespaceTableType extends TableType {
  data: RowNamespaceType[];
}

declare interface NamespaceState {
  tableData: NamespaceTableType;
}

declare interface RowAppType {
  id: number;
  namespaceId: number;
  namespaceName: string;
  name: string;
  desc: string;
  status: boolean;
  createTime: string;
}

interface AppTableType extends TableType {
  data: RowAppType[];
}

declare interface AppState {
  tableData: AppTableType;
}

declare interface RowJobType {
  id: number;
  namespaceId: number;
  appId: number;
  appName: string;
  workflowId: number;
  name: string;
  description: string;
  processorType: string;
  processorInfo: string;
  executeType: string;
  paramsType: string;
  params: string;
  extendParamsType: string;
  extendParams: string;
  timeExpressionType: string;
  timeExpression: string;
  executeStrategy: number;
  failRetryTimes: number;
  failRetryInterval: number;
  concurrency: number;
  status: boolean;
  createTime: string;
}

interface JobTableType extends TableType {
  data: RowJobType[];
}

declare interface JobState {
  tableData: JobTableType;
}

/**
 * Job instance
 */
declare interface RowJobInstanceType {
  id: number;
  workflowId: number
  namespaceId: number;
  appId: number;
  jobId: number;
  processorType: string;
  processorInfo: string;
  executeType: string;
  paramsType: string;
  params: string;
  extendParamsType: string;
  extendParams: string;
  timeExpressionType: string;
  timeExpression: string;
  executeStrategy: number;
  failRetryTimes: number;
  failRetryInterval: number;
  concurrency: number;
  status: number;
  executeTime: string;
  completeTime: string;
  lastReportTime: string;
  workerAddress: string;
  createTime: string;
}

interface InstanceTableType extends TableType {
  data: RowJobInstanceType[];
}

declare interface JobInstanceState {
  tableData: InstanceTableType;
}

/**
 * Delay
 */
declare interface RowDelayType {
  id: number;
  namespaceId: number;
  appId: number;

  appName: string;
  name: string;
  description: string;
  processorInfo: string;
  topic: string;
  failRetryTimes: number;
  failRetryInterval: number;
  concurrency: number;
  blockingSize: number;
  executeTimeout: number,
  status: boolean;
  createTime: string;
}

interface DelayTableType extends TableType {
  data: RowDelayType[];
}

declare interface DelayState {
  tableData: DelayTableType;
}


/**
 * Delay instance
 */
declare interface RowDelayInstanceType {
  id: number;
  namespaceId: number;
  appId: number;
  appName: string;
  delayId: number;
  taskId: string;
  topic: string;
  delayParams: string;
  delayExtra: string;
  status: number;
  executeTime: string
  createTime: string;
}

interface DelayInstanceTableType extends TableType {
  data: RowDelayInstanceType[];
}

declare interface DelayInstanceState {
  tableData: DelayInstanceTableType;
}


/**
 * Namespace menu
 */
declare interface NamespaceMenuState {
  current: string
  list: RowNamespaceType[]
}

declare interface RowServerSlotsType {
  id: number;
  serverId: number;

  serverAddress: string;

  serverStatus: boolean;
  createTime: string;
  updateTime: string;
}

interface ServerSlotsTableType extends TableType {
  data: RowServerSlotsType[];
}

declare interface ServerSlotsState {
  tableData: ServerSlotsTableType;
}

declare interface RowServerNodeType {
  id: number;
  ip: string;
  akkaAddress: string;
  status: boolean;
  createTime: string;
  updateTime: string;
}

interface ServerNodeTableType extends TableType {
  data: RowServerNodeType[];
}

declare interface ServerNodeState {
  tableData: ServerNodeTableType;
}

declare interface RowWorkerNodeType {
  appName: string;
  address: string;
  protocolType: string;
  version: string;
  status: boolean;
  lastHeartbeatTime: string;
  createTime: string;
}

interface ServerWorkerTableType extends TableType {
  data: RowWorkerNodeType[];
}

declare interface ServerWorkerState {
  tableData: ServerWorkerTableType;
}

declare type TreeType = {
  id: number;
  label: string;
  children?: TreeType[];
};

// user
declare type RowUserType<T = any> = {
  userName: string;
  userNickname: string;
  roleSign: string;
  department: string[];
  phone: string;
  email: string;
  sex: string;
  password: string;
  overdueTime: T;
  status: boolean;
  describe: string;
  createTime: T;
};

interface SysUserTableType extends TableType {
  data: RowUserType[];
}

declare interface SysUserState {
  tableData: SysUserTableType;
}

declare type DeptTreeType = {
  deptName: string;
  createTime: string;
  status: boolean;
  sort: number;
  describe: string;
  id: number | string;
  children?: DeptTreeType[];
};

// dept
declare interface RowDeptType extends DeptTreeType {
  deptLevel: string[];
  person: string;
  phone: string;
  email: string;
}

interface SysDeptTableType extends TableType {
  data: DeptTreeType[];
}

declare interface SysDeptState {
  tableData: SysDeptTableType;
}

// dic
type ListType = {
  id: number;
  label: string;
  value: string;
};

declare interface RowDicType {
  dicName: string;
  fieldName: string;
  describe: string;
  status: boolean;
  createTime: string;
  list: ListType[];
}

interface SysDicTableType extends TableType {
  data: RowDicType[];
}

declare interface SysDicState {
  tableData: SysDicTableType;
}

/**
 * views pages
 */
//  filtering
declare type FilteringChilType = {
  id: number | string;
  label: string;
  active: boolean;
};

declare type FilterListType = {
  img: string;
  title: string;
  evaluate: string;
  collection: string;
  price: string;
  monSales: string;
  id: number | string;
  loading?: boolean;
};

declare type FilteringRowType = {
  title: string;
  isMore: boolean;
  isShowMore: boolean;
  id: number | string;
  children: FilteringChilType[];
};

// tableRules
declare type TableRulesHeaderType = {
  prop: string;
  width: string | number;
  label: string;
  isRequired?: boolean;
  isTooltip?: boolean;
  type: string;
};

declare type TableRulesState = {
  tableData: {
    data: EmptyObjectType[];
    header: TableRulesHeaderType[];
    option: SelectOptionType[];
  };
};

declare type TableRulesOneProps = {
  name: string;
  email: string;
  autograph: string;
  occupation: string;
};

// tree
declare type RowTreeType = {
  id: number;
  label: string;
  label1: string;
  label2: string;
  isShow: boolean;
  children?: RowTreeType[];
};

// workflow index
declare type NodeListState = {
  id: string | number;
  nodeId: string | undefined;
  class: HTMLElement | string;
  left: number | string;
  top: number | string;
  icon: string;
  name: string;
};

declare type LineListState = {
  sourceId: string;
  targetId: string;
  label: string;
};

declare type XyState = {
  x: string | number;
  y: string | number;
};

declare type WorkflowState<T = any> = {
  leftNavList: T[];
  dropdownNode: XyState;
  dropdownLine: XyState;
  isShow: boolean;
  jsPlumb: T;
  jsPlumbNodeIndex: null | number;
  jsplumbDefaults: T;
  jsplumbMakeSource: T;
  jsplumbMakeTarget: T;
  jsplumbConnect: T;
  jsplumbData: {
    nodeList: NodeListState[];
    lineList: LineListState[];
  };
};

// workflow drawer
declare type WorkflowDrawerNodeState<T = any> = {
  node: { [key: string]: T };
  nodeRules: T;
  form: T;
  tabsActive: string;
  loading: {
    extend: boolean;
  };
};

declare type WorkflowDrawerLabelType = {
  type: string;
  label: string;
};

declare type WorkflowDrawerState<T = any> = {
  isOpen: boolean;
  nodeData: {
    type: string;
  };
  jsplumbConn: T;
};

/**
 * views make
 */
// tableDemo
declare type TableDemoPageType = {
  pageNum: number;
  pageSize: number;
};

declare type TableHeaderType = {
  key: string;
  width: string;
  title: string;
  type: string | number;
  colWidth: string;
  width?: string | number;
  height?: string | number;
  isCheck: boolean;
};

declare type TableSearchType = {
  label: string;
  prop: string;
  placeholder: string;
  required: boolean;
  type: string;
  options?: SelectOptionType[];
};

declare type TableDemoState = {
  tableData: {
    data: EmptyObjectType[];
    header: TableHeaderType[];
    config: {
      total: number;
      loading: boolean;
      isBorder: boolean;
      isSelection: boolean;
      isSerialNo: boolean;
      isOperate: boolean;
      isOpView: boolean,
      isOpUpdate: boolean
      isOpDelete: boolean
      isOpMore: boolean
    };
    search: TableSearchType[];
    param: EmptyObjectType;
  };
};
