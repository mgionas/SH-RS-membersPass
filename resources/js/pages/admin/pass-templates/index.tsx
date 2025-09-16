import { type BreadcrumbItem } from '@/types';
import { BrushCleaning } from 'lucide-react';
import { view, collectTemplates } from '@/routes/passTemplates';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';

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
];

const handleUpdate = () => {
    router.post(collectTemplates.url());
}

export default function Dashboard({passTemplates}:{passTemplates:any}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className={'flex py-2 px-4 w-full justify-between border-b border-neutral-900'}>
                <div>

                </div>
                <div className={'flex gap-2'}>
                    <Button onClick={() => handleUpdate()}>Update Collection</Button>
                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 px-4">
                {passTemplates ? (
                    <div className={'flex flex-col w-full text-sm'}>
                        {/* Header */}
                        <div className={'p-4 rounded-sm font-bold grid grid-cols-4 even:bg-neutral even:dark:bg-neutral-900'}>
                            <span>Title</span>
                            <span>OS</span>
                            <span>Type</span>
                            <span>Issu/Inst</span>
                        </div>
                        {/* Data */}
                        {passTemplates.map((passTemplate, i) => (
                            <Link href={view(passTemplate.id)} key={i} className={'p-4 rounded-sm grid grid-cols-4 border border-gray-50/0 even:bg-neutral transition-all even:dark:bg-neutral-900 hover:border-blue-500'}>
                                <span>{passTemplate.title}</span>
                                <span>{passTemplate.platform}</span>
                                <span>{passTemplate.type}</span>
                                <span>{passTemplate.issued_passes_count}/{passTemplate.installed_passes_count}</span>
                                <div className={'flex w-full justify-end'}>

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
