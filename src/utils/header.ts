import {Local} from "/@/utils/storage";

export function getHeaderNamespaceId(): number {
  return Local.get("nid");
}
