import { useState,useEffect } from 'react'
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='d-flex flex-column align-items-center' style={{width:'100vw'}}>
      <h1>Inshorts API Data</h1>
      <FetchData />
    </div>
  )
}
export function FetchData() {
  const[data,setData]=useState([]);
  function apiget() {
    fetch('https://inshortsapi.vercel.app/news?category=sports')
      .then((response)=>response.json())
      .then((data)=>{
        setData(data.data);
      })
  }
  useEffect(()=>{
    apiget();
    const inteval = setInterval(()=>{
      apiget();
    },10000)
    return ()=> clearInterval(inteval);
  },[]);
  return(
    <Table className='table table-hover border border-2 border-black w-75'>
      <thead className='table-dark'>
        <tr >
          <th>SR NO.</th>
          <th>NEWS TITLE</th>
          <th>AUTHOR</th>
          <th>DATE & TIME</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item,i)=>(
          <tr>
            <td className='border'>{i+1}</td>
            <td className='border'>{item.title}</td>
            <td className='border'>{item.author}</td>
            <td className='border'>{item.date}, {item.time}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default App
