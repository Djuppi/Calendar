import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    format, 
    addDays,
    addWeeks, 
    subWeeks, 
    startOfWeek, 
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isSameMonth,
    isSameDay,
    getWeek,
    isWeekend
    } from 'date-fns';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Week (props) {
    const [currentDate, setcurrentDate] = useState(new Date())

    useEffect(() => {
        document.title = `Week ${format(currentDate, "w")}`

    })
    function renderHeader(headerFormat) {
        const dateFormat = headerFormat;

        return (
            <div className="header row flex-middle">
            
                <div>
                    <div className="arrow">
                        <FaArrowLeft
                            onClick ={() => setcurrentDate(subWeeks(currentDate, 1))} 
                        />
                    </div>
                </div>
                <div className="week">
                    <span>
                        Week {format(currentDate, dateFormat)}
                    </span>
                </div>
                <div>
                    <div className="arrow">
                        <FaArrowRight
                            onClick ={() => setcurrentDate(addWeeks(currentDate, 1))} 
                        />
                    </div>
                </div>
            </div>
        )
    }
    function renderDaysName(view) {
        const dateFormat = "EEEE"
        const days = [];

        let startDate = startOfWeek(currentDate, {weekStartsOn: 1})
        for (let i = 0; i<7; i++) {
            days.push(
                <div className={`dayName ${view}`} key={i+1} onClick={() => console.log(i+1)}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            )
        }
        return <div className="daysRow">{days}</div>
    }
    function renderCells (view) {
        const weekStart = startOfWeek(currentDate, {weekStartsOn: 1})
        const weekEnd = endOfWeek(weekStart, {weekStartsOn: 1})
        const dateFormat = "d";
        const rows = [];
        const thisDay = new Date(Date.now())
        let days = [];
        let weeks = [];
        let day = weekStart;
        let formattedDate = "";
        while (day<= weekEnd) {
            
            for (let i =0; i<7; i++) {
                formattedDate = format(day, dateFormat);
                days.push(
                    <div
                        className={`col cell  ${isWeekend(day) ? 
                        "weekend"
                        : isSameDay(thisDay, day) ? "thisDay" : ""}`}
                        key={day}
                    >
                        <p className={`day ${view}`} id={format(day, "dd/MM/yy")}>{formattedDate}</p>
                    </div>
                )
                
                day = addDays(day, 1)
                
            }
            
            rows.push(
                <div className="week row" key={day}>
                    {days}
                </div>
            );
            days = [];
            weeks = []
        }
        return <div className="body">{rows}</div>
    }

    
    
    return (
        <div>
            <Link to="/">Monthly view</Link>
            <button onClick={() => setcurrentDate(Date.now())} >I dag</button>
            <h3 className="monthTitle">{format(currentDate, "MMMM")}</h3>
            {renderHeader("w")}
            {renderDaysName("weekView")}
            {renderCells("weekView")}
            {format(currentDate, "dd/MM/yyyy")}
        </div>
    )
}

export default withRouter(Week)
