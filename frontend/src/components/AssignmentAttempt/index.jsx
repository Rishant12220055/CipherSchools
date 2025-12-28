import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import QuestionPanel from './QuestionPanel';
import EditorPanel from './EditorPanel';
import ResultPanel from './ResultPanel';
import './AssignmentAttempt.scss';

const AssignmentAttempt = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [hint, setHint] = useState(null);
    const [passed, setPassed] = useState(null);
    const [isMock, setIsMock] = useState(false);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const res = await api.get(`/assignments/${id}`);
                setAssignment(res.data);
                setQuery(res.data.initialQuery || 'SELECT * FROM tables LIMIT 10;');
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignment();
    }, [id]);

    const handleExecute = async () => {
        setError(null);
        setResults(null);
        setPassed(null);
        setIsMock(false);
        try {
            const res = await api.post('/execute', {
                query,
                assignmentId: id
            });
            if (res.data.error) {
                setError(res.data.error);
            } else {
                setResults(res.data.results);
                setPassed(res.data.passed);
                if (res.data.isMock) {
                    setIsMock(true);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Execution failed');
        }
    };

    const handleGetHint = async () => {
        setHint(null);
        try {
            const res = await api.post('/hint', {
                query,
                assignmentId: id,
                question: assignment.question
            });
            setHint(res.data.hint);
        } catch (err) {
            console.error(err);
            alert("Failed to get hint.");
        }
    };

    if (loading) return <div className="loading">Loading assignment...</div>;
    if (!assignment) return <div>Assignment not found</div>;

    return (
        <div className="assignment-attempt">
            <header className="assignment-attempt__header">
                <Link to="/" className="back-link">&larr; Back</Link>
                <h2>{assignment.title}</h2>
                <div className="actions">
                    <button className="btn-secondary" onClick={handleGetHint}>Get Hint ✨</button>
                    <button className="btn-primary" onClick={handleExecute}>Run Query ▶</button>
                </div>
            </header>

            {hint && (
                <div className="hint-box" style={{ margin: '0 1rem 1rem', padding: '1rem', background: '#eef2ff', color: '#3730a3', borderRadius: '8px', border: '1px solid #c7d2fe' }}>
                    <strong>💡 Hint: </strong> {hint}
                    <button onClick={() => setHint(null)} style={{ float: 'right', border: 'none', background: 'none', cursor: 'pointer' }}>✖</button>
                </div>
            )}

            <div className="assignment-attempt__workspace">
                <div className="panel-left">
                    <QuestionPanel assignment={assignment} />
                </div>
                <div className="panel-right">
                    <EditorPanel value={query} onChange={setQuery} />
                    <ResultPanel results={results} error={error} passed={passed} isMock={isMock} />
                </div>
            </div>
        </div>
    );
};

export default AssignmentAttempt;
