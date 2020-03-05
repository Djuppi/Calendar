import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    format, 
    addDays,
    subDays,
    addMonths, 
    subMonths, 
    startOfWeek, 
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isSameMonth,
    isSameDay,
    getWeek,
    isWeekend,
    differenceInDays,
    isBefore,
    } from 'date-fns';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getAllEvents } from '../services/sessions';

function Calender(props) {
    const [currentDate, setcurrentDate ] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [popUp, setPopUp] = useState('hiddenPopUp')
    const [mouseTop, setMouseTop] = useState(0)
    const [mouseLeft, setMouseLeft] = useState(0);
    const [events, setEvents] = useState([])
    const [SelectedEvent, setSelectedEvent] = useState({})

    useEffect(() => {
        document.title = `${format(currentDate, "MMMM yyyy")}`;
        (async function getEvents() {
            const allEvents = await getAllEvents()
            setEvents(allEvents)
        })();
    }, [])


    function renderHeader() {
        const dateFormat = "MMMM yyyy";
        
        return (
            <div className="header row flex-middle">
                <div>
                    <div className="arrow">
                        <FaArrowLeft
                            onClick ={() => setcurrentDate(subMonths(currentDate, 1))} 
                        />
                    </div>
                </div>
                <div className="month">
                    <span>
                        {format(currentDate, dateFormat)}
                    </span>
                </div>
                <div>
                    <div className="arrow">
                        <FaArrowRight
                            onClick ={() => setcurrentDate(addMonths(currentDate, 1))} 
                        />
                    </div>
                </div>
            </div>
        )
    }
    function renderDaysName() {
        
        const dateFormat = "EEEE"
        const days = [];

        let startDate = startOfWeek(currentDate, {weekStartsOn: 1})
        for (let i = 0; i<7; i++) {
            days.push(
                <div className="dayName" key={i+1} onClick={() => console.log(i+1)}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            )
        }
        return <div className="daysRow">{days}</div>
    }
    
    const handleDayClick = (event) => {

        const clickedDay = new Date(event.target.id)
        const thisDay = new Date(Date.now())
        const difference =  differenceInDays(thisDay, clickedDay)
        popUp.includes('visiblePopUp') ? setPopUp(' hiddenPopUp') : setPopUp(popUp + ' visiblePopUp')
        setMouseTop(event.clientY-30)
        setMouseLeft(event.clientX)
        
        isBefore(clickedDay, thisDay) ? setSelectedDate(subDays(thisDay, difference)) : setSelectedDate(addDays(thisDay, (-difference+1)))
    
    }
    const handleEventClick = (name, startdate, event) => {
        event.stopPropagation()
        if(popUp.includes('visiblePopUp')) {
            setPopUp(' hiddenPopUp')
            setSelectedEvent({})
        } else {
            setPopUp(popUp + ' visiblePopUp')
            setSelectedEvent({name, startdate})
        } 
        renderPopUp(event)
        setMouseTop(event.clientY-30)
        setMouseLeft(event.clientX)
    }

    function renderPopUp () {
        const { name, startdate } = SelectedEvent;
        let altDate;
        if(!startdate) {
            altDate = format(currentDate, 'dd MM');
        }
        return(
            <div className={popUp} >
                <h4>{altDate || format(new Date(startdate), 'dd MM')}</h4>
                <p>{name}</p>
            </div>
        )
    }
    
    function renderCells () {
        const monthStart = startOfMonth(currentDate)
        const monthEnd = endOfMonth(monthStart)
        const startDate = startOfWeek(monthStart, {weekStartsOn: 1})
        const endDate = endOfWeek(monthEnd, {weekStartsOn: 1})
        const dateFormat = "d";
        const rows = [];
        const thisDay = new Date(Date.now())
        let days = [];
        let weeks = [];
        let day = startDate;
        let formattedDate = "";
        while (day<= endDate) {
            
            for (let i =0; i<7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                
                const event = events.map((booking) => isSameDay(new Date(booking.startdate), cloneDay) ? 
                    <div className={`event ${isSameDay(new Date(SelectedEvent.startdate), new Date(booking.startdate)) ? "selectedEvent" : null}`} onClick={(event) => handleEventClick(booking.name, booking.startdate, event)}>
                    <span id={booking.id}>{booking.name}</span>
                    </div> 
                : null)
                days.push(
                    
                    <div
                        className={`col cell ${!isSameMonth(day, monthStart)
                        ? "disabled"
                        : isWeekend(day) ? 
                        "weekend"
                        : isSameDay(thisDay, day) ? "thisDay" : ""}
                        ${isSameDay(selectedDate, day)
                        ? "selected"
                        : null}`}
                        key={day}
                        onClick={(event) => handleDayClick(event)} 
                    >
                        <div className="day" id={day}>
                            <p className="date">{formattedDate}</p>
                        </div>
                        <span className="eventcontainer">
                            {event}
                            
                        </span>
                    </div>
                )
                
                day = addDays(day, 1)
                
            }
            weeks.push(getWeek(day-1, {weekStartsOn: 1}))
            
            rows.push(
                <div className="days row" key={day}>
                    <span className={`weekNumber ${weeks.map(week => week>=10 ? "long" : "short")}`}>{weeks}</span>
                    {days}
                </div>
            );
            days = [];
            weeks = []
        }
        return <div className="body">{rows}</div>
    }
        return (
            <div className="calender">
                <Link to="/week">Weekview</Link>
                <button onClick={() => setcurrentDate(Date.now())} >I dag</button>
                {renderHeader()}
                {renderDaysName()}
                {renderCells()}
                <div className={popUp} style={{top: mouseTop, left: mouseLeft}}>{renderPopUp()}</div>
            </div>
        )
    }


export default withRouter(Calender);