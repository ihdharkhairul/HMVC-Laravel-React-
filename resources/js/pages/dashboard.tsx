import { Head, Link } from '@inertiajs/react';
import { ClipboardList, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import { useSharedProps } from '@/hooks/use-shared-props';
import { dashboard } from '@/routes';
import type { DashboardInvitation } from '@/types';

type Props = {
    pendingInvitations?: DashboardInvitation[];
    totalPendaftar: number;
    totalUsers: number | null;
};

export default function Dashboard({ pendingInvitations = [], totalPendaftar, totalUsers }: Props) {
    const { user, isAdmin } = useSharedProps();
    const [showInvitations, setShowInvitations] = useState(pendingInvitations.length > 0);

    return (
        <>
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="text-xl font-semibold">Selamat datang, {user.name}!</h1>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="size-4" />
                        Anda login sebagai {isAdmin ? 'Admin' : 'User'}.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/pendaftaran"
                        className="rounded-xl border border-sidebar-border/70 p-6 transition hover:bg-accent dark:border-sidebar-border"
                    >
                        <ClipboardList className="size-6 text-muted-foreground" />
                        <p className="mt-4 text-3xl font-bold">{totalPendaftar}</p>
                        <p className="text-sm text-muted-foreground">Jumlah pendaftar</p>
                    </Link>

                    {isAdmin && totalUsers !== null && (
                        <Link
                            href="/admin/users"
                            className="rounded-xl border border-sidebar-border/70 p-6 transition hover:bg-accent dark:border-sidebar-border"
                        >
                            <Users className="size-6 text-muted-foreground" />
                            <p className="mt-4 text-3xl font-bold">{totalUsers}</p>
                            <p className="text-sm text-muted-foreground">Jumlah user</p>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

// Breadcrumb halaman (layout dipasang otomatis oleh app.tsx)
Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});