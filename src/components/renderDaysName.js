import React, { useState } from 'react';
import {
    format, 
    addDays,
    startOfWeek, 
    } from 'date-fns';
function RenderNames (view) {
    const [currentDate] = useState(new Date())

    let View = view;
    

    return (
        <div>{renderDaysName}</div>
    )
}
export default RenderNames;