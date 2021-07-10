import React from 'react';


const CalcsHistory = (props) => (
    <div>
        <table>
            <thead>
                <tr><td ><p className="textContainer"><b>Calculation History</b></p></td></tr>
            </thead>
            <tbody>
                {props.calcsHistory.map((c, index) => (
                    (<tr key={index}>
                        <td className="textContainer">
                            <p className="textContainer">
                            {c.x + " " + c.op + " " + c.y + " = " + c.result }
                                </p>
                         </td>
                        <td>
                            <button className="button" id={index} onClick={(e) => (props.deleteCalc(c))}>Delete</button>
                        </td>
                        <td>
                            <button className="button" onClick={(e) => (props.updateCalc(index))} > update</button>
                        </td>
                    </tr>) 
                    
                    
                    ))}
            </tbody>
        </table>
    </div>
);












export default CalcsHistory;