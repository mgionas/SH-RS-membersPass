import {Button} from '@/components/ui/button';
import {createAndroidPass, createIosPass} from '@/routes';
import {Head, router} from '@inertiajs/react';
import {CircleX, Info} from 'lucide-react';
import {UAParser} from 'ua-parser-js';

export default function OnboardingPage({member}: { member: any }) {
    const {device, os} = UAParser();
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
            <Head title="Dashboard"/>
            <div className={'py-12'}>
                <img src={'/RollingStoneBarLogo.svg'} width={'170'}/>
            </div>
            <div
                className={'flex w-96 max-w-[500px] flex-col items-center justify-center gap-8 rounded-xl border border-neutral-500 bg-neutral-900 p-8'}>
                <div className={'flex flex-col gap-4'}>
                    <div className={'flex gap-2 text-xl'}>
                        <span className={'text-white'}>Dear,</span>
                        <span className={'text-white font-semibold capitalize'}>
                            {member.name}
                        </span>
                    </div>
                    <div className={'flex flex-col gap-4 text-white'}>
                        <span className={''}>
                            As one of our chosen guests, you're invited to apply for a digital access card - personalized and designed for your Wallet.
                        </span>
                        <span>
                            This card is your key to a smoother arrival experience, giving you a little extra ease every time you step through our doors.
                        </span>
                        <span className={'text-yellow-600'}>
                            We look forward to welcoming you upstairs.
                        </span>
                    </div>

                    <div className={'mt-4 flex gap-4 rounded-md bg-neutral-950 p-4'}>
                        <Info className={'text-white'}/>
                        <span className={'text-white text-sm'}>You can install only once, please please use your primary device</span>
                    </div>
                </div>
            </div>
            <div className={'flex w-96 max-w-[500px] items-center justify-center gap-8 rounded-xl py-6'}>
                {device?.type === 'mobile' ? (
                    <div className={'flex flex-col gap-4'}>
                        <Button onClick={() => createPassHandler()}>Generate Pass</Button>
                    </div>
                ) : (
                    <div
                        className={'flex w-full items-center gap-2 rounded-xl border border-red-500 bg-red-500/10 p-6 text-red-500'}>
                        <CircleX/>
                        <span className={'text-sm text-white'}>Please use mobile device to continue</span>
                    </div>
                )}
            </div>
        </div>
    );
}
