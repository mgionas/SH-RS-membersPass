import {PlaceholderPattern} from '@/components/ui/placeholder-pattern';
import {dashboard} from '@/routes';
import {type BreadcrumbItem} from '@/types';
import {Head, router} from '@inertiajs/react';
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Check, ExternalLinkIcon, X} from "lucide-react";
import {approveMember, rejectMember, view} from '@/routes/members'


import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({members}: { members: any }) {

    const ApproveMemberHandler = (id:string) => {
        router.post(approveMember(id).url)
    }

    const RejectMemberHandler = (id:string) => {
        router.post(rejectMember(id).url)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard"/>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div
                        className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern
                            className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20"/>
                    </div>
                    <div
                        className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern
                            className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20"/>
                    </div>
                    <div
                        className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern
                            className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20"/>
                    </div>
                </div>
                <div
                    className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className={'grid grid-cols-3 p-2'}>
                        {members.map(e => (
                            <div key={e.id} className={'flex gap-2 bg-neutral-500/5 p-4 rounded-md w-full'}>
                                <div className={'flex flex-col w-full gap-4'}>
                                    <div className={'flex justify-between'}>
                                        <div className={'flex flex-col'}>
                                            <span className={'text-base'}>{e.name} {e.surname}</span>
                                        </div>
                                        <Button variant={'secondary'} asChild>
                                            <a href={e.social_media_link} target={'_blank'}>
                                                <span>Social Media</span>
                                                <ExternalLinkIcon/>
                                            </a>
                                        </Button>
                                    </div>
                                    <Separator/>
                                    <div className={'flex w-full'}>
                                        <div className={'flex flex-col w-full'}>
                                            <span className={'text-xs text-neutral-500'}>Email:</span>
                                            <span className={'text-sm'}>{e.email ?? '-'}</span>
                                        </div>
                                        <div className={'flex flex-col w-full'}>
                                            <span className={'text-xs text-neutral-500'}>Phone:</span>
                                            <span className={'text-sm'}>{e.phone ?? '-'}</span>
                                        </div>
                                    </div>
                                    <div className={'flex w-full'}>
                                        <div className={'flex flex-col w-full'}>
                                            <span className={'text-xs text-neutral-500'}>Date Of Birth:</span>
                                            <span className={'text-sm'}>{e.dateOfBirth ?? '-'}</span>
                                        </div>
                                        <div className={'flex flex-col w-full'}>
                                            <span className={'text-xs text-neutral-500'}>Language:</span>
                                            <span className={'text-sm'}>{e.language ?? '-'}</span>
                                        </div>
                                    </div>
                                    <Separator/>
                                    <div className={'flex justify-between gap-4'}>
                                        <Button variant={'destructive'} onClick={() => RejectMemberHandler(e.id)}>
                                            <span>Reject</span>
                                            <X/>
                                        </Button>
                                        <Button variant={'default'} onClick={() => ApproveMemberHandler(e.id)}>
                                            <span>Approve</span>
                                            <Check/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
