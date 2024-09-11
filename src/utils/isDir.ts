import type { BMTreeNode } from '@/types/tree'

export default function isDir(item: BMTreeNode): boolean {
  return !!item?.children
}
