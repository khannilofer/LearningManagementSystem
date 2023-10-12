import React, { useEffect, useState } from 'react'
import img from '../../assets/FigmaGraph.jpg'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AdminDashboard() {
    // const dbJson = "https://jsonserver-6gyk.onrender.com";

    const endpoint = "https://localhost:7000/Course";
    
    const [course, setCourse] = useState([])
    const [overView, setOverview] = useState([])

    const getCourseList = () => {
        fetch(`${endpoint}/Admin_Teacher_course`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.log(error))
    }
    const getOverviewList = () => {
        fetch(`${endpoint}/Admin_overview`)
            .then(response => response.json())
            .then(data => setOverview(data[0]))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getCourseList();
        getOverviewList();
    }, [])
    const data = {
        labels: ['React', 'Java', 'C++', "Python", 'React', 'Java', 'C++', "Python"],
        datasets: [{
            label: 'No Of Sudents',
            data: [121, 222, 88, 200, 121, 222, 88, 200],
            backgroundColor: ['#5DDCD6']
        }]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Students Enrolled'
            }
        },
        maintainAspectRatio: false
    }
    return (
        <div>
            <div className="Topcontent">
                <div className="Studentinfo admin">
                    <div className="student-head">

                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total No. of Student</h3>
                                <h4 id="num">{overView.no_of_students}</h4>
                            </div>
                        </div>

                    </div>

                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total No. of Teachers</h3>
                                <h4 id="num">{overView.total_teacher}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Course Uploaded</h3>
                                <h4 id="num">{overView.total_course}</h4>
                            </div>
                        </div>
                    </div>


                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Student Enrolled</h3>
                                <h4 id="num">{overView.enroll_student}</h4>
                            </div>
                        </div>
                    </div>



                </div>
                <div className="graph">
                    <Bar
                        options={options}
                        data={data}
                    />
                </div>
            </div>
            <div className="CourseTable">
                <h1>Courses</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Uploaded On</th>
                            <th>Total Enrollments</th>
                            <th>Total No. of Student Completed</th>
                            <th>Uploaded By</th>
                            <th>Faculty (viewed by)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            course.map((record, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{record.name}</td>
                                        <td>{record.upload}</td>
                                        <td>{record.tenroll}</td>
                                        <td>{record.student_complete}</td>
                                        <td>{record.uploaded_by}</td>
                                        <td>{record.faculty}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDashboard;