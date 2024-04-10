import '../App.css';
import {useRef, useState} from 'react';
const Home = () => {

    const queryText= useRef(null);
    const platformSelector = useRef('snowflake');
    const [errorMesaage, setErrorMessage] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const clearText = () => {
        queryText.current.value = '';

    }
    const executeQuery = () => {
        fetch('http://localhost:5000/execute-query', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "query": queryText.current.value,
                "queryOn": platformSelector.current.value
            })
        }).then(response => response.json())
        .then((response) =>{ 
            console.log(response)
            if(response.error) {
                setResultMessage('');
                setErrorMessage(response.error.message)
            }else{
                setErrorMessage('');
                if(response.result.length !== 0){
                    var keyNames = Object.keys(response.result[0]);
                    if(keyNames.length == 0){
                        setResultMessage('Query executed successfully. No data to display.')
                    }else if(keyNames.length == 1){
                        setResultMessage(response.result[0][keyNames[0]])
                    }else{
                        let data = '';
                        keyNames.forEach((key) => {
                            data += key + ' : ';
                        })
                        data += "<br>";
                        response.result.forEach((row) => {
                            keyNames.forEach((key) => {
                                data += row[key] + ' : ';
                            })
                            data += "<br>";
                        })
                        setResultMessage(data)
                    }
                    
                }else{
                    setResultMessage('Query executed successfully. No data to display.')
                }
                
            }
        })
    }
    return (
        <div>
        <div className="textarea">
            <div>
                <textarea ref={queryText} rows="10" cols="140" style={{fontSize:20+'px', padding: 20+'px'}}></textarea>
            </div>
            <div className="actionButtons">
                <div>
                    <select ref={platformSelector} className="selectorAlign">
                        <option value="snowflake">Snow Flake</option>
                        <option value="googlebigquery">Google Big Query</option>
                    </select>
                </div>
                <div style={{marginTop:25+'px'}}>
                    <button onClick={executeQuery}>Execute</button>
                </div>
                <div>
                    <button onClick={clearText}>Clear</button>
                </div>

            </div>
        </div>

        <div className="resultSection">
            <p style={{fontSize:25+'px'}}>Result: </p>
            <div>
                {{errorMesaage} && <p style={{color:'red'}}>{errorMesaage}</p>}
                {{resultMessage} && <p style={{color:'green'}}>{resultMessage}</p>}
            </div>
        </div>
        </div>
    );
}

export default Home;