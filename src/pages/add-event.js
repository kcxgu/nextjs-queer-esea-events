import { useState } from "react";
import AddEventForm from "@/components/Events/AddEventForm"

const AddEvent = () => {
    const [update, setUpdate] = useState(false);
    return (
        <>
            <AddEventForm setUpdate={setUpdate} />
        </>
    )
}

export default AddEvent