import React from 'react';

const ResultPanel = ({ results, error, passed, isMock }) => {
    if (error) {
        return (
            <div className="result-panel result-panel--error">
                <h4>Error</h4>
                <pre>{error}</pre>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="result-panel result-panel--empty">
                <p>Run a query to see results.</p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="result-panel">
                <p>Query executed successfully but returned no rows.</p>
            </div>
        );
    }

    const columns = Object.keys(results[0]);

    return (
        <div className="result-panel">
            {isMock && (
                <div className="result-banner" style={{ background: '#fff7ed', color: '#9a3412', border: '1px solid #fdba74' }}>
                    ⚠️ <strong>Demo Mode:</strong> Database not connected. Showing sample data.
                </div>
            )}
            {passed === true && (
                <div className="result-banner result-banner--success">
                    ✅ Correct Answer!
                </div>
            )}
            {passed === false && (
                <div className="result-banner result-banner--failure">
                    ❌ Incorrect Response. Try again!
                </div>
            )}
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            {columns.map(col => <th key={col}>{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row, idx) => (
                            <tr key={idx}>
                                {columns.map(col => <td key={col}>{row[col]}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultPanel;
