import { AdminShell } from '@/components/admin/admin-gate';
import { AdminManager } from '@/components/admin/admin-manager';

export default function Page() {
  return <AdminShell title="Admin Overview"><AdminManager mode="overview" /></AdminShell>;
}
