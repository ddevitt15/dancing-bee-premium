import { AdminShell } from '@/components/admin/admin-gate';
import { AdminManager } from '@/components/admin/admin-manager';

export default function Page() {
  return <AdminShell title="Products"><AdminManager mode="products" /></AdminShell>;
}
