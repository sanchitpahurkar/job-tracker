import { useState, useEffect } from 'react'
import axios from 'axios'

const JobBoard = () => {

  const [ data, setData ] = useState([]);
  const [ jobs, setJobs ] = useState([]);
  const [ activeFilter, setActiveFilter ] = useState('all');
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs');
        const payload = Array.isArray(response.data) ? response.data : [];
        setJobs(payload);
        setData(payload);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();

  }, []);
  
  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {typeof error === 'string' ? error : error.message || JSON.stringify(error)}</div>;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${id}`);
      setJobs(prev => prev.filter(item => item._id !== id));
      setData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error sending delete request');
      
    }
  }

  const showAll = () => { setActiveFilter('all'); setData(jobs); };
  const showApplied = () => { setActiveFilter('applied'); setData(jobs.filter(j => (j.applicationStatus || j.status) === 'applied')); };
  const showRejected = () => { setActiveFilter('rejected'); setData(jobs.filter(j => (j.applicationStatus || j.status) === 'rejected')); };
  const showAccepted = () => { setActiveFilter('accepted'); setData(jobs.filter(j => (j.applicationStatus || j.status) === 'accepted')); };

  return (
    <div className='app-theme px-8 py-8 flex flex-col gap-y-5'>
      <div className='text-2xl font-bold'>JobBoard</div>

      <div className='flex flex-row gap-x-2'>
        <button
          onClick={showAll}
          className={`cursor-pointer px-3 py-1 rounded ${activeFilter === 'all' ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          All Jobs
        </button>

        <button
          onClick={showApplied}
          className={`cursor-pointer px-3 py-1 rounded ${activeFilter === 'applied' ? 'bg-amber-400 text-black' : 'bg-white text-black'}`}
        >
          Applied
        </button>

        <button
          onClick={showRejected}
          className={`cursor-pointer px-3 py-1 rounded ${activeFilter === 'rejected' ? 'bg-red-400 text-black' : 'bg-white text-black'}`}
        >
          Rejected
        </button>

        <button
          onClick={showAccepted}
          className={`cursor-pointer px-3 py-1 rounded ${activeFilter === 'accepted' ? 'bg-green-400 text-black' : 'bg-white text-black'}`}
        >
          Accepted
        </button>
      </div>

      <table className='rounded-xl items-center justify-center '>
        <thead>
          <tr className='bg-amber-400 text-black rounded-2xl h-12'>
            <th>Company</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>CTC</th>
            <th>Application Date</th>
            <th>Job URL</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id} className='text-center bg-white text-black h-12 items-center'>
              <td>{item.company}</td>
              <td>{item.jobTitle || item.jobtitle}</td>
              <td>{item.applicationStatus || item.status}</td>
              <td>{item.jobctc || item.jobctc}</td>
              <td>{item.dateOfApplication ? new Date(item.dateOfApplication).toLocaleDateString() : ''}</td>
              <td><a href={item.applicationURL}><u>View Application</u></a></td>
              <td><a href={item.resume}><u>View Resume</u></a></td>
              <td><button 
              className='cursor-pointer' 
              onClick={() => handleDelete(item._id)}><img src='/delete.png' className='h-5 mt-2'/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobBoard