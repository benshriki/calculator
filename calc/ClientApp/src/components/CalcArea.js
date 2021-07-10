import React from 'react';


class CalcArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ops: props.ops,
            ans: "",
            error: "",
            defX: this.props.calcToUpdate.x,
            defy: this.props.calcToUpdate.y,
            defop: this.props.calcToUpdate.op
        };
    }

    handleErrors = (x, y, op ) => {
        let err = "";
        let flag = false;
        if (!x || !y || !op) {
            err = "Please enter numbers for calculate";
            flag = true;
        }
        else if (parseInt(y) === 0 && op === '/') {
            err = "Can not divie by 0";
            flag = true;
        }
        this.setState({ error: err })
        return flag;

    }

    doPost = (x, y, op) => {
        let data = { x: x, y: y, op: op };
        fetch('calc',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
        ).then(r => r.json()).then(res => {
            if (res !== undefined) {
                this.setState({ ans: res });
                this.props.addCalc({ x: x, y: y, op: op, result: this.state.ans })
            }
        });
    }

    onSubmit = (e) => {
        console.log("submit")
        e.preventDefault();
        let x = e.target.elements.xComp.value.trim();
        let y = e.target.elements.yComp.value.trim();
        let op = e.target.elements.op.value.trim();
        console.log(op)

        if (this.handleErrors(x, y, op)) {
            return;
        }
        this.doPost(x, y, op);

    }


    render() {
        return(
            <div id="CalcArea">
                <form className="calcArea" onSubmit={this.onSubmit} >
                    <table>
                        <tbody>
                        <tr>
                                <td>
                                    <input className="calcArea__input" id="x" name="xComp" type="number" value={this.state.defX} onChange={(e) => { this.setState({ defX: e.target.value }) }} /></td>
                    <td>
                                    <select  className="calcArea__input" id="opList" name="opList" name="op" value={this.state.defop} onChange={(e) => { this.setState({ defop: e.target.value }) }} >
                                {this.state.ops.map((op, index) => (<option value={op} name={index} key={index}> {op} </option>))};
                        </select>
                    </td>
                    <td>
                                    <input className="calcArea__input" id="y" name="yComp" type="number" value={this.state.defy} onChange={(e) => { this.setState({ defy: e.target.value }) }} />
                    </td>
                    <td>
                                    <p className="textContainer"> =</p>
                   </td>
                                <td id="ans">
                                    <p className="textContainer">
                                        {this.props.res}
                                        </p>
                            </td>
                            </tr>
                        </tbody>
                </table>
                    <button className="button"  > Calculate</button>
                    <p className="error">{this.state.error}</p>
                </form>
            </div>
        );
    }
}

export default CalcArea;