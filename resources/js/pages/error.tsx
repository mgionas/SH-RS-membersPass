import { CircleX } from 'lucide-react';

const ErrorPage = ({error}:{error:any}) => {
    return (
        <div className="flex flex-col gap-12 w-full min-h-screen items-center justify-center bg-neutral-950">
            <img src={'/RollingStoneBarLogo.svg'}  className="w-48" />
            <div className="flex flex-col gap-4 items-center justify-center border px-24 py-12 rounded-2xl border-red-500 bg-red-500/10">
                <CircleX size={48} strokeWidth={1} className={'text-red-500'}/>
                <span className={'flex flex-col items-center gap-2 text-neutral-500'}>
                <span className={'text-white'}>{error}</span>
            </span>
            </div>
        </div>
    )
}

export default ErrorPage
