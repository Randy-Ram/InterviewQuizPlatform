import React from 'react';
import { MathJax } from 'react-mathjax';

export class Test7Container extends React.Component {
    render(){
        const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`
    return (
        <MathJax.Context>
            <div>
                This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
                And a block one:
 
                <MathJax.Node>{tex}</MathJax.Node>
            </div>
        </MathJax.Context>
    );
    }
}