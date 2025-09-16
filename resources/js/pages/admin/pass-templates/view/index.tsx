import { DateTime } from 'luxon';
import { useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';
import { removeTemplate } from '@/routes/passTemplates';
import { BrushCleaning, LinkIcon, LoaderCircle, TrashIcon } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
    {
        title: 'Templates',
        href: '/pass-templates',
    },
    {
        title: 'Item',
        href: '',
    },
];

const TemplateStatus = ({status}:{status:any}) => {
    switch (status) {
        case 'Active':
            return (<Badge variant='default'>Active</Badge>)
        case 'Removed':
            return (<Badge variant='destructive'>Removed</Badge>)
        case 'N/A':
            return (<Badge variant='secondary'>Pending</Badge>)
    }
}

export default function Dashboard({generatedPasses}:{generatedPasses:any}) {
    const [loading, setLoading] = useState(null);
    const removeHandler = (e: any) => {
        router.post(removeTemplate(), e, {
            preserveState: true,
            onStart: () => { setLoading(e.id) },
            onSuccess: () => { setLoading(null) }
        })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {generatedPasses ? (
                    <div className={''}>
                        {/* Header */}
                        <div className={'p-4 rounded-sm font-bold grid grid-cols-4 even:bg-neutral even:dark:bg-neutral-900'}>
                            <span>Identification</span>
                            <span>Info</span>
                            <span className={'flex w-full justify-center'}>Status</span>
                        </div>
                        {generatedPasses.map((e) => (
                            <div key={e.serialNumber} className={'p-4 rounded-sm grid grid-cols-4 border border-gray-50/0 even:bg-neutral transition-all even:dark:bg-neutral-900 hover:border-blue-500'}>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-neutral-600'}>id: {e.id}</span>
                                    <span className={'text-sm'}>{e.serialNumber}</span>
                                </div>
                                <div className={'flex flex-col'}>
                                    <span className={'text-xs text-neutral-600'}>
                                        Installed: {e.installedDate ? DateTime.fromISO(e.installedDate).toFormat('d LLL y, HH:mm') : '-'}
                                    </span>
                                    <span className={'text-sm'}>
                                        Issued: {DateTime.fromISO(e.issuedDate).toFormat('d LLL y, HH:mm')}
                                    </span>
                                </div>
                                <div className={'flex flex-col items-center justify-center'}>
                                    <TemplateStatus status={e.status} />
                                </div>
                                <div className={'flex gap-2 justify-end'}>
                                    <a href={e.urls.landing} target={'_blank'}>
                                        <Button variant={'secondary'} size={'icon'} className={'cursor-pointer'}>
                                            <LinkIcon />
                                        </Button>
                                    </a>
                                    <Button onClick={() => removeHandler(e)} variant={'secondary'} size={'icon'} className={'cursor-pointer'} disabled={loading || e.status === 'Removed'}>
                                        {(loading === e.id) ? (
                                            <LoaderCircle className={'animate-spin'}/>
                                        ) : (
                                            <TrashIcon />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
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
