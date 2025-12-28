import React from 'react';
import Editor, { loader } from '@monaco-editor/react';

// Optional: ensure VSCode theme is loaded
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

const EditorPanel = ({ value, onChange }) => {

    const handleEditorChange = (newValue) => {
        onChange(newValue);
    };

    return (
        <div className="editor-panel">
            <Editor
                height="40vh" // Use flex or vh
                minHeight="300px"
                defaultLanguage="sql"
                theme="vs-dark"
                value={value}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default EditorPanel;
