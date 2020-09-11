import React, { useState, useEffect } from 'react';
import { Form, TextArea } from 'semantic-ui-react';

function DisplayOutput(props) {
    let [text, setText] = useState(''); // << super important array

    useEffect(() => {
        setText(props.text);
    }, [props.text]);

    return (
        <div>
            <Form>
                <Form.Field
                    readonly
                    rows={10}
                    style={{
                        minHeight: '300px',
                        width: '90%',
                        border: '0px',
                        resize: 'none'
                    }}
                    control={TextArea}
                    value={text}
                    placeholder="Output text will appear here"
                />
            </Form>
        </div>
    );
}

export default DisplayOutput;
