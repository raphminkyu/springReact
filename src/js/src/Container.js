import React from 'react';
const Container = props => (
    <div style = {{width: '800px', margin: '0 auto', textAlign:'center'}} > 
        {props.children}

    </div>
);

export default Container