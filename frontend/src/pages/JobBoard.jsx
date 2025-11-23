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
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get('http://localhost:5000/jobs', { headers });
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
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.delete(`http://localhost:5000/jobs/${id}`, { headers });
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

  // Normalize an input into an absolute URL string, or return null when not usable.
  // Returns a string that starts with http(s):// when valid, otherwise null.
  const formatUrl = (u) => {
    if (!u) return null;
    if (typeof u !== 'string') return null;
    const trimmed = u.trim();
    if (!trimmed) return null;

    // Already absolute
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;

    // Root-relative path -> make absolute using current origin
    if (trimmed.startsWith('/')) return `${window.location.origin}${trimmed}`;

    // Common shorthand like 'www.example.com' -> assume https
    if (trimmed.startsWith('www.')) return `https://${trimmed}`;

    // Anything else (like plain text) is not a usable link here
    return null;
  };

  return (
    <div className='app-theme px-8 py-8 flex flex-col gap-y-5 min-h-screen'>
      <div className='text-2xl font-bold'>JobBoard</div>

      <div className='md:flex md:flex-row grid grid-cols-2 gap-y-2 gap-x-2'>
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

      <div className='w-full overflow-x-auto'>
        <table className='min-w-[900px] md:min-w-0 md:w-full w-full rounded-xl table-auto'>
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
              <tr key={item._id} className='text-center bg-white text-black h-12'>
                <td className='px-4 whitespace-nowrap'>{item.company}</td>
                <td className='px-4 whitespace-nowrap'>{item.jobTitle || item.jobtitle}</td>
                <td className='px-4 whitespace-nowrap'>{item.applicationStatus || item.status}</td>
                <td className='px-4 whitespace-nowrap'>{item.jobctc || item.jobctc}</td>
                <td className='px-4 whitespace-nowrap'>{item.dateOfApplication ? new Date(item.dateOfApplication).toLocaleDateString() : ''}</td>
                <td className='px-4 whitespace-nowrap'>
                  {(() => {
                    const url = formatUrl(item.applicationURL);
                    return url ? (<a href={url} target="_blank" rel="noopener noreferrer"><u>View Application</u></a>) : '-';
                  })()}
                </td>
                <td className='px-4 whitespace-nowrap'>
                  {(() => {
                    const url = formatUrl(item.resume);
                    return url ? (<a href={url} target="_blank" rel="noopener noreferrer"><u>View Resume</u></a>) : '-';
                  })()}
                </td>
                <td className='px-4 whitespace-nowrap'>
                  <button className='cursor-pointer' onClick={() => handleDelete(item._id)}>
                    <img src='/delete.png' className='h-5 mt-2' alt='delete'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobBoard