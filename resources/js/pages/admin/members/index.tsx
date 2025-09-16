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

export default function Dashboard({members}:{members:any}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className={'flex py-2 px-4 w-full justify-between'}>
                <div>

                </div>
                <div>
                    <CreateMemberComponent />
                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 px-4">
                {members ? (
                    <div className={'flex flex-col w-full text-sm'}>
                        {/* Header */}
                        <div className={'p-6 rounded-sm font-bold grid grid-cols-6 even:bg-neutral even:dark:bg-neutral-900'}>
                            <span>Name</span>
                            <span>Email</span>
                            <span>Phone</span>
                            <span>Lang</span>
                            <span>Status</span>
                        </div>
                        {/* Data */}
                        {members.map((member, i) => (
                            <Link href={view.url(member.member_id)} key={i} className={'items-center p-4 rounded-sm grid grid-cols-6 border border-gray-50/0 even:bg-neutral transition-all even:dark:bg-neutral-900 hover:border-blue-500'}>
                                <span>{member.name} {member.surname}</span>
                                <span>{member.email}</span>
                                <span>{member.phone}</span>
                                <span>{member.language}</span>
                                <span>{member.status}</span>
                                <div className={'flex w-full gap-2 justify-end'}>
                                    <Link href={view.url(member.member_id)}>
                                        <Button variant={'secondary'} size={'icon'} className={'cursor-pointer'}>
                                            <EllipsisIcon />
                                        </Button>
                                    </Link>
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
