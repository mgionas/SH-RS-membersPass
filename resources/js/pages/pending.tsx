import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Pending() {
    return (
        <>
            <Head title="Pending">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full flex-col items-center justify-center lg:max-w-4xl">
                        <img src={'/RollingStoneBarLogo.svg'} width={'300'} className={'mx-auto'} />
                        <div className="flex flex-col text-white text-center text-sm mt-12 gap-2 bg-neutral-700/5 p-4 rounded-md max-w-lg">
                            <span className={'font-bold'}>
                                 Your application has been received successfully.
                            </span>
                            <span className={'text-gray-500'}>
                                We’re reviewing your request and will contact you soon with the next steps.
                            </span>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
