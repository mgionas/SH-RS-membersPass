import { CircleCheck } from 'lucide-react';

const InfoPage = ({info}:{info:any}) => {
    return (
        <div className="flex flex-col gap-12 w-full min-h-screen items-center justify-center bg-neutral-950">
            <img src={'/RollingStoneBarLogo.svg'}  className="w-48" />
            <div className="flex flex-col gap-4 items-center justify-center border px-24 py-12 rounded-2xl border-green-500 bg-green-500/10">
                <CircleCheck size={48} strokeWidth={1} className={'text-green-500'}/>
                <span className={'flex flex-col items-center gap-2 text-neutral-500'}>
                <span className={'text-white'}>{info}</span>
            </span>
            </div>
        </div>
    )
}

export default InfoPage
