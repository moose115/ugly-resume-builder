export type Resume = {
    name: string;
    phone: string;
    address: string;

    education: Education[];
    experience: Experience[];
    skills: Skill[];
}

export type Education = {
    school: string;
    program: string;
    startDate: string;
    endDate: string;
    gpa: string;
}

export type Experience = {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export type Skill = {
    name: string;
}