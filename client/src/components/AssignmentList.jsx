import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import './AssignmentList.scss';

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await api.get('/assignments');
                setAssignments(res.data);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    if (loading) return <div className="loading">Loading assignments...</div>;

    return (
        <div className="assignment-list">
            <h2 className="assignment-list__heading">Select an Assignment</h2>
            <div className="assignment-list__grid">
                {assignments.map((assignment) => (
                    <div key={assignment._id} className="assignment-card">
                        <div className={`assignment-card__badge assignment-card__badge--${assignment.difficulty.toLowerCase()}`}>
                            {assignment.difficulty}
                        </div>
                        <h3 className="assignment-card__title">{assignment.title}</h3>
                        <p className="assignment-card__desc">{assignment.description}</p>
                        <Link to={`/assignment/${assignment._id}`} className="assignment-card__btn">Start Challenge</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentList;
