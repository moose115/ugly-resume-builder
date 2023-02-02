import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { generatePDF } from '../pdf/pdf';
import { Education, Experience, Skill } from '../types/Resume';
import styles from '../components/Inputs.module.css';

const emptySchool: Education = { school: '', program: '', startDate: '', endDate: '', gpa: '' };
const emptyJob: Experience = { company: '', position: '', startDate: '', endDate: '', description: '' };
const emptySkill: Skill = { name: '' };

const Resume = () => {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [schools, setSchools] = React.useState<Education[]>([]);
    const [jobs, setJobs] = React.useState<Experience[]>([]);
    const [skills, setSkills] = React.useState<Skill[]>([]);
    const ctx = useContext(UserContext);

    useEffect(() => {
        if (ctx.user?.resume) {
            setName(ctx.user.resume.name);
            setPhone(ctx.user.resume.phone);
            setSchools(ctx.user.resume.education);
            setJobs(ctx.user.resume.experience);
            setSkills(ctx.user.resume.skills);
        }
    }, [ctx.user]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            ...ctx.user,
            resume: {
                name,
                phone,
                education: schools,
                experience: jobs,
                skills
            }
        }
        const response = await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (data) {
            ctx.setUser(data);
            generatePDF(data);
        }
    };

    return (
        <div>
            <h2>Build resume</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Contact info</h3>
                    <div className={styles['input-row']}>
                        <div className={styles['input-container']}>
                            <label className={styles.label} htmlFor="name">Name</label>
                            <input className={styles.input} type={'text'} id={'name'} value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles.label} htmlFor="phone">Phone</label>
                            <input className={styles.input} type={'text'} id={'phone'} value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Education</h3>
                    {schools.map((school, index) => {
                        return (
                            <div className={styles['input-row']} key={index}>
                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="school">School</label>
                                    <input className={styles.input} type={'text'} id={'school'} value={school.school} onChange={e => setSchools(schools.map((s, i) => i === index ? { ...s, school: e.target.value } : s))} />
                                </div>

                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="Program">Program</label>
                                    <input className={styles.input} type={'text'} id={'Program'} value={school.program} onChange={e => setSchools(schools.map((s, i) => i === index ? { ...s, program: e.target.value } : s))} />
                                </div>

                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="start">Start</label>
                                    <input className={styles.input} type={'date'} id={'start'} value={school.startDate} onChange={e => setSchools(schools.map((s, i) => i === index ? { ...s, startDate: e.target.value } : s))} />
                                </div>

                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="end">End</label>
                                    <input className={styles.input} type={'date'} id={'end'} value={school.endDate} onChange={e => setSchools(schools.map((s, i) => i === index ? { ...s, endDate: e.target.value } : s))} />
                                </div>

                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="gpa">GPA</label>
                                    <input className={styles.input} type={'number'} id={'gpa'} value={school.gpa} onChange={e => setSchools(schools.map((s, i) => i === index ? { ...s, gpa: e.target.value } : s))} />
                                </div>
                                <button className={styles.button} type={'button'} onClick={() => setSchools(schools.filter((_, i) => i !== index))}>Remove</button>
                            </div>
                        );
                    })}
                    <button className={styles.button} type={'button'} onClick={() => setSchools([...schools, emptySchool])}>Add school</button>
                </div>

                <div>
                    <h3>Experience</h3>
                    {jobs.map((job, index) => {
                        return (
                            <div className={styles['input-row']} key={index}>
                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="company">Company</label>
                                    <input className={styles.input} type={'text'} id={'company'} value={job.company} onChange={e => setJobs(jobs.map((j, i) => i === index ? { ...j, company: e.target.value } : j))} />
                                </div>
                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="position">Position</label>
                                    <input className={styles.input} type={'text'} id={'position'} value={job.position} onChange={e => setJobs(jobs.map((j, i) => i === index ? { ...j, position: e.target.value } : j))} />
                                </div>
                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="start">Start</label>
                                    <input className={styles.input} type={'date'} id={'start'} value={job.startDate} onChange={e => setJobs(jobs.map((j, i) => i === index ? { ...j, startDate: e.target.value } : j))} />
                                </div>
                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="end">End</label>
                                    <input className={styles.input} type={'date'} id={'end'} value={job.endDate} onChange={e => setJobs(jobs.map((j, i) => i === index ? { ...j, endDate: e.target.value } : j))} />
                                </div>
                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="description">Description</label>
                                    <input className={styles.input} type={'text'} id={'description'} value={job.description} onChange={e => setJobs(jobs.map((j, i) => i === index ? { ...j, description: e.target.value } : j))} />
                                </div>
                                <button className={styles.button} type={'button'} onClick={() => setJobs(jobs.filter((_, i) => i !== index))}>Remove</button>
                            </div>
                        );
                    })}
                    <button className={styles.button} type={'button'} onClick={() => setJobs([...jobs, emptyJob])}>Add job</button>
                </div>

                <div>
                    <h3>Skills</h3>
                    {skills.map((skill, index) => {
                        return (
                            <div className={styles['input-row']} key={index}>
                                <div className={styles['input-container']}>
                                    <label className={styles.label} htmlFor="skill">Skill</label>
                                    <input className={styles.input} type={'text'} id={'skill'} value={skill.name} onChange={e => setSkills(skills.map((s, i) => i === index ? { ...s, name: e.target.value } : s))} />
                                </div>
                                <button className={styles.button} type={'button'} onClick={() => setSkills(skills.filter((_, i) => i !== index))}>Remove</button>
                            </div>
                        );
                    })}
                    <button className={styles.button} type={'button'} onClick={() => setSkills([...skills, emptySkill])}>Add skill</button>
                </div>

                <div>
                    <button className={styles.button}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default Resume;