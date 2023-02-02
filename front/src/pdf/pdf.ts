import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Education, Experience, Skill } from '../types/Resume';
import { User } from '../types/User';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const docDefinition = (user: User) => ({
    content: [
        {
            text: 'Resume',
            style: 'header'
        },
        {
            text: user.resume?.name,
            style: 'subheader'
        },
        {
            columns: [
                {
                    text: user.email,
                    style: 'subheader'
                },
                {
                    text: user.resume?.phone,
                    style: 'subheader'
                },
            ]
        },
        {
            text: 'Education',
            style: 'header'
        },
        ...user.resume?.education.map((education: Education) => ({
            layout: 'noBorders',
            table: {
                widths: ['*', '*', '*', '*', '*'],
                body: [
                    [education.school, education.program, education.startDate, education.endDate],
                    ['GPA ' + education.gpa, '', '', '']
                ]
            },
        })) || [],
        {
            text: 'Experience',
            style: 'header'
        },
        ...user.resume?.experience.map((experience: Experience) => ({
            layout: 'noBorders',
            table: {
                widths: ['*', '*', '*', '*', '*'],
                body: [
                    [experience.company, experience.position, experience.startDate, experience.endDate],
                    [experience.description, '', '', '']
                ]
            },
        })) || [],
        {
            text: 'Skills',
            style: 'header'
        },
        {
            text: user.resume?.skills.map((skill: Skill) => skill.name).join(', ')
        }
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
        }
    }
}) as TDocumentDefinitions;

export const generatePDF = (user: User) => {
    pdfMake.createPdf(docDefinition(user)).open();
}