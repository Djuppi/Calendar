import React, {useState, useEffect} from 'react';
import {
    format,
    parse,
    addWeeks,
    isBefore
} from 'date-fns'
import {createNewEvent} from '../services/sessions'
export default function AddEvent(props) {
    const [startdate, setStartDate] = useState(new Date())
    const [EventName, setEventName] = useState('');
    const [EndDate, setEndDate] = useState(new Date())

    useEffect(() => {
        if(isBefore(EndDate, startdate)) {
            alert('End date is before start date')
        }
    })

    const handleSubmit = async (event) => {
        const { history } = props;
        event.preventDefault()
        console.log({name: EventName, startdate, EndDate})
        await createNewEvent({name: EventName, startdate, enddate: EndDate})
        history.push('/')
    }
    
    return (
        <div>
            <h1>Add event</h1>
            <form>
                <label>
                    Event Name:
                    <input
                        name="eventname"
                        value={EventName}
                        onChange={(event) => setEventName(event.target.value)}
                    />
                </label>
                <label>
                    Start date:
                    <input
                        type="date"
                        name="startdate"
                        value={format(startdate, "yyyy-MM-dd")}
                        onChange={(event) => setStartDate(new Date(event.target.value))}
                    />
                </label>
                <label>
                    End date:
                    <input
                        type="date"
                        name="startdate"
                        value={format(addWeeks(EndDate, 1), "yyyy-MM-dd")}
                        onChange={(event) => setEndDate(new Date(event.target.value))}
                    />
                </label>
                <button
                    onClick={(event) => handleSubmit(event)}
                    >Submit
                </button>
            </form>
        </div>
    )
}
