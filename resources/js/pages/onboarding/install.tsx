import { Head } from '@inertiajs/react';
import { CircleX, Info } from 'lucide-react';
import { UAParser } from 'ua-parser-js';

const DeviceComponent = ({ os, url }:{os:any, url:string}) => {
    switch (os.name) {
        case 'Android':
            return (
                <a href={url} className={'rounded-xl border border-neutral-700 bg-neutral-900 p-4'}>
                    <img src={'/logos/google.svg'} width={'130'} />
                </a>
            );
        case 'iOS':
            return (
                <a href={url} className={'rounded-xl border border-neutral-700 bg-neutral-900 p-4'}>
                    <img src={'/logos/apple.svg'} width={'130'} />
                </a>
            );
        default:
            return (
                <div className={'flex w-full items-center gap-2 rounded-xl border border-red-500 bg-red-500/10 p-6 text-red-500'}>
                    <CircleX />
                    <span className={'text-sm text-white'}>Available only Android or IOS devices</span>
                </div>
            );
    }
};
export default function OnboardingPage({pass}:{pass:any}) {
    const {os} = UAParser();

    return (
        <div className={'flex flex-col items-center justify-center min-h-dvh bg-neutral-950'}>
            <Head title="Dashboard" />
            <div className={'flex flex-col items-center justify-center gap-8 bg-neutral-900 p-8 rounded-xl border border-neutral-500 w-96 max-w-[500px]'}>
                <div className={'flex flex-col gap-4'}>
                    <span className={'text-white'}>Welcome to Onboarding!</span>
                    <div className={'mt-4 flex gap-4 rounded-md bg-neutral-900 p-4'}>
                        <Info className={'text-white'} />
                        <span className={'text-white text-sm'}>You can install only once, please please use your primary device</span>
                    </div>
                </div>
                <div className={'flex flex-col gap-4'}>
                    <DeviceComponent os={os} url={pass.url} />
                </div>
            </div>
        </div>
    )
}


