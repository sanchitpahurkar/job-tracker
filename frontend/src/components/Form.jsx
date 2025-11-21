import { useState } from 'react';
import axios from 'axios';

const Form = () => {

    const [formdata, setFormdata] = useState({
        company: '',
        jobtitle: '',
        application_link: '',
        status: 'applied',
        date: '',
        resume: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/jobs/create', formdata);
            console.log('Form data successfully submitted', data);
        } catch (error) {
            console.error('Error submitting form', error);
        }
    }

  return (
    <form 
    onSubmit={handleSubmit}
    className='flex flex-col w-[30%]'
    >
        <label className=''>Company</label>
        <input 
        type="text" 
        name='company' 
        value={formdata.company} 
        onChange={handleChange}
        className='bg-white h-10 rounded-md outline-none text-black px-2' 
        />

        <label className='mt-4'>Job Title</label>
        <input type="text" name='jobtitle' value={formdata.jobtitle} onChange={handleChange}
        className='bg-white h-10 rounded-md outline-none text-black px-2' 
        />

        <label className='mt-4'>Job Application URL</label>
        <input type="url" name="application_link" value={formdata.application_link} onChange={handleChange}
        className='bg-white h-10 rounded-md outline-none text-black px-2'
        />

        <div className='flex flex-row justify-between mt-4'>
            <div className='flex flex-col w-60'>
                <label>Status</label>
                <select name="status" value={formdata.status} onChange={handleChange} className='h-10 bg-white rounded-md text-black p-2 cursor-pointer outline-none'>
                    <option value="applied">Applied</option>
                    <option value="rejected">Rejected</option>
                    <option value="accepted">Accepted</option>
                </select>
            </div>

            <div className='flex flex-col w-60'>
                <label>Date of Application</label>
                <input type="date" name="date" value={formdata.date} onChange={handleChange} className='h-10 bg-white rounded-md text-black outline-none p-2' />
            </div>
        </div>

        <label className='mt-4'>Submitted resume link</label>
        <input type="url" name="resume" value={formdata.resume} onChange={handleChange}
        className='bg-white h-10 rounded-md outline-none text-black px-2'
        />

        <button type='submit'
        className='bg-amber-400 mt-4 w-48 h-10 rounded-md text-black font-bold cursor-pointer'
        >Create</button>
    </form>
  )
}

export default Form