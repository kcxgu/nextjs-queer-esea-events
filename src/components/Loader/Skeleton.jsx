const Skeleton = () => {
    return (
        <div class="w-full max-w-3xl lg:max-w-4xl mx-auto md:mx-0 pb-10">
            <div className="flex flex-col gap-6 px-4 md:w-3/4 lg:w-2/3 mx-auto xl:ml-52">
                <div class="animate-pulse flex space-x-4 mb-4 border border-blue-300 shadow rounded-md px-6 mb-10 py-10">
                    <div class="rounded-full bg-slate-200 h-10 w-10 lg:h-12 lg:w-12"></div>
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-4 lg:h-6 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-4 lg:h-6 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-4 lg:h-6 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-4 lg:h-6 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <div class="animate-pulse flex space-x-4 mb-4 border border-blue-300 shadow rounded-md px-6 mb-10 py-10">
                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-4 lg:h-6 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-4 lg:h-6 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-4 lg:h-6 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-4 lg:h-6 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <div class="animate-pulse flex space-x-4 mb-4 border border-blue-300 shadow rounded-md px-6 mb-10 py-10">
                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-4 lg:h-6 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-4 lg:h-6 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-4 lg:h-6 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-4 lg:h-6 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skeleton