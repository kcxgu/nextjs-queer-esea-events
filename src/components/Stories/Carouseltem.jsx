const Carouseltem = ({ item }) => {
    console.log(item)
    return (
        <div className="w-full mx-auto flex flex-col inline-flex items-center justify-center tracking-wide pt-2 pb-10 lg:pb-20">
            <p className="mb-4 text-xl md:text-2xl">{item.title}'s Story</p>
            {item.audio &&
                <iframe
                    className="md:w-3/5 lg:w-2/5 xl:w-1/3 rounded-full grayscale"
                    title={"Listen to " + item.title + "'s Story"}
                    src={item.audio}
                    width="100%"
                    height="50"
                ></iframe>
            }
            <p className="w-full md:w-4/5 lg:w-2/3 mx-auto mt-4 p-2 break-words whitespace-pre-line text-left md:text-lg text-gray-800">{item.content}</p>
        </div >
    )
}

export default Carouseltem