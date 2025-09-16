const NotFoundPage = () => {
    return (
        <div className="flex flex-col gap-24 w-full min-h-screen items-center justify-center">
            <img src={'/RollingStoneBarLogo.svg'}  className="w-96" />
            <span className={'text-neutral-500'}>Page not found</span>
        </div>
    )
}

export default NotFoundPage
