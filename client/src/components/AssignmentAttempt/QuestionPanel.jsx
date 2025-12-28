import React from 'react';

const QuestionPanel = ({ assignment }) => {
    return (
        <div className="question-panel">
            <div className="question-block">
                <h3>Problem</h3>
                <p>{assignment.question}</p>
            </div>

            <div className="description-block">
                <h4>Description</h4>
                <p>{assignment.description}</p>
            </div>

            <div className="schema-block">
                <h4>Available Tables</h4>
                {assignment.sampleData && assignment.sampleData.tables ? (
                    <div className="schema-browser">
                        {Object.entries(assignment.sampleData.tables).map(([tableName, rows]) => {
                            if (!rows || rows.length === 0) return null;
                            const columns = Object.keys(rows[0]);
                            return (
                                <div key={tableName} className="table-preview">
                                    <div className="table-header">
                                        Table: <strong>{tableName}</strong>
                                    </div>
                                    <div className="table-scroll">
                                        <table className="mini-table">
                                            <thead>
                                                <tr>
                                                    {columns.map(col => <th key={col}>{col}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.slice(0, 3).map((row, idx) => (
                                                    <tr key={idx}>
                                                        {columns.map(col => <td key={col}>{row[col]}</td>)}
                                                    </tr>
                                                ))}
                                                {rows.length > 3 && (
                                                    <tr>
                                                        <td colSpan={columns.length} style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
                                                            ... {rows.length - 3} more rows
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No schema info available.</p>
                )}
            </div>
        </div>
    );
};

export default QuestionPanel;
