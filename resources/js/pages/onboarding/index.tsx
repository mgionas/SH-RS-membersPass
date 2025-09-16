import { Button } from '@/components/ui/button';
import { createAndroidPass, createIosPass } from '@/routes';
import { Head, router } from '@inertiajs/react';
import { CircleX, Info } from 'lucide-react';
import { UAParser } from 'ua-parser-js';

const DeviceComponent = ({ os }: { os: any }) => {
    switch (os.name) {
        case 'Android':
            return (
                <div className={'rounded-xl border border-neutral-700 bg-neutral-900 p-4'}>
                    {/*<img src={'/logos/google.svg'} width={'130'} />*/}
                    Generate Pass
                </div>
            );
        case 'iOS':
            return (
                <div className={'rounded-xl border border-neutral-700 bg-neutral-900 p-4'}>
                    <img src={'/logos/apple.svg'} width={'130'} />
                </div>
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
export default function OnboardingPage({ member }: { member: any }) {
    const { device, os } = UAParser();
    const createPassHandler = () => {
        switch (os.name) {
            case 'Android':
                router.post(createAndroidPass.url(), member);
                break;
            case 'iOS':
                router.post(createIosPass.url(), member);
                break;
        }
    };

    return (
        <div className={'flex min-h-dvh flex-col items-center justify-center bg-neutral-950'}>
            <Head title="Dashboard" />
            <div className={'py-12'}>
                <img src={'/RollingStoneBarLogo.svg'} width={'170'} />
            </div>
            <div className={'flex w-96 max-w-[500px] flex-col items-center justify-center gap-8 rounded-xl border bg-neutral-900 p-8'}>
                <div className={'flex flex-col gap-4'}>
                    <div className={'flex gap-2 text-xl'}>
                        <span>Hello,</span>
                        <span className={'font-semibold'}>
                            {member.name} {member.surname}
                        </span>
                    </div>
                    <span className={''}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content
                        here, content here', making it look like readable English.
                    </span>
                    <div className={'mt-4 flex gap-4 rounded-md bg-neutral-950 p-4'}>
                        <Info />
                        <span className={'text-sm'}>You can install only once, please please use your primary device</span>
                    </div>
                </div>
            </div>
            <div className={'flex w-96 max-w-[500px] items-center justify-center gap-8 rounded-xl py-6'}>
                {device?.type === 'mobile' ? (
                    <div className={'flex flex-col gap-4'}>
                        <Button onClick={() => createPassHandler()}></Button>
                    </div>
                ) : (
                    <div className={'flex w-full items-center gap-2 rounded-xl border border-red-500 bg-red-500/10 p-6 text-red-500'}>
                        <CircleX />
                        <span className={'text-sm text-white'}>Please use mobile device to continue</span>
                    </div>
                )}
            </div>
            {/*<div className={'flex gap-4'}>*/}
            {/*    <Button onClick={() => createAndroidPassHandler()}>Generate Android Pass</Button>*/}
            {/*    <Button onClick={() => createIosPassHandler()}>Generate Ios Pass</Button>*/}
            {/*</div>*/}
        </div>
    );
}
