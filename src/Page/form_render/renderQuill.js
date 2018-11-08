import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function renderQuill({input, size}) {
    const _quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }]
        ]
    }

    const _quillFormats = [
        "header",
        "bold", "italic", "underline", "strike", "blockquote", "code-block",
        "list", "script", "bullet", "indent", "direction", "size", "color", "background", "font", "align"
    ]

    return(
        <div className="w3-container" style={{ width : window.innerWidth <= 420 ? '100%' : '80%' }}>
            <ReactQuill
                theme='snow'
                {...input}
                modules={_quillModules}
                formats={_quillFormats}
          
                style={{height : `${size}px`}}
            />
            <br/>
        </div>
    );
}
export default renderQuill;