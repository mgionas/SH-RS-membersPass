import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { BrushCleaning, EllipsisIcon, LinkIcon } from 'lucide-react';
import { view } from '@/routes/members'
import { CreateMemberComponent } from '@/pages/admin/members/_components/createMemberComponent';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '',
    },
    {
        title: 'Members',
        href: '',
    },
];

export default function Dashboard({entries}:{entries:any}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className={'flex py-2 px-4 w-full justify-between'}>
                <div>

                </div>
                <div>

                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 px-4">
                {entries ? (
                    <div className={'flex flex-col w-full text-sm'}>
                        {/* Header */}
                        <div className={'p-6 rounded-sm font-bold grid grid-cols-4 even:bg-neutral-100 even:dark:bg-neutral-900'}>
                            <span>Member</span>
                            <span>Device</span>
                            <span>Date</span>
                        </div>
                        {/* Data */}
                        {entries.map((entry, i) => (
                            <Link href={view.url(entry.member_id)} key={i} className={'items-center p-4 rounded-sm grid grid-cols-4 border border-gray-50/0 even:bg-neutral-50 transition-all even:dark:bg-neutral-900 hover:border-blue-500'}>
                                <span>{entry.member.name} {entry.member.surname}</span>
                                <span>{entry.device_id}</span>
                                <span>{entry.created_at}</span>
                                <div className={'flex w-full gap-2 justify-end'}>
                                    <span>{entry.access}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ): (
                    <div className={'flex flex-col gap-4 items-center justify-center py-24 bg-neutral-100 rounded-lg text-neutral-500 dark:bg-neutral-900'}>
                        <div className={'border border-neutral-500 p-4 rounded-3xl'}>
                            <BrushCleaning strokeWidth={1} size={24} />
                        </div>
                        <span className={'text-sm'}>Empty</span>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
